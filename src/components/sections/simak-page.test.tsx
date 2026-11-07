// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import {
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
	RouterProvider,
} from "@tanstack/react-router";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { simak } from "../../data/simak";
import { Route as rootRoute } from "../../routes/__root";
import { Route as simakRoute } from "../../routes/apps/simak";
import { Route as indexRoute } from "../../routes/index";
import { SimakPage } from "./simak-page";

type SimakData = typeof simak;

const EM_DASH = "—";
const EN_DASH = "–";

async function renderPage(data: SimakData = simak) {
	const root = createRootRoute({ component: Outlet });
	const page = createRoute({
		getParentRoute: () => root,
		path: "/",
		component: () => <SimakPage data={data} />,
	});
	const router = createRouter({
		routeTree: root.addChildren([page]),
		history: createMemoryHistory({ initialEntries: ["/"] }),
	});
	await router.load();
	return render(<RouterProvider router={router} />);
}

function stringsIn(value: unknown): string[] {
	if (typeof value === "string") return [value];
	if (Array.isArray(value)) return value.flatMap(stringsIn);
	if (value && typeof value === "object")
		return Object.values(value).flatMap(stringsIn);
	return [];
}

function linksOf(
	head: { links?: Record<string, unknown>[] },
	rel: string,
): Record<string, unknown>[] {
	return (head.links ?? []).filter((link) => link.rel === rel);
}

// jsdom does not implement scrolling; the router calls it after navigation.
window.scrollTo = () => {};
// Render the shared wallpaper in its static mode; WebGL is covered in-browser.
window.matchMedia = (query) => ({
	matches: query === "(prefers-reduced-motion: reduce)",
	media: query,
	onchange: null,
	addListener: () => {},
	removeListener: () => {},
	addEventListener: () => {},
	removeEventListener: () => {},
	dispatchEvent: () => false,
});

afterEach(cleanup);

