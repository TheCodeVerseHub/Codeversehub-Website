#!/usr/bin/env node
/**
 * Validates every URL in the curated resources collection.
 *
 * Usage: node scripts/validate-resources.mjs [--json]
 *
 * - Extracts all `url:` entries from src/lib/resources/data/*.ts
 * - Fetches each with HEAD, falling back to GET (browser UA)
 * - 2xx/3xx            -> OK
 * - 403/405/429/451    -> BLOCKED (bot protection; likely fine)
 * - 404/410/5xx        -> BROKEN
 * - network errors     -> BROKEN
 */
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "src/lib/resources/data");
const CONCURRENCY = 12;
const TIMEOUT_MS = 15000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function extractUrls() {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts"));
  const urls = [];
  for (const file of files) {
    const src = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    for (const m of src.matchAll(/url:\s*"([^"]+)"/g)) {
      urls.push({ url: m[1], file });
    }
  }
  // de-duplicate while keeping file attribution
  const seen = new Set();
  return urls.filter((u) => (seen.has(u.url) ? false : (seen.add(u.url), true)));
}

async function check(url, signal) {
  // Manually follow redirects (cap 25) because some sites (tensorflow.org,
  // developer.android.com) chain more redirects than fetch's default limit.
  let current = url;
  let redirects = 0;
  const seen = new Set();
  while (true) {
    if (seen.has(current)) throw new Error(`redirect loop at ${current}`);
    seen.add(current);
    const opts = {
      method: "HEAD",
      redirect: "manual",
      signal,
      headers: { "user-agent": UA, accept: "*/*" },
    };
    let res = await fetch(current, opts);
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const loc = res.headers.get("location");
      if (!loc) return res.status;
      if (++redirects > 25) throw new Error("too many redirects");
      current = new URL(loc, current).toString();
      continue;
    }
    if (res.status === 405 || res.status === 403 || res.status === 415) {
      // some servers reject HEAD; retry with GET (body discarded)
      res = await fetch(current, {
        method: "GET",
        redirect: "manual",
        signal,
        headers: { "user-agent": UA, accept: "text/html,*/*" },
      });
      await res.body?.cancel();
      return res.status;
    }
    return res.status;
  }
}

async function main() {
  const entries = extractUrls();
  const results = new Map();
  let cursor = 0;

  async function worker() {
    while (cursor < entries.length) {
      const idx = cursor++;
      const { url, file } = entries[idx];
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const status = await check(url, controller.signal);
        results.set(url, {
          status,
          kind:
            status < 400
              ? "ok"
              : [403, 405, 429, 451].includes(status)
                ? "blocked"
                : "broken",
          file,
        });
      } catch (err) {
        results.set(url, {
          status: 0,
          kind: "broken",
          error: err?.name === "AbortError" ? "timeout" : String(err?.cause ?? err),
          file,
        });
      } finally {
        clearTimeout(timer);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const summary = { ok: 0, blocked: 0, broken: 0 };
  const broken = [];
  const blocked = [];
  for (const [url, r] of results) {
    summary[r.kind]++;
    if (r.kind === "broken") broken.push({ url, ...r });
    else if (r.kind === "blocked") blocked.push({ url, ...r });
  }

  const useJson = process.argv.includes("--json");
  if (useJson) {
    console.log(JSON.stringify({ summary, broken, blocked }, null, 2));
    return;
  }

  console.log(`\nValidated ${results.size} unique URLs`);
  console.log(`  OK:       ${summary.ok}`);
  console.log(`  BLOCKED:  ${summary.blocked} (bot protection — likely fine)`);
  console.log(`  BROKEN:   ${summary.broken}`);

  if (blocked.length) {
    console.log("\nBlocked (verify manually if concerned):");
    for (const b of blocked) console.log(`  [${b.status}] ${b.url} (${b.file})`);
  }
  if (broken.length) {
    console.log("\nBROKEN URLs:");
    for (const b of broken) {
      console.log(`  [${b.status}] ${b.url} (${b.file})${b.error ? ` — ${b.error}` : ""}`);
    }
  }
  process.exit(summary.broken > 0 ? 1 : 0);
}

main();
