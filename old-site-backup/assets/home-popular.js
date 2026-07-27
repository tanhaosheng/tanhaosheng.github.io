/* 首页「📌 置顶精选」+「🔥 热门文章」组件（纯前端，无依赖）。
   置顶：读取 data/featured.json（主编精选，100% 可靠、无外部依赖）。
   热门：读取 data/hot.json（由 scripts/update_hot.py 按点赞数生成，每周刷新）。
        hot.json 缺失或为空时，自动回退展示置顶精选，保证区块不空。 */
(function () {
  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderPinned(list) {
    var box = document.getElementById("pinned-section");
    if (!box) return;
    if (!list || !list.length) { box.style.display = "none"; return; }
    var h = '<h2 class="section-title">📌 置顶精选</h2>';
    h += '<p style="margin-top:-15px;font-size:0.9em;color:var(--text-light);">主编长期置顶的优质文章</p>';
    h += '<div class="featured-grid">';
    list.forEach(function (a) {
      h += '<a href="' + esc(a.file) + '" class="featured-card">';
      h += '<div class="card-icon">' + (a.icon || "📄") + "</div>";
      h += "<h3>" + esc(a.title) + "</h3>";
      h += "<p>" + esc(a.desc || "") + "</p>";
      h += '<span class="tag">' + (a.tag || "Featured") + "</span>";
      h += "</a>";
    });
    h += "</div>";
    box.innerHTML = h;
  }

  function renderHot(list) {
    var box = document.getElementById("hot-section");
    if (!box) return;
    if (!list || !list.length) { box.style.display = "none"; return; }
    var h = '<h2 class="section-title">🔥 热门文章</h2>';
    h += '<p style="margin-top:-15px;font-size:0.9em;color:var(--text-light);">读者点赞最多的文章（每周更新）</p>';
    h += '<div class="mini-grid">';
    list.slice(0, 9).forEach(function (a) {
      h += '<a href="' + esc(a.file) + '" class="mini-card">';
      h += "<h4>" + esc(a.title) + "</h4>";
      h += "<p>👍 " + (a.likes || 0) + " 次点赞</p>";
      h += "</a>";
    });
    h += "</div>";
    box.innerHTML = h;
  }

  Promise.all([
    fetch("data/featured.json?_t=" + Date.now()).then(function (r) { return r.json(); }).catch(function () { return []; }),
    fetch("data/hot.json?_t=" + Date.now()).then(function (r) { return r.json(); }).catch(function () { return null; })
  ]).then(function (res) {
    var featured = res[0] || [];
    var hot = res[1];
    renderPinned(featured);
    var hotList = (hot && hot.articles && hot.articles.length) ? hot.articles : featured;
    renderHot(hotList);
  });
})();
