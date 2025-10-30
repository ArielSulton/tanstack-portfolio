import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { experiences } from "../../data/experience";
import { formatDateRange } from "../../lib/utils";
import { BackgroundBeams } from "../ui/background-beams";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { TracingBeam } from "../ui/tracing-beam";

export function Experience() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Static ID needed for navigation anchor
		<section id="experience" className="py-20 relative">
			<BackgroundBeams />
			<div className="container mx-auto px-4 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Professional <span className="text-gradient">Experience</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Building impactful solutions across AI, robotics, and web
						development
					</p>
				</motion.div>

				{/* Timeline with TracingBeam */}
				<div className="max-w-6xl mx-auto">
					<TracingBeam>
						<div className="space-y-12">
							{experiences.map((exp, idx) => {
								const isLeft = idx % 2 === 0;
								return (
									<motion.div
										key={exp.id}
										initial={{
											opacity: 0,
											x: isLeft ? -50 : 50,
										}}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.1 }}
										className="relative"
									>
										{/* Desktop Layout */}
										<div className="hidden md:grid md:grid-cols-[1fr_1fr] md:gap-24 items-start">
											{isLeft ? (
												<>
													{/* Left Content */}
													<div className="flex flex-col items-end gap-4 pr-4">
														<div className="w-16 h-16 rounded-full bg-white overflow-hidden shadow-lg border-2 border-border">
															<img
																src={
																	exp.logo ||
																	`https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=random&size=64`
																}
																alt={`${exp.company} logo`}
																loading="lazy"
																decoding="async"
																className="w-full h-full object-cover"
															/>
														</div>
														<Card className="p-6 hover:shadow-xl transition-all duration-300 border-r-4 border-r-primary/50 hover:border-r-primary group w-full">
															<ExperienceContent exp={exp} />
														</Card>
													</div>
													{/* Right Empty Space */}
													<div />
												</>
											) : (
												<>
													{/* Left Empty Space */}
													<div />
													{/* Right Content */}
													<div className="flex flex-col items-start gap-4 pl-4">
														<div className="w-16 h-16 rounded-full bg-white overflow-hidden shadow-lg border-2 border-border">
															<img
																src={
																	exp.logo ||
																	`https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=random&size=64`
																}
																alt={`${exp.company} logo`}
																loading="lazy"
																decoding="async"
																className="w-full h-full object-cover"
															/>
														</div>
														<Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/50 hover:border-l-primary group w-full">
															<ExperienceContent exp={exp} />
														</Card>
													</div>
												</>
											)}
										</div>

										{/* Mobile Layout */}
										<div className="md:hidden relative pl-16">
											<div className="flex flex-col gap-4">
												<div className="w-14 h-14 rounded-full bg-white overflow-hidden shadow-lg border-2 border-border">
													<img
														src={
															exp.logo ||
															`https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=random&size=56`
														}
														alt={`${exp.company} logo`}
														loading="lazy"
														decoding="async"
														className="w-full h-full object-cover"
													/>
												</div>
												<Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/50 hover:border-l-primary group">
													<ExperienceContent exp={exp} />
												</Card>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					</TracingBeam>
				</div>
			</div>
		</section>
	);
}

// Experience Content Component
function ExperienceContent({ exp }: { exp: (typeof experiences)[0] }) {
	return (
		<div className="space-y-4">
			{/* Company & Role */}
			<div>
				<h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
					{exp.role}
				</h3>
				<p className="text-lg text-muted-foreground font-medium mt-1">
					{exp.company}
				</p>
			</div>

			{/* Meta Information */}
			<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<Calendar className="w-4 h-4" />
					{formatDateRange(exp.startDate, exp.endDate, exp.current)}
				</span>
				<span className="flex items-center gap-1.5">
					<MapPin className="w-4 h-4" />
					{exp.location}
				</span>
				{exp.current && (
					<Badge variant="default" className="animate-pulse">
						Current
					</Badge>
				)}
			</div>

			{/* Description */}
			{exp.description && (
				<p className="text-muted-foreground leading-relaxed">
					{exp.description}
				</p>
			)}

			{/* Achievements */}
			{exp.achievements.length > 0 && (
				<ul className="space-y-2 hidden lg:flex lg:flex-wrap">
					{exp.achievements.map((achievement) => (
						<li
							key={achievement}
							className="flex items-start gap-2 text-sm text-muted-foreground"
						>
							<span className="text-primary mt-1.5">▸</span>
							<span className="flex-1">{achievement}</span>
						</li>
					))}
				</ul>
			)}

			{/* Technologies */}
			{exp.technologies && exp.technologies.length > 0 && (
				<div className="hidden lg:flex lg:flex-wrap gap-2 pt-2 border-t border-border/50">
					{exp.technologies.map((tech) => (
						<Badge key={tech} variant="outline" className="text-xs">
							{tech}
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}
