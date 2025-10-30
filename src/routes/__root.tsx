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
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Ariel Sulton | Portfolio",
			},
			{
				name: "description",
				content:
					"Personal portfolio of Mochammad Ariel Sulton - AI Engineer, Data Scientist, and Full-Stack Developer",
			},
			{
				name: "theme-color",
				content: "#3B82F6",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark overflow-x-hidden">
			<head>
				<HeadContent />
			</head>
			<body className="overflow-x-hidden">
				<Header />
				{children}
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
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
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
		</div>
	);
}
