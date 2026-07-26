#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 countapi.xyz 读取每篇文章的点赞数，按点赞数排序，输出 Top-N 到 data/hot.json。
在「有网络」的本地机器运行：  python3 scripts/update_hot.py docs
hot.json 由首页 home-popular.js 读取，用于「🔥 热门文章」排行。

说明：
  - countapi.xyz 免费、无需注册；接口：GET /get/{ns}/{key} 返回 {"value":N}
  - 若某篇文章查询失败（网络/接口问题），记 0 并继续，不中断。
  - 想用自有后端：把 BASE 改成你的 Cloudflare Worker / 接口（需返回 {"value":N}）。
"""
import os
import sys
import json
import datetime
import urllib.request
import urllib.parse
import urllib.error

DOCS = sys.argv[1] if len(sys.argv) > 1 else "."
NS = "aitoolstack-likes"
TOP = 12


def get_likes(key):
    url = "https://api.countapi.xyz/get/%s/%s" % (NS, urllib.parse.quote(key))
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            d = json.load(r)
            return d.get("value", 0) if isinstance(d, dict) else 0
    except Exception:
        return 0


def main():
    ap = os.path.join(DOCS, "data", "articles.json")
    with open(ap, encoding="utf-8") as fh:
        data = json.load(fh)
    rows = []
    for a in data.get("articles", []):
        key = (a.get("file") or a.get("id") or "").replace(".html", "")
        if not key:
            continue
        rows.append({
            "file": a.get("file"),
            "title": a.get("title"),
            "category": a.get("category"),
            "likes": get_likes(key),
        })
    rows.sort(key=lambda x: x["likes"], reverse=True)
    out = {
        "updated": datetime.date.today().isoformat(),
        "articles": rows[:TOP],
    }
    outp = os.path.join(DOCS, "data", "hot.json")
    with open(outp, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
    print("热门榜已生成: top %d (更新 %s) -> %s" % (len(out["articles"]), out["updated"], outp))


if __name__ == "__main__":
    main()
