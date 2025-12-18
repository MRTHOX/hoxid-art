import { ensureOriginal } from '@/utils/media';

const CID_REGEX = /(?:Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z0-9]{50,})/i;

export function extractCid(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('ipfs://')) {
    const afterScheme = trimmed.slice(7);
    const cid = afterScheme.split(/[/?#]/)[0];
    return cid || null;
  }

  const plainMatch =
    trimmed.match(/^Qm[1-9A-HJ-NP-Za-km-z]{44}$/i) || trimmed.match(/^bafy[a-z0-9]{50,}$/i);
  if (plainMatch) {
    return plainMatch[0];
  }

  const regexes = [/file\/assets-003\/([^/?#]+)/i, /bits\.raster\.art\/([^/?#]+)/i, /ipfs\/([^/?#]+)/i];

  for (const pattern of regexes) {
    const match = trimmed.match(pattern);
    if (match && CID_REGEX.test(match[1])) {
      return match[1];
    }
  }

  const generalMatch = trimmed.match(CID_REGEX);
  return generalMatch ? generalMatch[0] : null;
}

export function buildFallbackUrls(input?: string | null): string[] {
  if (!input) return [];
  const trimmed = input.trim();
  if (!trimmed) return [];

  // ✅ Local/public paths like "/covers/xxx.webp" should be used directly
  // This fixes MediaWithFallback for generated covers on production.
  if (trimmed.startsWith('/')) {
    return [trimmed];
  }

  const cid = extractCid(trimmed);
  const urls: string[] = [];

  if (cid) {
    urls.push(
      `https://bits.raster.art/${cid}/original`,
      `https://dweb.link/ipfs/${cid}`,
      `https://cloudflare-ipfs.com/ipfs/${cid}`,
      `https://ipfs.io/ipfs/${cid}`
    );
  }

  if (/^https?:\/\//i.test(trimmed)) {
    urls.push(ensureOriginal(trimmed));
  }

  return Array.from(new Set(urls));
}
