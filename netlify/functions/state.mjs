import { getStore } from '@netlify/blobs';

// Shared family state, stored in a Netlify Blob.
// GET  -> returns the saved state JSON (or null if nothing saved yet)
// POST -> overwrites the saved state with the request body
export default async (req) => {
  const store = getStore('levelup');
  // which blob to read/write: 'state' (chore app, default) or 'levels' (custom game levels)
  const url = new URL(req.url);
  const which = url.searchParams.get('store') === 'levels' ? 'levels' : 'state';

  if (req.method === 'GET') {
    const data = await store.get(which, { type: 'json' });
    return new Response(JSON.stringify(data ?? null), {
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
    });
  }

  if (req.method === 'POST') {
    const body = await req.text();
    // validate it's JSON before storing
    try { JSON.parse(body); } catch { return new Response('Bad JSON', { status: 400 }); }
    await store.set(which, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config = { path: '/.netlify/functions/state' };
