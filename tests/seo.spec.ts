import { expect, test } from "@playwright/test";
import { blogPosts } from "@/content/blog";
import { site } from "@/content/site";
import { caseStudyProjects } from "@/content/projects";
import { publicPages } from "@/lib/public-pages";
import { isIndexableHost } from "@/lib/seo-config";
import { robotsForHost } from "@/lib/crawl";
import { serializeJsonLd } from "@/lib/schema";

const slugs = caseStudyProjects.map((project) => project.slug);
const blogSlugs = blogPosts.map((post) => post.slug);
const pairs = [
  ["/sr/", "/en/"], ["/sr/portfolio/", "/en/portfolio/"],
  ["/sr/blog/", "/en/blog/"],
  ["/sr/usluge/", "/en/services/"], ["/sr/o-nama/", "/en/about/"], ["/sr/kontakt/", "/en/contact/"],
  ["/sr/cenovnik/", "/en/pricing/"],
  ...blogSlugs.map((slug) => [`/sr/blog/${slug}/`, `/en/blog/${slug}/`]),
  ...slugs.map((slug) => [`/sr/portfolio/${slug}/`, `/en/portfolio/${slug}/`]),
];
const paths = pairs.flat();

for (const pair of pairs) {
  for (const [index, path] of pair.entries()) {
    test(`crawlable SEO HTML ${path}`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
      await expect(page.locator("html")).toHaveAttribute("lang", index === 0 ? "sr" : "en");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", site.url + path);
      for (const [language, target] of [["sr", pair[0]], ["en", pair[1]], ["x-default", pair[0]]]) {
        await expect(page.locator(`link[hreflang="${language}"]`)).toHaveAttribute("href", site.url + target);
      }
      const title = await page.title();
      expect(title).not.toContain("NMark Designs | NMark Designs");
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length).toBeGreaterThan(20);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description!);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", site.url + path);
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", title);
      await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description!);
      const image = await page.locator('meta[property="og:image"]').evaluateAll((elements) => elements[0]?.getAttribute("content") ?? null);
      const isServicesPage = path === "/sr/usluge/" || path === "/en/services/";
      if (isServicesPage) {
        expect(image).toBeNull();
        await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
        await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);
        await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(0);
      } else {
        expect(image).toMatch(/^https:\/\/nmarkdesigns\.com\/(images|projects|blog)\//);
        await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", image!);
        expect((await page.locator('meta[property="og:image:alt"]').getAttribute("content"))?.length).toBeGreaterThan(10);
      }
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();
      const headings = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll((elements) => elements.map((element) => Number(element.tagName.slice(1))));
      headings.forEach((level, i) => { if (i) expect(level).toBeLessThanOrEqual(headings[i - 1] + 1); });

      const links = await page.locator("a[href]").evaluateAll((elements) => elements.map((element) => ({ href: element.getAttribute("href")!, target: element.getAttribute("target"), rel: element.getAttribute("rel") })));
      for (const link of links) {
        expect(link.href).not.toMatch(/^https?:\/\/(www\.)?nmarkdesigns\.com/);
        if (link.href.startsWith("/") || link.href.startsWith("#")) {
          const target = new URL(link.href, `http://127.0.0.1:3100${path}`);
          expect(paths, link.href).toContain(target.pathname);
          if (target.hash && target.pathname === path) await expect(page.locator(`[id="${target.hash.slice(1)}"]`)).toHaveCount(1);
        }
        if (link.target === "_blank") expect(link.rel).toMatch(/noopener|noreferrer/);
      }
      const project = caseStudyProjects.find((entry) => path.endsWith(`/portfolio/${entry.slug}/`));
      if (project) {
        expect(title).toContain(project.title);
        expect(description).toBe(project.caseStudy.overview[index === 0 ? "sr" : "en"]);
        await expect(page.locator(`main a[href="${project.websiteUrl}"]`)).toHaveCount(1);
        await expect(page.locator('main > article')).toHaveCount(1);
        expect(image).toBe(site.url + project.featuredImage.src);
      }
      if (path === "/sr/kontakt/" || path === "/en/contact/") await expect(page.locator("main address")).toHaveCount(1);
      const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
      const blogPost = blogPosts.find((entry) => path.endsWith(`/blog/${entry.slug}/`));
      const expectedCount = path === "/sr/" || path === "/en/" || path === "/sr/o-nama/" || path === "/en/about/" || Boolean(project) || Boolean(blogPost) ? 1 : 0;
      expect(schema).toHaveLength(expectedCount);
      for (const source of schema) {
        const value: unknown = JSON.parse(source);
        expect(value).toMatchObject({ "@context": "https://schema.org" });
        if (blogPost) expect(value).toMatchObject({ "@graph": [
          { "@type": "BlogPosting", headline: blogPost.title[index === 0 ? "sr" : "en"], url: site.url + path },
          { "@type": "BreadcrumbList" },
        ] });
        expect(source).not.toMatch(/"(address|openingHours|priceRange|legalName|numberOfEmployees|foundingDate|aggregateRating|review|areaServed|SearchAction|FAQPage|Offer|Product|Article)"/);
        if (project) expect(value).toMatchObject({ "@type": "BreadcrumbList", itemListElement: [
          { position: 1, item: `${site.url}/${index === 0 ? "sr" : "en"}/portfolio/` },
          { position: 2, name: project.title, item: site.url + path },
        ] });
        if (path === "/sr/" || path === "/en/") expect(value).toMatchObject({ "@graph": [
          { "@type": "Organization", name: "NMark Designs", email: "info@nmarkdesigns.com", telephone: "+381643005654", sameAs: [site.instagramUrl] },
          { "@type": "WebSite", name: "NMark Designs" },
        ] });
        if (path === "/sr/o-nama/" || path === "/en/about/") expect(value).toMatchObject({ "@type": "Person", name: "Nikola Marković", jobTitle: "Frontend developer" });
      }
      const images = await page.locator("main img").evaluateAll((elements) => elements.map((image) => ({
        alt: image.getAttribute("alt"),
        width: image.getAttribute("width"),
        height: image.getAttribute("height"),
        decorativeHeroLayer: Boolean(image.closest("[data-hero-artwork]")),
      })));
      for (const image of images) {
        if (image.decorativeHeroLayer) expect(image.alt).toBe("");
        else expect(image.alt).toBeTruthy();
        expect(Number(image.width)).toBeGreaterThan(0);
        expect(Number(image.height)).toBeGreaterThan(0);
      }
      await context.close();
    });
  }
}

