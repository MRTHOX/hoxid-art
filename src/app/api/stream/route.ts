import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const FORWARDED_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'cache-control',
];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return new Response('Missing url parameter', { status: 400 });
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('assets.objkt.media')) {
      return new Response('Unsupported upstream host', { status: 400 });
    }

    const headers: Record<string, string> = {};
    const range = request.headers.get('range');
    if (range) {
      headers.Range = range;
    }

    const upstream = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!upstream.ok && upstream.status !== 206) {
      return new Response('Upstream error', { status: upstream.status });
    }

    const responseHeaders = new Headers();
    FORWARDED_HEADERS.forEach((header) => {
      const value = upstream.headers.get(header);
      if (value) responseHeaders.set(header, value);
    });

    if (!responseHeaders.has('cache-control')) {
      responseHeaders.set('cache-control', 'public, max-age=31536000, immutable');
    }

    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Stream proxy failed', error);
    return new Response('Upstream fetch failed', { status: 502 });
  }
}
