import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_HOSTS = new Set(['assets.objkt.media', 'nft-cdn.alchemy.com']);

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return new Response('Invalid url', { status: 400 });
  }

  if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return new Response('Host not allowed', { status: 400 });
  }

  const headers: Record<string, string> = {};
  const range = request.headers.get('range');
  if (range) {
    headers['range'] = range;
  }

  const upstream = await fetch(parsed.toString(), {
    headers,
  }).catch(() => null);

  if (!upstream || !upstream.ok || !upstream.body) {
    return new Response('Upstream error', { status: 502 });
  }

  const responseHeaders = new Headers();
  const passthroughHeaders = ['content-type', 'content-length', 'accept-ranges', 'content-range'];

  for (const header of passthroughHeaders) {
    const value = upstream.headers.get(header);
    if (value) responseHeaders.set(header, value);
  }

  responseHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
