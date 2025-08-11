/*
  Crawl True Religion SA shop-all and collect ~300 product image URLs.
  Usage:
    npm run scrape:sa
  Output:
    public/truereligionsa-images.json
*/

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

const BASE = "https://truereligionsa.co.za/collections/shop-all";
const MAX_IMAGES = 300;
const MAX_PAGES = 60; // safety upper bound

function extractLargestFromSrcset(srcset?: string): string | null {
  if (!srcset) return null;
  const parts = srcset.split(",").map((p) => p.trim());
  // heuristic: last item usually largest
  const last = parts[parts.length - 1];
  const url = last?.split(" ")[0];
  return url || null;
}

async function scrapePage(url: string): Promise<string[]> {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const urls = new Set<string>();

  $("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src");
    const srcset = $(el).attr("srcset");
    let u: string | null = null;
    if (srcset) u = extractLargestFromSrcset(srcset);
    if (!u && src) u = src;
    if (!u) return;
    try {
      const absolute = new URL(u, url).toString();
      if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(absolute)) urls.add(absolute);
    } catch {
      // ignore bad
    }
  });
  return Array.from(urls);
}

async function main() {
  const collected = new Set<string>();
  for (let page = 1; page <= MAX_PAGES && collected.size < MAX_IMAGES; page += 1) {
    const url = page === 1 ? BASE : `${BASE}?page=${page}`;
    try {
      const imgs = await scrapePage(url);
      // basic heuristic to keep likely product images: contain "/products/" or cdn.shopify
      for (const img of imgs) {
        if (/cdn|products|files/i.test(img)) {
          collected.add(img);
          if (collected.size >= MAX_IMAGES) break;
        }
      }
      console.log(`Page ${page}: +${imgs.length} (total unique: ${collected.size})`);
      // be polite
      await new Promise((r) => setTimeout(r, 400));
    } catch (e) {
      console.warn(`Page ${page} failed: ${(e as Error).message}`);
    }
  }

  const arr = Array.from(collected).slice(0, MAX_IMAGES);
  const outDir = path.join(process.cwd(), "public");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "truereligionsa-images.json");
  await writeFile(outPath, JSON.stringify(arr, null, 2), "utf8");
  console.log(`Wrote ${arr.length} images to ${outPath}`);
}

main();


