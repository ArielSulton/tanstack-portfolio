import { createFileRoute } from "@tanstack/react-router";
import { SimakPage } from "../../components/sections/simak-page";
import { simak } from "../../data/simak";
import { siteUrl } from "../../lib/site";

const socialImage = `${siteUrl}/images/branding/hero-light-social.png`;

export const Route = createFileRoute("/apps/simak")({
	component: () => <SimakPage />,
	// Root meta entries with the same name/property are replaced by these; links
	// are not deduplicated, so the root no longer declares a canonical of its own.
	head: () => ({
		meta: [
			{ title: simak.seo.title },
			{ name: "description", content: simak.seo.description },
			{ name: "keywords", content: simak.seo.keywords },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: simak.pageUrl },
			{ property: "og:title", content: simak.seo.title },
			{ property: "og:description", content: simak.seo.description },
			{ property: "og:image", content: socialImage },
			{ property: "og:locale", content: "id_ID" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:url", content: simak.pageUrl },
			{ name: "twitter:title", content: simak.seo.title },
			{ name: "twitter:description", content: simak.seo.description },
			{ name: "twitter:image", content: socialImage },
		],
		links: [{ rel: "canonical", href: simak.pageUrl }],
	}),
});
