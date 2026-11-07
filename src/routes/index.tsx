import { createFileRoute } from "@tanstack/react-router";
import { About } from "../components/sections/about";
import { Achievements } from "../components/sections/achievements";
import { Contact } from "../components/sections/contact";
import { Experience } from "../components/sections/experience";
import { Footer } from "../components/sections/footer";
import { Hero } from "../components/sections/hero";
import { Projects } from "../components/sections/projects";
import { Skills } from "../components/sections/skills";
import { siteUrl } from "../lib/site";

export const Route = createFileRoute("/")({
	component: Portfolio,
	head: () => ({
		meta: [
			{
				title: "Mochammad Ariel Sulton",
			},
			{
				name: "description",
				content:
					"Portfolio of Mochammad Ariel Sulton - AI Engineer, Data Scientist, and Full-Stack Developer specializing in AI/ML, Computer Vision, and Web Development.",
			},
			{
				name: "keywords",
				content:
					"AI Engineer, Data Science, Machine Learning, Full-Stack Developer, Computer Vision, LLM, React, Python, TensorFlow",
			},
		],
		// The canonical URL lives with each page so that other routes do not
		// inherit the homepage's canonical link (links are not deduplicated).
		links: [{ rel: "canonical", href: `${siteUrl}/` }],
	}),
});

function Portfolio() {
	return (
		<>
			{/* biome-ignore lint/correctness/useUniqueElementIds: One main landmark, targeted by the skip link. */}
			<main id="main-content" tabIndex={-1} className="min-h-screen">
				<Hero />
				<About />
				<Skills />
				<Experience />
				<Projects />
				<Achievements />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
