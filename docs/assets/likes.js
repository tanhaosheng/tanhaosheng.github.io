/* 文章点赞按钮 + 全局点赞计数（countapi.xyz），带降级处理。
   注入位置：每篇内容页的 #like-box 容器（在 related-articles 之前）。
   设计：纯前端，无后端依赖。若计数服务不可达/被网络拦截，按钮仍可用
        （本地记一次赞、乐观 +1），页面不会报错。
   想换成自己的后端？把 API_BASE 改成 Cloudflare Worker / 自建接口即可，
   接口只需提供 GET 返回 {value:N} 与 HIT 返回 {value:N+1}。 */
(function () {
  var API_BASE = "https://api.countapi.xyz";
  var NS = "aitoolstack-likes";

  var box = document.getElementById("like-box");
  if (!box) return;

  // 注入样式
  var st = document.createElement("style");
  st.textContent =
    "#like-box{margin:28px 0 4px}" +
    "#like-btn{display:inline-flex;align-items:center;gap:8px;background:#6C3CE1;color:#fff;border:none;border-radius:50px;padding:10px 22px;font-size:0.95em;font-weight:600;cursor:pointer;transition:transform .15s,background .15s}" +
    "#like-btn:hover{transform:translateY(-2px);background:#4F2DB5}" +
    "#like-btn.liked{background:#10B981;cursor:default}" +
    "#like-btn:active{transform:scale(.97)}";
  document.head.appendChild(st);

  function key() {
    var p = location.pathname.split("/").pop();
    return p.replace(/\.html$/, "") || "home";
  }
  var k = key();
  var likedKey = "liked_" + k;

  box.innerHTML = '<button id="like-btn" type="button">👍 点赞 <span id="like-count">…</span></button>';
  var btn = document.getElementById("like-btn");
  var cnt = document.getElementById("like-count");

  if (localStorage.getItem(likedKey) === "1") btn.classList.add("liked");

  // 读取当前点赞数（失败则显示 0）
  fetch(API_BASE + "/get/" + NS + "/" + encodeURIComponent(k))
    .then(function (r) { return r.json(); })
    .then(function (d) { cnt.textContent = (d && typeof d.value === "number") ? d.value : "0"; })
    .catch(function () { cnt.textContent = "0"; });

  btn.addEventListener("click", function () {
    if (localStorage.getItem(likedKey) === "1") return; // 每浏览器仅一次
    localStorage.setItem(likedKey, "1");
    btn.classList.add("liked");
    // 乐观更新
    var cur = parseInt((cnt.textContent || "0").replace(/\D/g, ""), 10) || 0;
    cnt.textContent = cur + 1;
    // 上报（失败静默保留乐观值）
    fetch(API_BASE + "/hit/" + NS + "/" + encodeURIComponent(k))
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && typeof d.value === "number") cnt.textContent = d.value; })
      .catch(function () {});
  });
})();