describe("Simak landing page content", () => {
	it("renders exactly one h1 and a main landmark with an Indonesian lang", async () => {
		const { container } = await renderPage();
		expect(container.querySelectorAll("h1")).toHaveLength(1);
		expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
			"Simak",
		);
		const main = container.querySelector("main");
		expect(main?.id).toBe("main-content");
		expect(main?.getAttribute("lang")).toBe("id");
	});

	it("keeps heading order (no level is skipped)", async () => {
		const { container } = await renderPage();
		const levels = [...container.querySelectorAll("h1,h2,h3")].map((heading) =>
			Number(heading.tagName.slice(1)),
		);
		for (const [index, level] of levels.entries())
			if (index > 0) expect(level - levels[index - 1]).toBeLessThanOrEqual(1);
	});

	it("states the status, the coming-soon download area and the non-affiliation notice", async () => {
		const { container } = await renderPage();
		const text = container.textContent ?? "";
		expect(text).toContain("Pra-rilis");
		expect(text).toContain("Segera hadir");
		expect(text).toContain(
			"Simak tidak berafiliasi dengan, disponsori, atau didukung oleh Spotify AB. Spotify adalah merek dagang Spotify AB.",
		);
		const download = screen.getByRole("button", { name: /Unduh/ });
		expect((download as HTMLButtonElement).disabled).toBe(true);
	});

	it("includes the attributions", async () => {
		const { container } = await renderPage();
		const text = container.textContent ?? "";
		expect(text).toContain("Tanzil Project");
		expect(text).toContain("CC BY 3.0");
		expect(text).toContain("basmalah");
		expect(text).toContain("Kementerian Agama RI");
		expect(text).toContain("nonkomersial");
		expect(text).toContain("tidak pernah didistribusikan");
	});

	it("states the MIT code license and the separate data terms", async () => {
		const { container } = await renderPage();
		const credits = container.querySelector("#kredit")?.textContent ?? "";
		expect(credits).toContain("license MIT");
		expect(credits).toContain(
			"tidak tercakup license MIT dan tetap mengikuti ketentuannya sendiri",
		);
		expect(credits).toContain("belum sepenuhnya open data");
		expect(simak.license).toBe("MIT");
		const hrefs = [...container.querySelectorAll("a")].map((a) =>
			a.getAttribute("href"),
		);
		expect(hrefs).toContain(
			"https://github.com/ArielSulton/quran-widget/blob/main/LICENSE",
		);
		expect(hrefs).toContain(
			"https://github.com/ArielSulton/quran-widget/blob/main/data/README.md",
		);
	});

	it("never claims the project has no license or is not open source", async () => {
		const { container } = await renderPage();
		const text = container.textContent ?? "";
		expect(text).not.toMatch(
			/belum ada lisensi|bukan open source|not open source/i,
		);
		for (const value of stringsIn(simak))
			expect(value).not.toMatch(
				/belum ada lisensi|bukan open source|not open source/i,
			);
	});

	it("renders the open source section with contribution steps, help wanted and links", async () => {
		const { container } = await renderPage();
		const section = container.querySelector("#kontribusi");
		expect(section).not.toBeNull();
		const text = section?.textContent ?? "";
		expect(text).toContain("fork");
		expect(text).toContain("pull request");
		expect(text).toContain("accuracy_probe");
		expect(text).toContain("Wayland");
		expect(text).toContain("MIT license");
		expect(section?.querySelector("[lang=en]")).not.toBeNull();
		expect(
			section?.querySelectorAll(".simak-oss-steps li").length,
		).toBeGreaterThanOrEqual(3);
		expect(
			section?.querySelectorAll(".simak-oss-steps li").length,
		).toBeLessThanOrEqual(4);
		expect(section?.querySelectorAll(".simak-oss-help li").length).toBe(
			simak.openSource.helpWanted.length,
		);
		const guide = screen.getByRole("link", { name: /Panduan kontribusi/ });
		expect(guide.getAttribute("href")).toBe(
			"https://github.com/ArielSulton/quran-widget/blob/main/CONTRIBUTING.md",
		);
		expect(guide.getAttribute("href")).toBe(simak.contributingUrl);
		const repo = section?.querySelector(`a[href="${simak.repoUrl}"]`);
		expect(repo?.textContent).toContain("Lihat di GitHub");
	});

	it("shows the English tagline under the Indonesian one", async () => {
		const { container } = await renderPage();
		const english = container.querySelector(".simak-tagline-en");
		expect(english?.textContent).toBe("The ayah being recited, as you listen.");
		expect(english?.getAttribute("lang")).toBe("en");
	});

	it("answers whether Simak is open source in the FAQ", async () => {
		const { container } = await renderPage();
		const item = [...container.querySelectorAll("details")].find((details) =>
			details
				.querySelector("summary")
				?.textContent?.includes("Apakah Simak open source?"),
		);
		expect(item).toBeDefined();
		const answer = item?.querySelector("p")?.textContent ?? "";
		expect(answer).toContain("license MIT");
		expect(answer).toContain("fork");
		expect(answer).toContain("pull request");
		expect(answer).toContain("ketentuannya sendiri");
	});

	it("lists the honest limitations", async () => {
		const { container } = await renderPage();
		const text = container.textContent ?? "";
		expect(text).toContain("Hanya Juz 30");
		expect(text).toContain("35 dari 37 surah");
		expect(text).toContain("Al-Qari'ah (101)");
		expect(text).toContain("Al-Humazah (104)");
		expect(text).toContain("belum diverifikasi");
	});

	it("renders keyboard hints as kbd and FAQ items as native details", async () => {
		const { container } = await renderPage();
		const keys = [...container.querySelectorAll("kbd")].map(
			(key) => key.textContent,
		);
		expect(keys).toEqual(expect.arrayContaining(["[", "]", "Shift"]));
		const details = container.querySelectorAll("details");
		expect(details.length).toBeGreaterThanOrEqual(3);
		expect(details.length).toBeLessThanOrEqual(6);
		for (const item of details)
			expect(item.querySelector("summary")).not.toBeNull();
	});

	it("uses no em dash or en dash in the rendered text", async () => {
		const { container } = await renderPage();
		const text = container.textContent ?? "";
		expect(text).not.toContain(EM_DASH);
		expect(text).not.toContain(EN_DASH);
	});

	it("gives every image alt text and intrinsic size", async () => {
		const { container } = await renderPage();
		const images = [...container.querySelectorAll("img")];
		expect(images.length).toBeGreaterThanOrEqual(2);
		for (const image of images) {
			expect(image.getAttribute("alt")?.trim()).toBeTruthy();
			expect(image.getAttribute("width")).toBeTruthy();
			expect(image.getAttribute("height")).toBeTruthy();
		}
	});

	it("pairs each widget screenshot with a light and a dark file", async () => {
		const { container } = await renderPage();
		expect(container.querySelectorAll("img.simak-shot-light").length).toBe(
			container.querySelectorAll("img.simak-shot-dark").length,
		);
	});

	it("links back to the portfolio home", async () => {
		await renderPage();
		const back = screen.getByRole("link", { name: /Kembali ke portofolio/ });
		expect(back.getAttribute("href")).toBe("/");
	});
});

