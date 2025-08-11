/*
  Usage:
  1) Put one product URL per line in urls.txt at the project root
  2) npm run scrape:images
  3) See scraped-images.json for results
*/

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

type Scraped = {
  url: string;
  images: string[];
};

async function scrapePage(url: string): Promise<Scraped> {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const urls = new Set<string>();

  const og = $('meta[property="og:image"]').attr("content");
  if (og) urls.add(og);

  $("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || $(el).attr("data-original");
    if (!src) return;
    const absolute = new URL(src, url).toString();
    // Basic heuristics: prefer large JPG/WEBP product-style images
    if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(absolute)) {
      urls.add(absolute);
    }
  });

  // Prefer larger images by filtering size hints in URLs
  const sorted = Array.from(urls).sort((a, b) => b.length - a.length);
  return { url, images: sorted };
}

async function main() {
  const urlsPath = path.join(process.cwd(), "urls.txt");
  const outPath = path.join(process.cwd(), "scraped-images.json");
  const raw = await readFile(urlsPath, "utf8");
  const urls = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (urls.length === 0) {
    console.error("No URLs found in urls.txt");
    process.exit(1);
  }
  const results: Scraped[] = [];
  for (const url of urls) {
    try {
      const data = await scrapePage(url);
      results.push(data);
      console.log(`Scraped ${url}: ${data.images.length} images`);
    } catch (e) {
      console.warn(`Failed ${url}: ${(e as Error).message}`);
    }
  }
  await writeFile(outPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Wrote ${outPath}`);
}

main();


