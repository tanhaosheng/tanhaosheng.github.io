#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
给所有内容页注入「点赞」模块:
  - 在 <div id="related-articles"> 之前插入 <div id="like-box"></div>
    （若没有 related-articles，则放在第一个 <footer> 前，再退而求其次放 </body> 前）
  - 在 </body> 前插入 <script src="assets/likes.js"></script>
幂等(已含 id="like-box" 则跳过)。
排除: index / news / 404 / about / contact / privacy / AdSense 验证文件。
"""
import os
import re
import sys

DOCS = sys.argv[1] if len(sys.argv) > 1 else "."
BOX = '<div id="like-box"></div>'
SCRIPT = '<script src="assets/likes.js"></script>'
EXCLUDE = {"index.html", "news.html", "404.html", "about.html", "contact.html",
           "privacy.html", "googleac49fd1f46dee2b9.html"}


def main():
    ok = skip = 0
    for f in sorted(os.listdir(DOCS)):
        if not f.endswith(".html") or f in EXCLUDE:
            continue
        fpath = os.path.join(DOCS, f)
        with open(fpath, encoding="utf-8") as fh:
            html = fh.read()
        if 'id="like-box"' in html:
            skip += 1
            continue
        changed = False
        if BOX not in html:
            if '<div id="related-articles"></div>' in html:
                html = html.replace(
                    '<div id="related-articles"></div>',
                    BOX + '\n    <div id="related-articles"></div>', 1)
            elif re.search(r"<footer[^>]*>", html):
                html = re.sub(r"(<footer[^>]*>)", BOX + "\n\\1", html, count=1)
            else:
                html = html.replace("</body>", BOX + "\n</body>", 1)
            changed = True
        if SCRIPT not in html:
            html = html.replace("</body>", SCRIPT + "\n</body>", 1)
            changed = True
        if changed:
            with open(fpath, "w", encoding="utf-8") as fh:
                fh.write(html)
            ok += 1
    print(f"点赞模块: 注入 {ok} 页, 跳过 {skip} 页")


if __name__ == "__main__":
    main()