describe("Simak data invariants", () => {
	it("holds the facts the page depends on", () => {
		expect(simak.status).toBe("pre-release");
		expect(simak.surahCount).toBe(35);
		expect(simak.surahTotal).toBe(37);
		expect(simak.excludedSurahs.map((surah) => surah.number)).toEqual([
			101, 104,
		]);
		expect(simak.surahRange).toEqual({ from: 78, to: 114 });
		expect(
			simak.surahRange.to -
				simak.surahRange.from +
				1 -
				simak.excludedSurahs.length,
		).toBe(simak.surahCount);
		expect([...simak.lastVerifiedPlatforms]).toEqual(["Linux"]);
		expect(simak.downloads).toBeNull();
		expect(simak.repoUrl).toBe("https://github.com/ArielSulton/quran-widget");
		expect(simak.releasesUrl).toBe(`${simak.repoUrl}/releases`);
	});

	it("uses no em dash or en dash in any data string", () => {
		for (const value of stringsIn(simak)) {
			expect(value).not.toContain(EM_DASH);
			expect(value).not.toContain(EN_DASH);
		}
	});

	it("renders the repository and releases links while downloads is null", async () => {
		const { container } = await renderPage();
		const hrefs = [...container.querySelectorAll("a")].map((a) =>
			a.getAttribute("href"),
		);
		expect(hrefs).toContain(simak.repoUrl);
		expect(hrefs).toContain(simak.releasesUrl);
		expect(
			screen.getAllByRole("link", { name: /Lihat di GitHub/ }).length,
		).toBeGreaterThanOrEqual(1);
		expect(screen.getByRole("link", { name: "Halaman Releases" })).toBeTruthy();
		expect(container.querySelector("a[download]")).toBeNull();
		expect(hrefs.some((href) => href?.includes("/releases/download"))).toBe(
			false,
		);
		expect(screen.queryByRole("link", { name: /^Unduh/ })).toBeNull();
	});

	it("renders no GitHub anchors when all repository links are null", async () => {
		const { container } = await renderPage({
			...simak,
			repoUrl: null,
			releasesUrl: null,
			licenseUrl: null,
			dataTermsUrl: null,
			contributingUrl: null,
		});
		const hrefs = [...container.querySelectorAll("a")].map(
			(a) => a.getAttribute("href") ?? "",
		);
		expect(hrefs.some((href) => href.includes("github.com/ArielSulton"))).toBe(
			false,
		);
		expect(screen.queryByText("Lihat di GitHub")).toBeNull();
		expect(screen.queryByText("Halaman Releases")).toBeNull();
		expect(screen.getByText("Segera hadir")).toBeTruthy();
	});

	it("renders download anchors only for platforms with a real URL", async () => {
		const { container } = await renderPage({
			...simak,
			downloads: {
				Linux: "https://example.test/simak.AppImage",
				Windows: null,
				macOS: null,
			},
		});
		const links = [...container.querySelectorAll("a")].filter((a) =>
			a.textContent?.startsWith("Unduh"),
		);
		expect(links).toHaveLength(1);
		expect(links[0].getAttribute("href")).toBe(
			"https://example.test/simak.AppImage",
		);
		expect(container.querySelector("button[disabled]")).toBeNull();
	});
});

describe("Page heads", () => {
	const head = simakRoute.options.head?.({} as never) as {
		meta: Record<string, string>[];
		links: Record<string, unknown>[];
	};

	it("declares exactly one canonical pointing at the Simak URL", () => {
		const canonicals = linksOf(head, "canonical");
		expect(canonicals).toHaveLength(1);
		expect(canonicals[0].href).toBe("https://arielsulton.web.id/apps/simak");
	});

	it("sets the title, description and Open Graph / Twitter fields once each", () => {
		const meta = (key: "name" | "property", value: string) =>
			head.meta.filter((entry) => entry[key] === value);
		expect(head.meta.filter((entry) => entry.title)).toHaveLength(1);
		expect(head.meta.find((entry) => entry.title)?.title).toBe(
			"Simak Ayat - ayat yang sedang dibacakan",
		);
		for (const [key, value] of [
			["name", "description"],
			["name", "keywords"],
			["property", "og:url"],
			["property", "og:title"],
			["property", "og:description"],
			["property", "og:image"],
			["property", "og:type"],
			["name", "twitter:card"],
			["name", "twitter:url"],
			["name", "twitter:title"],
			["name", "twitter:description"],
			["name", "twitter:image"],
		] as const)
			expect(meta(key, value), `${value} appears once`).toHaveLength(1);
		expect(meta("property", "og:url")[0].content).toBe(simak.pageUrl);
		expect(meta("property", "og:type")[0].content).toBe("website");
		expect(meta("name", "description")[0].content).not.toContain(EM_DASH);
	});

	it("leaves the canonical to each page, not the root, so routes never stack two", () => {
		const rootHead = (
			rootRoute.options.head as unknown as (context: never) => {
				links: Record<string, unknown>[];
			}
		)({} as never);
		expect(linksOf(rootHead, "canonical")).toHaveLength(0);
		const homeHead = indexRoute.options.head?.({} as never) as {
			links: Record<string, unknown>[];
		};
		const canonicals = linksOf(homeHead, "canonical");
		expect(canonicals).toHaveLength(1);
		expect(canonicals[0].href).toBe("https://arielsulton.web.id/");
	});
});

describe("Sitemap", () => {
	it("lists the home page and the Simak page", () => {
		const sitemap = readFileSync("public/sitemap.xml", "utf8");
		expect(sitemap).toContain("<loc>https://arielsulton.web.id/</loc>");
		expect(sitemap).toContain(
			"<loc>https://arielsulton.web.id/apps/simak</loc>",
		);
	});
});
