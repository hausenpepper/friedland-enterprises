/**
 * Cloudflare Pages Function: POST /api/lead
 *
 * Receives a website contact submission and creates a Person + Lead in Pipedrive.
 * Leads land in the Pipedrive Leads inbox (unqualified inbound), not a pipeline.
 *
 * The Pipedrive API token lives in the PIPEDRIVE_TOKEN environment variable
 * (Cloudflare Pages > Settings > Environment variables). It is never sent to the browser.
 */
const PIPEDRIVE_BASE = 'https://api.pipedrive.com/v1';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  // Honeypot: a hidden field humans never see. If it is filled, it is a bot.
  // Return success so the bot moves on, but create nothing.
  if (data.company_website) {
    return json({ ok: true }, 200);
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const message = (data.message || '').trim();

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are required.' }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'Please provide a valid email address.' }, 400);
  }
  if (name.length > 120 || email.length > 160 || message.length > 4000) {
    return json({ error: 'Submission too long.' }, 400);
  }

  const token = env.PIPEDRIVE_TOKEN;
  if (!token) {
    return json({ error: 'Server not configured.' }, 500);
  }

  try {
    // 1) Create the person (name + email)
    const personRes = await fetch(`${PIPEDRIVE_BASE}/persons?api_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email: [{ value: email, primary: true, label: 'work' }],
      }),
    });
    const personData = await personRes.json();
    if (!personData.success) throw new Error('person create failed');
    const personId = personData.data.id;

    // 2) Create the lead tied to that person (lands in the Leads inbox)
    const leadRes = await fetch(`${PIPEDRIVE_BASE}/leads?api_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Website inquiry: ${name}`,
        person_id: personId,
      }),
    });
    const leadData = await leadRes.json();
    if (!leadData.success) throw new Error('lead create failed');
    const leadId = leadData.data.id;

    // 3) Attach the message as a note on the lead. User content is HTML-escaped
    //    (Pipedrive renders notes as HTML).
    await fetch(`${PIPEDRIVE_BASE}/notes?api_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: leadId,
        content:
          `Website contact form (friedlandenterprises.com)\n\n` +
          `From: ${esc(name)} &lt;${esc(email)}&gt;\n\n${esc(message)}`,
      }),
    });

    return json({ ok: true }, 200);
  } catch (err) {
    return json({ error: 'Could not submit. Please email us directly.' }, 502);
  }
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
