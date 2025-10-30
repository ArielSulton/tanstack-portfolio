import { motion } from "framer-motion";
import { skills } from "../../data/skills";
import Carousel from "../ui/carousel";

export function Skills() {
	// Prepare slides for carousel with skills displayed directly on card
	const slides = skills.map((category, index) => ({
		title: category.category,
		button: `${category.skills.length} Technologies`,
		src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${
			["3776AB", "5C3EE8", "1C3C3C", "22314E", "009688", "1a1a1a", "2496ED"][
				index % 7
			]
		};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${
			["2a5a8a", "4a2fc7", "0f1f1f", "151f35", "006b5f", "000000", "1a7acc"][
				index % 7
			]
		};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='800' fill='url(%23grad${index})'/%3E%3C/svg%3E`,
		skills: category.skills,
	}));

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: skills section id
		<section id="skills" className="py-20 pb-40 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Technical <span className="text-gradient">Skills</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Proficient in cutting-edge technologies across AI/ML, web
						development, and robotics
					</p>
				</motion.div>

				{/* Aceternity Carousel */}
				<Carousel slides={slides} />
			</div>
		</section>
	);
}
