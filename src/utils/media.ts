export const ensureOriginal = (value: string) =>
  value.replace(/\/artifact(?=$|[\?#]|$)/i, '/original');

export const proxifyMediaUrl = (url?: string) => {
  if (!url) return url;
  const normalized = ensureOriginal(url.trim());
  if (normalized.includes('assets.objkt.media')) {
    return `/api/media?url=${encodeURIComponent(normalized)}`;
  }
  return normalized;
};

export function normalizeVideoUrl(url: string): string {
  if (!url) return '';

  const trimmedUrl = ensureOriginal(url.trim());

  if (trimmedUrl.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${trimmedUrl.slice(7)}`;
  }

  try {
    const parsed = new URL(trimmedUrl);

    if (parsed.protocol === 'ipfs:') {
      return `https://ipfs.io/ipfs/${parsed.pathname.replace(/^\//, '')}`;
    }

    if (parsed.hostname.includes('ipfs') && parsed.pathname.includes('/ipfs/')) {
      const [, hash] = parsed.pathname.split('/ipfs/');
      if (hash) {
        return `https://ipfs.io/ipfs/${hash}`;
      }
    }

    return ensureOriginal(parsed.toString());
  } catch (error) {
    console.warn('Invalid video URL provided, returning raw value', error);
    return trimmedUrl;
  }
}

export const safeVideoAttributes = {
  muted: true,
  loop: true,
  playsInline: true,
  autoPlay: true,
  preload: 'metadata' as const,
};