test("complete sitemap, unique metadata and preview robots", async ({ page, request }) => {
  expect(publicPages.map((entry) => entry.path).sort()).toEqual([...paths].sort());
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const source = await response.text();
  await page.setContent("<main></main>");
  const urls = await page.evaluate((xml) => Array.from(new DOMParser().parseFromString(xml, "application/xml").getElementsByTagName("url")).map((entry) => entry.getElementsByTagName("loc")[0].textContent), source);
  expect(urls.sort()).toEqual(paths.map((path) => site.url + path).sort());
  expect(source).not.toMatch(/lastmod|changefreq|priority|localhost/);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of paths) {
    const html = await (await request.get(path)).text();
    const result = await page.evaluate((html) => { const doc = new DOMParser().parseFromString(html, "text/html"); return { title: doc.title, description: doc.querySelector('meta[name="description"]')?.getAttribute("content") }; }, html);
    expect(titles.has(result.title), path).toBe(false);
    expect(descriptions.has(result.description!), path).toBe(false);
    titles.add(result.title); descriptions.add(result.description!);
  }
  for (const host of ["127.0.0.1:3100", "preview.vercel.app"]) {
    const robots = await request.get("/robots.txt", { headers: { host } });
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Disallow: /");
    expect(await robots.text()).not.toContain("Sitemap:");
    expect(robots.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  }
  const productionRobots = await request.get("/robots.txt", { headers: { host: "nmarkdesigns.com" } });
  const productionRobotsSource = await productionRobots.text();
  expect(productionRobots.status()).toBe(200);
  expect(productionRobotsSource).toContain("Allow: /");
  expect(productionRobotsSource).toContain("Sitemap: https://nmarkdesigns.com/sitemap.xml");
  expect(productionRobotsSource).not.toContain("Disallow:");
  expect(productionRobots.headers()["x-robots-tag"]).toBeUndefined();
});

