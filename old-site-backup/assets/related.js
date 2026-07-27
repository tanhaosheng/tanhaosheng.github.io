/* 相关文章模块：从 data/articles.json 读取同分类文章，渲染可点击内链卡片。
   目标：提升停留时长与翻页率 → 间接提升 AdSense RPM。
   纯前端、无依赖。所有根目录页面通用（assets/related.js 相对路径）。 */
(function () {
  var BOX_ID = "related-articles";

  function getBox() { return document.getElementById(BOX_ID); }
  function slug() {
    var p = location.pathname.split("/").pop();
    return p.replace(/\.html$/, "");
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function catFromId(id) {
    var m = {
      "business-hub": "business", "science-hub": "science", "tech-hub": "tech",
      "health-hub": "health", "education-hub": "education", "ai-hub": "ai"
    };
    if (m[id]) return m[id];
    return id.split("-")[0];
  }

  function render(map) {
    var box = getBox();
    if (!box) return;
    var id = slug();
    var self = map[id] || null;
    var cat = self ? self.category : catFromId(id);
    if (!cat) return;

    var all = [];
    for (var k in map) if (map.hasOwnProperty(k)) all.push(map[k]);

    var list = all
      .filter(function (a) { return a.category === cat && a.id !== id && a.file !== id + ".html"; })
      .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); })
      .slice(0, 6);

    if (list.length < 3) {
      // 兜底：同分类不足时，展示最新文章
      list = all
        .filter(function (a) { return a.id !== id && a.file !== id + ".html"; })
        .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); })
        .slice(0, 6);
    }
    if (!list.length) return;

    var label = self ? "More in " + cap(cat) : "Related Articles";
    var html =
      '<div style="margin-top:36px;padding:24px;background:#f5f0ff;border:1px solid #e8def8;border-radius:12px;">' +
      '<h3 style="margin:0 0 14px;color:#6C3CE1;font-size:1.2em;">' + esc(label) + "</h3>" +
      '<ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
    list.forEach(function (a) {
      html +=
        '<li style="margin:0;"><a href="' + esc(a.file) + '" style="display:block;padding:12px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;color:#1a1a2e;text-decoration:none;font-size:0.92em;line-height:1.45;">' +
        esc(a.title) + "</a></li>";
    });
    html += "</ul></div>";
    box.innerHTML = html;
  }

  var box = getBox();
  if (!box) return;
  fetch("data/articles.json")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var map = {};
      (d.articles || []).forEach(function (a) {
        if (a.id) map[a.id] = a;
        if (a.file) map[a.file] = a;
      });
      render(map);
    })
    .catch(function () {});
})();
