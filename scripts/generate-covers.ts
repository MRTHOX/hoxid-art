/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

import ffmpeg from 'fluent-ffmpeg';

import ffmpegPath from 'ffmpeg-static';

import { works } from '../src/data/content';
const CID_REGEX = /(?:Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z0-9]{50,})/i;

function extractCid(input: string): string | null {
  const m = input.match(CID_REGEX);
  return m ? m[0] : null;
}

function buildCandidateVideoUrls(videoUrl: string): string[] {
  const urls: string[] = [];

  // 1) önce orijinal url
  urls.push(videoUrl);

  // 2) CID varsa gateway alternatifleri ekle
  const cid = extractCid(videoUrl);
  if (cid) {
    urls.push(
      `https://bits.raster.art/${cid}/original`,
      `https://dweb.link/ipfs/${cid}`,
      `https://cloudflare-ipfs.com/ipfs/${cid}`,
      `https://ipfs.io/ipfs/${cid}`
    );
  }

  // uniq
  return Array.from(new Set(urls));
}

console.log('[cover] script started, works:', works?.length);


ffmpeg.setFfmpegPath(ffmpegPath as string);

const ROOT = process.cwd();
const PUBLIC_COVERS_DIR = path.join(ROOT, 'public', 'covers');
const GENERATED_FILE = path.join(ROOT, 'src', 'data', 'covers.generated.ts');

type CoverMap = Record<string, string>;

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function fileExists(p: string) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function writeGeneratedFile(map: CoverMap) {
  const content =
    `// AUTO-GENERATED — DO NOT EDIT\n` +
    `export const generatedCovers: Record<string, string> = ${JSON.stringify(map, null, 2)};\n`;

  fs.writeFileSync(GENERATED_FILE, content, 'utf8');
}

async function generateCover(videoUrl: string, outPath: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(videoUrl)
      .outputOptions([
        '-frames:v 1',
        '-ss 1',
        '-vf scale=1280:-1:force_original_aspect_ratio=decrease',
        '-q:v 40'
      ])
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(outPath);
  });
}

async function main() {
  ensureDir(PUBLIC_COVERS_DIR);

  const map: CoverMap = {};
  let generated = 0;
  let skipped = 0;

  for (const work of works) {
    if (!work.id) continue;

    const outFile = path.join(PUBLIC_COVERS_DIR, `${work.id}.webp`);
    const publicPath = `/covers/${work.id}.webp`;

    // 1️⃣ Manuel cover varsa: ona dokunma
    if (work.coverWebp) {
      map[work.id] = work.coverWebp;
      skipped++;
      continue;
    }

    // 2️⃣ Zaten üretilmiş cover varsa: tekrar üretme
    if (fileExists(outFile)) {
      map[work.id] = publicPath;
      skipped++;
      continue;
    }

    // 3️⃣ Video yoksa: geç
    if (!work.videoUrl) continue;

    try {
      console.log(`[cover] generating ${work.id}`);
      const candidates = buildCandidateVideoUrls(work.videoUrl);

let ok = false;
for (const candidate of candidates) {
  try {
    console.log(`[cover] try ${work.id} → ${candidate}`);
    await generateCover(candidate, outFile);
    ok = true;
    break;
  } catch {
    // sıradakini dene
  }
}

if (ok) {
  map[work.id] = publicPath;
  generated++;
} else {
  console.warn(`[cover] failed ${work.id} (all candidates)`);
}

    } catch (err) {
        console.warn(`[cover] failed ${work.id} → ${work.videoUrl}`);
        console.warn(err);
    }
  }

  writeGeneratedFile(map);

  console.log(`[cover] done → generated:${generated}, skipped:${skipped}`);
}

main().catch((e) => {
  console.error('[cover] fatal', e);
  process.exit(1);
});
