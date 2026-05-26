/*
 * Friedland Enterprises site tracking.
 * Single source of truth, referenced from every page in public/*.html
 * via <script src="/scripts/tracking.js" async></script>
 *
 * Current trackers:
 *   - Pipedrive Web Visitors (Leadfeeder) — site visitor identification.
 *   - Google Analytics 4 (G-CT6F2LKSMZ) — site analytics.
 *
 * Add or replace trackers here. Do not duplicate snippets into individual pages.
 */

// Google Analytics 4 (gtag.js)
(function () {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CT6F2LKSMZ';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', 'G-CT6F2LKSMZ');
})();

// Pipedrive Web Visitors (Leadfeeder)
(function (ss, ex) {
  window.ldfdr = window.ldfdr || function () {
    (ldfdr._q = ldfdr._q || []).push([].slice.call(arguments));
  };
  (function (d, s) {
    var fs = d.getElementsByTagName(s)[0];
    function ce(src) {
      var cs = d.createElement(s);
      cs.src = src;
      cs.async = 1;
      fs.parentNode.insertBefore(cs, fs);
    }
    ce('https://sc.lfeeder.com/lftracker_v1_' + ss + (ex ? '_' + ex : '') + '.js');
  })(document, 'script');
})('kn9Eq4R2ldz4RlvP');
