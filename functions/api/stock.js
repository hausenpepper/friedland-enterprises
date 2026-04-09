/**
 * Cloudflare Pages Function: /api/stock?symbol=LVLU
 * Proxies Yahoo Finance to return live price data.
 * Cached at the edge for 60 seconds to avoid rate limits.
 */
export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const symbol = (searchParams.get('symbol') || 'LVLU').toUpperCase().trim();

  // Basic allowlist — only serve tickers this site actually uses
  const allowed = ['LVLU', 'CMRC', 'GRWG'];
  if (!allowed.includes(symbol)) {
    return json({ error: 'Symbol not allowed' }, 400);
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': 'application/json',
      },
      cf: { cacheTtl: 60, cacheEverything: true },
    });

    if (!res.ok) throw new Error(`Yahoo returned ${res.status}`);

    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;

    if (!meta) throw new Error('No data returned');

    const price          = meta.regularMarketPrice ?? null;
    const prevClose      = meta.chartPreviousClose ?? meta.previousClose ?? null;
    const change         = price != null && prevClose != null ? +(price - prevClose).toFixed(2) : null;
    const changePct      = price != null && prevClose != null ? +((change / prevClose) * 100).toFixed(2) : null;
    const marketState    = meta.marketState ?? 'CLOSED'; // REGULAR | PRE | POST | CLOSED
    const currency       = meta.currency ?? 'USD';
    const exchangeName   = meta.exchangeName ?? '';

    return json({
      symbol,
      price:        price != null ? +price.toFixed(2) : null,
      change,
      changePct,
      prevClose:    prevClose != null ? +prevClose.toFixed(2) : null,
      marketState,
      currency,
      exchangeName,
      fetchedAt:    new Date().toISOString(),
    }, 200, { 'Cache-Control': 'public, s-maxage=60' });

  } catch (err) {
    return json({ error: err.message, symbol }, 502);
  }
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...extra,
    },
  });
}
