#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SEO + AdSense 注入脚本 (v2, 含修复)
给 200+ 篇自动生成的"裸文章"补齐 SEO 与变现要素。幂等(已注入则修复/跳过)。

注入内容:
  - <head>: robots 声明, Open Graph, Twitter Card
  - <head> 末尾: AdSense 自动广告代码, Google Analytics, Article JSON-LD
  - <body> 开头: 面包屑导航(可爬取的内链)
  - </body> 前: 底部内链 footer + 版权

用法:
  python3 seo_inject.py <docs目录>
"""
import json
import os
import re
import sys
from html import escape

DOCS = sys.argv[1] if len(sys.argv) > 1 else "."
ADS_CLIENT = "ca-pub-3090420115329103"
GA_ID = "G-NE8DYNMNYZ"
SITE = "https://tanhaosheng.github.io"
SITE_NAME = "AI Tool Stack"

HUB = {
    "business":  ("business-hub.html",  "Business & Finance"),
    "science":   ("science-hub.html",   "Science"),
    "tech":      ("tech-hub.html",      "Tech"),
    "health":    ("health-hub.html",    "Health"),
    "education": ("education-hub.html", "Education"),
    "ai":        ("ai-hub.html",        "AI"),
}

MARKER = "<!--seo-injected-->"

def load_articles():
    path = os.path.join(DOCS, "data", "articles.json")
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return {a.get("file"): a for a in data.get("articles", [])}

def html_attr(s):
    return escape(s, quote=True)

def repair(html):
    """修复 canonical 标签未闭合 / 残留 '>' 的问题 (v1 的 bug)。"""
    html = re.sub(
        r'<link rel="canonical" href="([^"]+)"\s*\n(\s*)' + re.escape(MARKER),
        r'<link rel="canonical" href="\1">\n\2' + MARKER,
        html,
    )
    html = re.sub(r'content="([^"]*)">\s*\n\s*>', r'content="\1">', html)
    # 移除旧版 page-level ads push(与 index.html 标准写法统一)
    html = re.sub(
        r'<script>\(adsbygoogle = window\.adsbygoogle \|\| \[\]\).push\(\{google_ad_client:[^}]*\}\);</script>\s*',
        "",
        html,
    )
    return html

def inject(html, fname, art):
    if MARKER in html:
        return repair(html), "repaired"
    m = re.search(r'<link rel="canonical" href="([^"]+)">', html)
    canonical = m.group(1) if m else f"{SITE}/{fname}"
    tm = re.search(r"<title>(.*?)</title>", html, re.S)
    title = tm.group(1).strip() if tm else (art.get("title") or fname)
    dm = re.search(r'name="description" content="([^"]+)"', html)
    desc = dm.group(1).strip() if dm else (art.get("description") or "")
    date = art.get("date") or "2026-07-25"
    prefix = fname.split("-")[0]
    hub, label = HUB.get(prefix, ("index.html", "Home"))

    og_block = f'''    {MARKER}
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="{SITE_NAME}">
    <meta property="og:locale" content="en_US">
    <meta property="og:title" content="{html_attr(title)}">
    <meta property="og:description" content="{html_attr(desc)}">
    <meta property="og:url" content="{html_attr(canonical)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{html_attr(title)}">
    <meta name="twitter:description" content="{html_attr(desc)}">
'''
    if m:
        html = html.replace(m.group(0), m.group(0) + "\n" + og_block, 1)
    else:
        html = html.replace("<head>", "<head>\n" + og_block, 1)

    json_ld = json.dumps({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": desc,
        "url": canonical,
        "datePublished": date,
        "dateModified": date,
        "author": {"@type": "Organization", "name": SITE_NAME},
        "publisher": {"@type": "Organization", "name": SITE_NAME},
        "mainEntityOfPage": {"@type": "WebPage", "@id": canonical}
    }, ensure_ascii=False)
    head_end = f'''    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADS_CLIENT}" crossorigin="anonymous"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','{GA_ID}');</script>
    <script type="application/ld+json">{json_ld}</script>
'''
    html = html.replace("</head>", head_end + "</head>", 1)

    nav = f'''    <nav style="font-size:14px;padding:12px 0;color:#6b7280;border-bottom:1px solid #e5e7eb;margin-bottom:22px;">
      <a href="index.html" style="color:#6C3CE1;text-decoration:none;">&#127968; Home</a> &rsaquo;
      <a href="{hub}" style="color:#6C3CE1;text-decoration:none;">{label}</a> &rsaquo;
      <a href="news.html" style="color:#6C3CE1;text-decoration:none;">News</a>
    </nav>
'''
    html = re.sub(r"<body[^>]*>", lambda x: x.group(0) + "\n" + nav, html, count=1)

    footer = f'''    <footer style="margin-top:40px;padding:24px;background:#1a1a2e;color:#fff;text-align:center;font-size:14px;border-radius:12px;">
      <p>
        <a href="index.html" style="color:#a78bfa;text-decoration:none;">Home</a> &middot;
        <a href="{hub}" style="color:#a78bfa;text-decoration:none;">{label} Hub</a> &middot;
        <a href="news.html" style="color:#a78bfa;text-decoration:none;">News</a> &middot;
        <a href="about.html" style="color:#a78bfa;text-decoration:none;">About</a> &middot;
        <a href="privacy.html" style="color:#a78bfa;text-decoration:none;">Privacy</a>
      </p>
      <p style="opacity:.7;margin-top:8px;">&copy; 2026 {SITE_NAME} &middot; Exploring AI, Tech, Science &amp; more</p>
    </footer>
'''
    html = html.replace("</body>", footer + "    </body>", 1)
    return html, "ok"

def main():
    arts = load_articles()
    pattern = re.compile(r"^(business|science|tech|health|education|ai)-\d+\.html$")
    files = sorted(f for f in os.listdir(DOCS) if pattern.match(f))
    ok = repaired = 0
    for f in files:
        fpath = os.path.join(DOCS, f)
        with open(fpath, encoding="utf-8") as fh:
            html = fh.read()
        new_html, status = inject(html, f, arts.get(f, {}))
        if new_html != html:
            with open(fpath, "w", encoding="utf-8") as fh:
                fh.write(new_html)
        if status == "ok":
            ok += 1
        else:
            repaired += 1
    print(f"完成: 新注入 {ok} 篇, 修复 {repaired} 篇, 共 {len(files)} 篇")

if __name__ == "__main__":
    main()
