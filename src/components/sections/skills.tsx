import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { skills } from "../../data/skills";

export function Skills() {
	const [current, setCurrent] = useState(0);
	const category = skills[current];
	const move = (direction: number) =>
		setCurrent((value) => (value + direction + skills.length) % skills.length);
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Stable single-page navigation anchor, rendered once.
		<section id="skills" className="portfolio-section">
			<div className="section-container">
				<div className="section-heading">
					<h2>Technical Skills</h2>
					<p>
						Proficient in cutting-edge technologies across AI/ML, web
						development, and robotics
					</p>
				</div>
				<div className="skills-browser">
					<nav className="skills-categories" aria-label="Skill categories">
						{skills.map((item, index) => (
							<button
								type="button"
								key={item.category}
								aria-pressed={current === index}
								onClick={() => setCurrent(index)}
							>
								<span>{item.category}</span>
								<ChevronRight size={17} />
							</button>
						))}
					</nav>
					<div className="skills-panel" aria-live="polite">
						<div className="skills-panel-heading">
							<div>
								<h3>{category.category}</h3>
								<p>{category.skills.length} Technologies</p>
							</div>
							<div className="carousel-controls">
								<button
									type="button"
									onClick={() => move(-1)}
									aria-label="Go to previous slide"
								>
									<ChevronLeft size={20} />
								</button>
								<button
									type="button"
									onClick={() => move(1)}
									aria-label="Go to next slide"
								>
									<ChevronRight size={20} />
								</button>
							</div>
						</div>
						<div className="skills-list">
							{category.skills.map((skill) => (
								<div className="skill-row" key={skill.name}>
									<skill.icon size={24} aria-hidden="true" />
									<span>{skill.name}</span>
									<div
										className="skill-level"
										role="img"
										aria-label={`${skill.level} out of 5`}
									>
										{[1, 2, 3, 4, 5].map((level) => (
											<i key={level} data-filled={level <= skill.level} />
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