test("exact permanent legacy redirects have one hop and preserve queries", async ({ request, baseURL }) => {
  const mappings = [
    ["/", "/sr/"], ["/about/", "/sr/o-nama/"], ["/contact/", "/sr/kontakt/"],
    ["/cenovnik/", "/sr/cenovnik/"], ["/portfolio/", "/sr/portfolio/"], ["/all-services/", "/sr/usluge/"],
    ...caseStudyProjects.map((project) => [new URL(project.sourceUrl).pathname, `/sr/portfolio/${project.slug}/`]),
  ];
  for (const [legacy, target] of mappings) {
    for (const path of new Set([legacy, legacy === "/" ? legacy : legacy.slice(0, -1)])) {
      const response = await request.get(`${path}?utm_source=migration`, { maxRedirects: 0 });
      expect(response.status(), path).toBe(308);
      const location = new URL(response.headers().location, baseURL);
      expect(location.pathname + location.hash).toBe(target);
      expect(location.search).toBe("?utm_source=migration");
      expect((await request.get(location.toString(), { maxRedirects: 0 })).status()).toBe(200);
    }
  }
  for (const path of paths) {
    const response = await request.get(`${path.slice(0, -1)}?utm_source=canonical`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    const location = new URL(response.headers().location, baseURL);
    expect(location.pathname).toBe(path);
    expect(location.search).toBe("?utm_source=canonical");
    expect((await request.get(location.toString(), { maxRedirects: 0 })).status()).toBe(200);
  }
});

test("unknown legacy, locales and case variants are genuine 404s", async ({ request }) => {
  for (const path of ["/unknown/", "/fr/", "/SR/", "/About/", "/portfolio/UNKNOWN/", "/sr/about/", "/en/o-nama/", "/sr/pricing/", "/en/cenovnik/", "/sr/portfolio/COOLFRIDGEGUYS/", "/en/contact/extra/", "/sr/cenovnik/extra/", "/blog/", "/portfolio-2/", "/maintenance-mode/", "/faqs/", "/usluge/", "/kontakt/", "/wp-admin/", "/wp-json/", "/sr/blog/UNKNOWN/", "/en/blog/UNKNOWN/", "/random.php", "/sr/unknown.html"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(404);
    expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    expect(response.headers().location).toBeUndefined();
  }
});

test("crawl policy is canonical-host scoped and structured data serialization is safe", () => {
  for (const host of [null, "localhost", "127.0.0.1:3100", "preview.vercel.app", "nmarkdesigns.com.evil.test", "nmarkdesigns.com:3100", "www.nmarkdesigns.com"]) {
    expect(isIndexableHost(host)).toBe(false);
    expect(robotsForHost(host)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  }
  expect(isIndexableHost("nmarkdesigns.com")).toBe(true);
  expect(robotsForHost("nmarkdesigns.com")).toEqual({ rules: { userAgent: "*", allow: "/" }, sitemap: "https://nmarkdesigns.com/sitemap.xml" });
  const value = { name: '</script><script>alert("x")</script>\u2028\u2029' };
  const serialized = serializeJsonLd(value);
  expect(serialized).not.toContain("<");
  expect(JSON.parse(serialized)).toEqual(value);
});
