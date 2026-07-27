import { a as SITE, c as __exportAll, r as DOMAINS, s as createComponent } from "./SiteFooter_BKUJEopM.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as getCollection } from "./_astro_content_BlEAWu5F.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CntBSbCY.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const posts = await getCollection("articles", ({ data }) => data.published !== false);
	const latest = [...posts].sort((a, b) => (b.data.date || "").localeCompare(a.data.date || "")).slice(0, 12);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${SITE.name} — AI-Era Tool-Selection Guide`,
		"description": SITE.tagline
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="hero"><h1>🛠️ ${SITE.name}</h1><p class="subtitle">${SITE.tagline}</p><a href="#portal" class="cta">📚 Explore by Domain →</a></section><div class="container" id="portal"><a href="/news.html" style="display:block;background:linear-gradient(135deg,#fefce8,#f5f3ff);border:3px solid var(--accent);border-radius:16px;padding:24px 30px;text-decoration:none;margin-bottom:30px;transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''"><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><span style="font-size:2em;">📰</span><div style="flex:1;min-width:200px;"><h2 style="margin:0;font-size:1.2em;color:var(--primary);">Latest News — Live Feed</h2><p style="margin:2px 0 0;font-size:0.82em;color:var(--text-light);">Click to read full coverage across AI, dev tools and tech products</p></div><span style="background:var(--accent);color:#1a1a2e;padding:8px 20px;border-radius:50px;font-weight:700;font-size:0.85em;white-space:nowrap;">View All →</span></div></a><a href="/ai-tool-quiz.html" style="display:block;background:linear-gradient(135deg,#eef0ff,#f5f3ff);border:3px solid #7c6cff;border-radius:16px;padding:22px 28px;text-decoration:none;margin-bottom:30px;transition:transform 0.2s;color:#1a1a2e;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''"><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><span style="font-size:2em;">🎯</span><div style="flex:1;min-width:200px;"><h2 style="margin:0;font-size:1.2em;color:#2a2350;">AI 工具选型小测验 · 30 秒找到适合你的工具</h2><p style="margin:2px 0 0;font-size:0.82em;color:#5b5b7a;">回答 4 个问题，拿到专为你定制的 AI 工具组合推荐</p></div><span style="background:linear-gradient(90deg,#7c6cff,#22d3ee);color:#fff;padding:8px 20px;border-radius:50px;font-weight:700;font-size:0.85em;white-space:nowrap;">开始测验 →</span></div></a><h2 class="section-title" style="text-align:center;border-bottom:none;">🧭 Three Focused Domains</h2><p style="text-align:center;color:var(--text-light);margin-top:-15px;font-size:0.95em;">We help developers and decision-makers choose the right tool — nothing else.</p><div class="portal-grid">${DOMAINS.map((d) => renderTemplate`<a${addAttribute(`/category-${d.slug}.html`, "href")} class="portal-card"><div class="icon">${d.icon}</div><h3>${d.name}</h3><p>${d.blurb}</p><span class="badge">${posts.filter((p) => p.data.domain === d.slug).length} Articles</span></a>`)}</div><h2 class="section-title">🆕 Latest Updates</h2><div class="article-grid">${latest.map((p) => renderTemplate`<a class="article-card"${addAttribute(`/${p.data.slug}.html`, "href")}><h3>${p.data.title}</h3><p>${p.data.description}</p><span class="pill">${p.data.domain}</span></a>`)}</div><a href="/news.html" style="display:block;text-align:center;color:var(--primary);font-weight:600;margin:20px 0 30px;text-decoration:none;">📰 View All News →</a></div>` })}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/index.astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
