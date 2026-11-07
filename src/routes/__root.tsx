import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ArrowLeft, Home } from "lucide-react";
import { Header } from "../components/layout/header";
import { Button } from "../components/ui/button";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { siteUrl } from "../lib/site";
import appCss from "../styles.css?url";

const designContract =
	"THESIS: A personal portfolio as an iOS collection: generous grouped surfaces frame the real work, keeping every existing section and fact.\nOWN-WORLD: Masalabs-pinned grouped gray, inset white lists, near-black island navigation, Schibsted Grotesk, purple details, dark contact sheet, theme-aware wallpaper and frosted glass containers and open alternating experience timeline.\nSTORY: Meet Ariel, read his background and skills, follow his experience, explore project categories and details, see awards, then contact him or download his CV.\nFIRST VIEWPORT: An upright circular head-and-shoulders portrait above a centered translucent name panel; all three existing roles visible, email and CV pills underneath, social links, a straight rectangular wallpaper edge. Flowing purple WebGL wallpaper, measured scroll-responsive Dynamic Island, and reflective glass; reduced motion uses the static wallpaper.\nFORM: Brief-pinned Masalabs iOS world overrides the seed's foreign challengers. Seed fc2a35a5. Code-first explicitly chosen by user. Work remains portfolio-specific through its existing portrait, screenshots, logos, and content.\nFINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => {
		const siteTitle = "Mochammad Ariel Sulton";
		const siteDescription =
			"Personal portfolio of Mochammad Ariel Sulton - AI Engineer, Data Scientist, and Full-Stack Developer";
		const ogImage = "/images/branding/hero-light-social.png";

		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title: siteTitle,
				},
				{
					name: "description",
					content: siteDescription,
				},
				{
					name: "theme-color",
					content: "#f2f2f7",
				},
				// Open Graph / Facebook
				{
					property: "og:type",
					content: "website",
				},
				{
					property: "og:url",
					content: `${siteUrl}/`,
				},
				{
					property: "og:title",
					content: siteTitle,
				},
				{
					property: "og:description",
					content: siteDescription,
				},
				{
					property: "og:image",
					content: `${siteUrl}${ogImage}`,
				},
				{
					property: "og:image:alt",
					content:
						"Purple and blue flowing wallpaper from Ariel Sulton’s portfolio",
				},
				{
					property: "og:locale",
					content: "en_US",
				},
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:image:type", content: "image/png" },
				// Twitter Card
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
				{
					name: "twitter:url",
					content: `${siteUrl}/`,
				},
				{
					name: "twitter:title",
					content: siteTitle,
				},
				{
					name: "twitter:description",
					content: siteDescription,
				},
				{
					name: "twitter:image",
					content: `${siteUrl}${ogImage}`,
				},
				{
					name: "twitter:image:alt",
					content:
						"Purple and blue flowing wallpaper from Ariel Sulton’s portfolio",
				},
				// Additional SEO
				{
					name: "author",
					content: "Mochammad Ariel Sulton",
				},
				{
					name: "keywords",
					content:
						"Ariel Sulton, AI Engineer, Data Scientist, Full-Stack Developer, Machine Learning, Web Development, Portfolio",
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/favicon.ico?v=2",
				},
				{
					rel: "icon",
					type: "image/svg+xml",
					sizes: "any",
					href: "/favicon.svg",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{ rel: "manifest", href: "/manifest.json" },
			],
		};
	},

	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const isDev = import.meta.env.DEV;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Static authored theme bootstrap, no user input.
					dangerouslySetInnerHTML={{
						__html: `document.body.prepend(document.createComment(${JSON.stringify(designContract)}));try{let t=localStorage.getItem("portfolio-theme");document.documentElement.classList.toggle("dark",t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)}catch{}`,
					}}
				/>
				<a className="skip-link" href="#main-content">
					Skip to content
				</a>
				<Header />
				{children}
				{isDev && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: One main landmark on the not-found route, targeted by the skip link.
		<main
			id="main-content"
			tabIndex={-1}
			className="min-h-screen flex items-center justify-center bg-background"
		>
			<div className="container mx-auto px-4 text-center">
				<div className="max-w-2xl mx-auto space-y-8">
					{/* 404 Number */}
					<div className="relative">
						<h1 className="text-9xl md:text-[12rem] font-bold text-gradient opacity-20">
							404
						</h1>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="space-y-4">
								<h2 className="text-3xl md:text-5xl font-bold">
									Page Not Found
								</h2>
								<p className="text-lg text-muted-foreground">
									Oops! The page you're looking for doesn't exist.
								</p>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-4 justify-center pt-8">
						<Button size="lg" asChild>
							<Link to="/">
								<Home className="mr-2 h-4 w-4" />
								Go Home
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							onClick={() => window.history.back()}
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Go Back
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
