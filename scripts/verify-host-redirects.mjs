#!/usr/bin/env node
/**
 * Assert GitHub Pages host redirects stay a single 301 hop to the HTTPS apex.
 * SEO crawlers will still list these URLs as 3XX when they probe DNS variants;
 * that is expected and correct. This script only guards against regressions
 * (chains, wrong targets, or HTTPS enforcement turning off).
 */

const CANONICAL = "https://malaj-design.com/";

const PROBES = [
  "https://www.malaj-design.com/",
  "http://www.malaj-design.com/",
  "http://malaj-design.com/",
];

async function probe(url) {
  const response = await fetch(url, {
    method: "HEAD",
    redirect: "manual",
    headers: { "user-agent": "malaj-design-host-redirect-check/1.0" },
  });

  const location = response.headers.get("location");
  return {
    url,
    status: response.status,
    location,
  };
}

function assertSingleHop({ url, status, location }) {
  if (status !== 301) {
    throw new Error(`${url}: expected 301, got ${status}`);
  }
  if (location !== CANONICAL) {
    throw new Error(`${url}: expected Location ${CANONICAL}, got ${location}`);
  }
}

const apex = await fetch(CANONICAL, {
  method: "HEAD",
  redirect: "manual",
  headers: { "user-agent": "malaj-design-host-redirect-check/1.0" },
});

if (apex.status !== 200) {
  throw new Error(`${CANONICAL}: expected 200, got ${apex.status}`);
}

const results = [];
for (const url of PROBES) {
  const result = await probe(url);
  assertSingleHop(result);
  results.push(result);
}

for (const result of results) {
  console.log(`ok  ${result.status} ${result.url} -> ${result.location}`);
}
console.log(`ok  200 ${CANONICAL}`);
