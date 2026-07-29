// /functions/api/stats.js
// Cloudflare Pages Function: real-IP page/session counters backed by KV.
// Complements busuanzi (cookie-based UV) with IP-based unique counts.
// KV binding name expected: STATS

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const track = url.searchParams.get('track') === '1';
  let path = url.searchParams.get('path') || '/';
  path = path.split('?')[0] || '/';
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown';

  // If the KV binding is not configured yet, degrade gracefully (busuanzi stays).
  if (!env.STATS) {
    return json({ ok: false, sitePV: 0, siteUV: 0, pagePV: 0, pageUV: 0 });
  }

  const sitePV = 'pv:site';
  const pagePV = 'pv:page:' + path;
  const siteUV = 'uv:site';
  const pageUV = 'uv:page:' + path;
  const ipKey = 'ip:' + ip;

  async function inc(key) {
    const v = parseInt((await env.STATS.get(key)) || '0', 10);
    const nv = v + 1;
    await env.STATS.put(key, String(nv));
    return nv;
  }
  async function get(key) {
    return parseInt((await env.STATS.get(key)) || '0', 10);
  }

  let sPV, pPV, sUV, pUV;

  try {
    if (track) {
      sPV = await inc(sitePV);
      pPV = await inc(pagePV);
      const seen = await env.STATS.get(ipKey);
      if (seen === null) {
        // First time we see this IP (all-time) -> count as unique.
        sUV = await inc(siteUV);
        pUV = await inc(pageUV);
        await env.STATS.put(ipKey, String(Date.now()));
      } else {
        sUV = await get(siteUV);
        pUV = await get(pageUV);
      }
    } else {
      sPV = await get(sitePV);
      pPV = await get(pagePV);
      sUV = await get(siteUV);
      pUV = await get(pageUV);
    }
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }

  return json({ ok: true, sitePV: sPV, siteUV: sUV, pagePV: pPV, pageUV: pUV });
}
