import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { projects } from "../../data/projects";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const categories = ["All", "AI/ML", "Robotics", "Website"] as const;

export function Projects() {
	const [filter, setFilter] = useState<string>("All");
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const filteredProjects =
		filter === "All" ? projects : projects.filter((p) => p.category === filter);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Static ID needed for navigation anchor
		<section id="projects" className="py-20 bg-muted/30">
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
						Featured <span className="text-gradient">Projects</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Innovative solutions combining AI, web technologies, and robotics
					</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="flex flex-wrap justify-center gap-2 mb-12"
				>
					{categories.map((category) => (
						<Button
							key={category}
							variant={filter === category ? "default" : "outline"}
							onClick={() => setFilter(category)}
							size="sm"
							className="transition-all"
						>
							{category}
						</Button>
					))}
				</motion.div>

				{/* Projects Grid */}
				<motion.div
					layout
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
				>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project, idx) => (
							<motion.div
								key={project.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ delay: idx * 0.05 }}
								className={
									idx === filteredProjects.length - 1 &&
									filteredProjects.length % 3 === 1
										? "lg:col-start-2"
										: ""
								}
							>
								<Card
									className="overflow-hidden h-full flex flex-col group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 p-0 cursor-pointer"
									onClick={() =>
										setExpandedId(expandedId === project.id ? null : project.id)
									}
								>
									{/* Project Image */}
									<div className="relative aspect-video overflow-hidden bg-muted">
										<img
											src={project.imageUrl}
											alt={project.title}
											loading="lazy"
											decoding="async"
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
											onError={(e) => {
												e.currentTarget.src = `https://placehold.co/600x400/1e293b/94a3b8?text=${encodeURIComponent(project.title)}`;
											}}
										/>
										<Badge
											variant="secondary"
											className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
										>
											{project.category}
										</Badge>
									</div>

									{/* Project Info */}
									<div className="p-6 flex-1 flex flex-col">
										<div className="flex-1 space-y-3">
											{/* Title & Subtitle */}
											<div>
												<h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-1">
													{project.title}
												</h3>
												<p className="text-sm text-muted-foreground mt-1 line-clamp-1">
													{project.subtitle}
												</p>
											</div>

											{/* Description */}
											<motion.div
												initial={false}
												animate={{
													height:
														expandedId === project.id ? "auto" : "fit-content",
												}}
												transition={{ duration: 0.3 }}
											>
												<p
													className={`text-sm text-muted-foreground leading-relaxed ${expandedId === project.id ? "" : "line-clamp-3"}`}
												>
													{expandedId === project.id && project.longDescription
														? project.longDescription
														: project.description}
												</p>
											</motion.div>

											{/* Achievement Badge */}
											{project.achievement && (
												<Badge variant="outline" className="text-xs">
													🏆 {project.achievement}
												</Badge>
											)}

											{/* Technologies */}
											<div className="flex flex-wrap gap-1.5">
												{(expandedId === project.id
													? project.technologies
													: project.technologies.slice(0, 3)
												).map((tech) => (
													<Badge
														key={tech}
														variant="secondary"
														className="text-xs"
													>
														{tech}
													</Badge>
												))}
												{expandedId !== project.id &&
													project.technologies.length > 3 && (
														<Badge variant="secondary" className="text-xs">
															+{project.technologies.length - 3}
														</Badge>
													)}
											</div>
										</div>

										{/* Action Buttons */}
										<div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
											{project.githubUrl && (
												<Button
													asChild
													size="sm"
													variant="outline"
													className="flex-1"
												>
													<a
														href={project.githubUrl}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Github className="w-4 h-4 mr-1" />
														Source Code
													</a>
												</Button>
											)}
											{project.liveUrl && (
												<Button
													asChild
													size="sm"
													variant="outline"
													className="flex-1"
												>
													<a
														href={project.liveUrl}
														target="_blank"
														rel="noopener noreferrer"
													>
														<ExternalLink className="w-4 h-4 mr-1" />
														Live
													</a>
												</Button>
											)}
											{!project.githubUrl && !project.liveUrl && (
												<Badge
													variant="secondary"
													className="flex-1 justify-center"
												>
													Competition Project
												</Badge>
											)}
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Project Count */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="text-center mt-8 text-sm text-muted-foreground"
				>
					Showing {filteredProjects.length} of {projects.length} projects
				</motion.div>
			</div>
		</section>
	);
}
