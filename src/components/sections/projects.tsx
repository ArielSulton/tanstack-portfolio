import {
	ArrowUpRight,
	BrainCircuit,
	ChevronDown,
	Code2,
	Github,
	Radar,
	Trophy,
} from "lucide-react";
import { useState } from "react";
import { projects } from "../../data/projects";

const categories = ["All", "AI/ML", "Robotics", "Website"] as const;

export function Projects() {
	const [filter, setFilter] = useState<string>("All");
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const filtered =
		filter === "All"
			? projects
			: projects.filter((project) => project.category === filter);
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Stable single-page navigation anchor, rendered once.
		<section id="projects" className="portfolio-section">
			<div className="section-container">
				<div className="section-heading">
					<h2>Featured Projects</h2>
					<p>
						Innovative solutions combining AI, web technologies, and robotics
					</p>
				</div>
				<fieldset className="segmented-control">
					<legend className="sr-only">Project categories</legend>
					{categories.map((category) => (
						<button
							type="button"
							key={category}
							aria-pressed={filter === category}
							onClick={() => {
								setFilter(category);
								setExpandedId(null);
							}}
						>
							{category}
						</button>
					))}
				</fieldset>
				<div className="projects-grid">
					{filtered.map((project) => {
						const expanded = expandedId === project.id;
						const PreviewIcon =
							project.category === "AI/ML"
								? BrainCircuit
								: project.category === "Robotics"
									? Radar
									: Code2;
						return (
							<article className="project-card" key={project.id}>
								<div className="project-preview">
									{project.imageUrl ? (
										<div className="project-image-frame">
											<img
												src={project.imageUrl}
												alt={project.imageAlt ?? `${project.title} screenshot`}
												style={{
													objectFit: project.imageFit,
													objectPosition: project.imagePosition,
													transform: project.imageScale
														? `scale(${project.imageScale})`
														: undefined,
													transformOrigin: project.imageScaleOrigin,
												}}
												loading="lazy"
												decoding="async"
											/>
										</div>
									) : (
										<div
											className="project-preview-placeholder"
											aria-hidden="true"
										>
											<PreviewIcon size={56} strokeWidth={1.3} />
										</div>
									)}
									<span className="project-category">{project.category}</span>
								</div>
								<div className="project-body">
									<button
										className="project-disclosure"
										type="button"
										aria-expanded={expanded}
										aria-controls={`detail-${project.id}`}
										onClick={() => setExpandedId(expanded ? null : project.id)}
									>
										<span>
											<h3>{project.title}</h3>
											<span className="project-subtitle">
												{project.subtitle}
											</span>
										</span>
										<ChevronDown size={21} />
									</button>
									<div id={`detail-${project.id}`}>
										<p
											className={`project-description ${expanded ? "" : "is-collapsed"}`}
										>
											{expanded && project.longDescription
												? project.longDescription
												: project.description}
										</p>
										{project.achievements?.map((award) => (
											<p className="project-award" key={award}>
												<Trophy size={15} />
												{award}
											</p>
										))}
										<div className="technology-list">
											{(expanded
												? project.technologies
												: project.technologies.slice(0, 3)
											).map((tech) => (
												<span key={tech}>{tech}</span>
											))}
											{!expanded && project.technologies.length > 3 && (
												<button
													type="button"
													aria-label={`Show all technologies for ${project.title}`}
													onClick={() => setExpandedId(project.id)}
												>
													+{project.technologies.length - 3}
												</button>
											)}
										</div>
									</div>
									<div className="project-actions">
										{project.githubUrl && (
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Github size={16} />
												Source Code
												<ArrowUpRight size={15} />
											</a>
										)}
										{project.liveUrl && (
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												Live
												<ArrowUpRight size={16} />
											</a>
										)}
										{!project.githubUrl && !project.liveUrl && (
											<span>{project.sourceNote ?? "Competition Project"}</span>
										)}
									</div>
								</div>
							</article>
						);
					})}
				</div>
				<p className="project-count" aria-live="polite">
					Showing {filtered.length} of {projects.length} projects
				</p>
			</div>
		</section>
	);
}
