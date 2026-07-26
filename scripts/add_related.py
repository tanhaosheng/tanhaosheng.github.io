#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
给所有内容页注入"相关文章"模块:
  - 在第一个 <footer> 前插入 <div id="related-articles"></div>
  - 在 </body> 前插入 <script src="assets/related.js"></script>
幂等(已含 id="related-articles" 则跳过)。
排除: index / news / 404 / about / contact / privacy 等工具页。
"""
import os
import re
import sys

DOCS = sys.argv[1] if len(sys.argv) > 1 else "."
CONTAINER = '<div id="related-articles"></div>'
SCRIPT = '<script src="assets/related.js"></script>'
EXCLUDE = {"index.html", "news.html", "404.html", "about.html", "contact.html", "privacy.html"}

def main():
    ok = skip = 0
    for f in sorted(os.listdir(DOCS)):
        if not f.endswith(".html") or f in EXCLUDE:
            continue
        fpath = os.path.join(DOCS, f)
        with open(fpath, encoding="utf-8") as fh:
            html = fh.read()
        if 'id="related-articles"' in html:
            skip += 1
            continue
        changed = False
        if CONTAINER not in html:
            if re.search(r"<footer[^>]*>", html):
                html = re.sub(r"(<footer[^>]*>)", CONTAINER + "\n\\1", html, count=1)
            else:
                html = html.replace("</body>", CONTAINER + "\n</body>", 1)
            changed = True
        if SCRIPT not in html:
            html = html.replace("</body>", SCRIPT + "\n</body>", 1)
            changed = True
        if changed:
            with open(fpath, "w", encoding="utf-8") as fh:
                fh.write(html)
            ok += 1
    print(f"相关文章模块: 注入 {ok} 页, 跳过 {skip} 页")

if __name__ == "__main__":
    main()
