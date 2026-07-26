#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成 sitemap.xml 与 robots.txt
列出 docs 目录下所有可索引的 HTML 页面, lastmod 取自 articles.json 的 date。
"""
import json
import os
import re
import sys
from xml.sax.saxutils import escape as xescape

DOCS = sys.argv[1] if len(sys.argv) > 1 else "."
SITE = "https://tanhaosheng.github.io"
EXCLUDE = {"404.html"}

def load_dates():
    path = os.path.join(DOCS, "data", "articles.json")
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return {a.get("file"): a.get("date", "2026-07-25") for a in data.get("articles", [])}

def main():
    dates = load_dates()
    htmls = [f for f in os.listdir(DOCS) if f.endswith(".html") and f not in EXCLUDE]
    htmls.sort()
    urls = []
    for f in htmls:
        loc = SITE + "/" if f == "index.html" else f"{SITE}/{f}"
        lastmod = dates.get(f, "2026-07-25")
        urls.append(f'  <url>\n    <loc>{xescape(loc)}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>')
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n"
    with open(os.path.join(DOCS, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap)
    robots = f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n"
    with open(os.path.join(DOCS, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(robots)
    print(f"sitemap.xml 生成: {len(urls)} 个 URL")
    print("robots.txt 已生成")

if __name__ == "__main__":
    main()
