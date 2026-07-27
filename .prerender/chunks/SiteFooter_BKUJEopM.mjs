import { C as unescapeHTML, T as createAstro, X as InvalidComponentArgs, _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent, v as defineScriptVars, z as AstroError } from "./server_C5Sh4yOg.mjs";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/astro/dist/runtime/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
//#endregion
//#region src/data/site.ts
var SITE = {
	name: "AI Tool Stack",
	tagline: "The AI-era tool-selection guide — pick the right model, dev tool, and tech product with clear, source-backed comparisons.",
	base_url: "https://tanhaosheng.github.io",
	og_image: "https://tanhaosheng.github.io/assets/og-ai-tools.jpg",
	adsense: "ca-pub-3090420115329103",
	ga: "G-NE8DYNMNYZ",
	lang: "en",
	email: "jstz1983@163.com"
};
var NAV = [
	{
		label: "🏠 Home",
		href: "/index.html"
	},
	{
		label: "📰 News",
		href: "/news.html"
	},
	{
		label: "🤖 AI",
		href: "/category-ai.html"
	},
	{
		label: "💻 Dev Tools",
		href: "/category-dev-tools.html"
	},
	{
		label: "🖥️ Tech Products",
		href: "/category-tech-products.html"
	},
	{
		label: "About",
		href: "/about.html"
	}
];
var FOOTER_LINKS = [
	{
		name: "Home",
		href: "/index.html"
	},
	{
		name: "About",
		href: "/about.html"
	},
	{
		name: "AI Models & Tools",
		href: "/category-ai.html"
	},
	{
		name: "Developer Tools",
		href: "/category-dev-tools.html"
	},
	{
		name: "Tech Products",
		href: "/category-tech-products.html"
	},
	{
		name: "Privacy",
		href: "/privacy.html"
	}
];
var DOMAINS = [
	{
		slug: "ai",
		name: "AI Models & Tools",
		icon: "🤖",
		blurb: "Model comparisons (DeepSeek vs Kimi, ChatGPT vs Claude), tool reviews, API selection, and architecture explainers. Our home turf."
	},
	{
		slug: "dev-tools",
		name: "Developer Tools",
		icon: "💻",
		blurb: "Coding assistants, editors, cloud services, and CI/CD tools — the same audience as AI, the practical stack for builders."
	},
	{
		slug: "tech-products",
		name: "Tech Products",
		icon: "🖥️",
		blurb: "Laptops, SSDs, monitors, routers and hardware comparisons — a traffic entry point for technical buyers."
	}
];
function domainMeta(slug) {
	return DOMAINS.find((d) => d.slug === slug);
}
//#endregion
//#region src/components/BaseHead.astro
createAstro("https://tanhaosheng.github.io");
var $$BaseHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseHead;
	const { title, description, canonical, ogType = "website", ogImage = SITE.og_image, jsonld } = Astro.props;
	return renderTemplate`<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="robots" content="index, follow"><link rel="canonical"${addAttribute(canonical, "href")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:locale" content="en_US"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}>${jsonld && renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonld))}<\/script>`}<!-- AdSense --><script async${addAttribute(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsense}`, "src")} crossorigin="anonymous"><\/script><!-- Google Analytics 4 --><script async${addAttribute(`https://www.googletagmanager.com/gtag/js?id=${SITE.ga}`, "src")}><\/script><script>(function(){${defineScriptVars({ gaId: SITE.ga })}
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', gaId);
})();<\/script>`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/components/BaseHead.astro", void 0);
//#endregion
//#region src/components/SiteFooter.astro
var $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="site-footer">&copy; 2024-2026 ${SITE.name}<br>${FOOTER_LINKS.map((item, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${i > 0 && " · "}<a${addAttribute(item.href, "href")}>${item.name}</a>` })}`)}</footer>`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/components/SiteFooter.astro", void 0);
//#endregion
export { SITE as a, __exportAll as c, NAV as i, $$BaseHead as n, domainMeta as o, DOMAINS as r, createComponent as s, $$SiteFooter as t };
