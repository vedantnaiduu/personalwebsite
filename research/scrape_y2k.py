#!/usr/bin/env python3
"""
Scrape public web-design inspiration galleries for retro / Y2K / brutalist /
nostalgic personal & portfolio site inspiration using the Scrapling library.

Sources targeted:
  - httpster.net           (static HTML, easy)
  - godly.website          (static HTML + tag pages)
  - land-book.com          (static HTML)

Each gallery card exposes the LIVE site URL + the site name, which is what we
want (real portfolio/personal sites, not just gallery cards).

Run:  .venv/bin/python scrape_y2k.py
Output is printed and consumed by hand into 02-scraped-inspiration.md
"""

import re
import sys
import json
import time
from urllib.parse import urlparse

from scrapling.fetchers import Fetcher

# Keywords that hint a site is retro / y2k / nostalgic / brutalist / portfolio.
RETRO_HINTS = re.compile(
    r"(y2k|retro|nostalg|brutal|pixel|vapor|arcade|cassette|vintage|"
    r"90s|2000s|crt|maximal|playful|portfolio|studio|personal)",
    re.I,
)


def clean_url(href: str) -> str:
    """Strip referral query params so we record the real live URL."""
    if not href:
        return ""
    href = href.split("?ref=")[0]
    href = re.sub(r"[?&]ref=[^&]*", "", href)
    return href.rstrip("/")


def domain(url: str) -> str:
    try:
        return urlparse(url).netloc.replace("www.", "")
    except Exception:
        return url


# ---------------------------------------------------------------------------
# httpster.net
# ---------------------------------------------------------------------------
def scrape_httpster(max_pages=3):
    results = []
    base = "https://httpster.net/"
    pages = [base] + [f"{base}page/{i}/" for i in range(2, max_pages + 1)]
    for url in pages:
        try:
            r = Fetcher.get(url, timeout=30)
        except Exception as e:
            print(f"  [httpster] FAIL {url}: {e}", file=sys.stderr)
            continue
        if r.status != 200:
            print(f"  [httpster] status {r.status} for {url}", file=sys.stderr)
            continue
        articles = r.css("article.Preview") or r.css("article")
        for art in articles:
            title_el = art.css("a.Preview__title")
            ext_el = art.css("a.Preview__ext")
            name = (title_el[0].text or "").strip() if title_el else ""
            live = clean_url(ext_el[0].attrib.get("href", "")) if ext_el else ""
            if name and live:
                results.append(
                    {"name": name, "url": live, "source": "httpster.net"}
                )
        time.sleep(1.0)
    return results


# ---------------------------------------------------------------------------
# godly.website  (homepage + retro-relevant tag pages)
# ---------------------------------------------------------------------------
def scrape_godly():
    results = []
    urls = [
        "https://godly.website/",
        "https://godly.website/websites/portfolio",
        "https://godly.website/websites/retro",
        "https://godly.website/websites/brutalism",
        "https://godly.website/websites/playful",
        "https://godly.website/websites/colorful",
    ]
    for url in urls:
        try:
            r = Fetcher.get(url, timeout=30)
        except Exception as e:
            print(f"  [godly] FAIL {url}: {e}", file=sys.stderr)
            continue
        if r.status != 200:
            print(f"  [godly] status {r.status} for {url}", file=sys.stderr)
            continue
        for art in r.css("article"):
            # name lives in the floating label div
            label = art.css("div.absolute")
            name = ""
            for el in label:
                t = (el.text or "").strip()
                if t and len(t) < 60 and "svg" not in t.lower():
                    name = t
                    break
            # live URL is the external link (http, not internal /website/)
            live = ""
            for a in art.css("a"):
                href = a.attrib.get("href", "")
                if href.startswith("http") and "godly.website" not in href:
                    live = clean_url(href)
                    break
            if name and live:
                results.append(
                    {"name": name, "url": live, "source": f"godly.website ({domain(url) or url})"}
                )
        time.sleep(1.0)
    return results


# ---------------------------------------------------------------------------
# land-book.com
# ---------------------------------------------------------------------------
def scrape_landbook():
    results = []
    urls = [
        "https://land-book.com/",
        "https://land-book.com/websites/style-retro",
        "https://land-book.com/websites/category-portfolio",
    ]
    for url in urls:
        try:
            r = Fetcher.get(url, timeout=30)
        except Exception as e:
            print(f"  [land-book] FAIL {url}: {e}", file=sys.stderr)
            continue
        if r.status != 200:
            print(f"  [land-book] status {r.status} for {url}", file=sys.stderr)
            continue
        # land-book cards link out via data-attr or external anchors
        for a in r.css("a"):
            href = a.attrib.get("href", "")
            if href.startswith("http") and "land-book.com" not in href and "googleapis" not in href:
                name = (a.attrib.get("title") or a.text or "").strip()
                if name and len(name) < 80:
                    results.append(
                        {"name": name, "url": clean_url(href), "source": "land-book.com"}
                    )
        time.sleep(1.0)
    return results


def dedupe(items):
    seen = {}
    for it in items:
        d = domain(it["url"])
        if not d:
            continue
        if d not in seen:
            seen[d] = it
    return list(seen.values())


def main():
    all_results = []
    print("Scraping httpster.net ...", file=sys.stderr)
    all_results += scrape_httpster()
    print("Scraping godly.website ...", file=sys.stderr)
    all_results += scrape_godly()
    print("Scraping land-book.com ...", file=sys.stderr)
    all_results += scrape_landbook()

    all_results = dedupe(all_results)
    print(f"\nTotal unique sites scraped: {len(all_results)}", file=sys.stderr)
    print(json.dumps(all_results, indent=2))


if __name__ == "__main__":
    main()
