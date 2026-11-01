import { motion, useScroll } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useRef } from "react";
import { experiences } from "../../data/experience";
import { formatDateRange } from "../../lib/utils";

export function Experience() {
	const timeline = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: timeline,
		offset: ["start 65%", "end 65%"],
	});
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Stable single-page navigation anchor, rendered once.
		<section id="experience" className="portfolio-section">
			<div className="section-container">
				<div className="section-heading">
					<h2>Professional Experience</h2>
					<p>
						Building impactful solutions across AI, robotics, and web
						development
					</p>
				</div>
				<div ref={timeline} className="experience-timeline">
					<div className="timeline-rail" aria-hidden="true">
						<motion.div
							className="timeline-progress"
							style={{ scaleY: scrollYProgress }}
						/>
					</div>
					{experiences.map((exp, index) => (
						<article
							className="experience-row"
							data-side={index % 2 === 0 ? "left" : "right"}
							key={exp.id}
						>
							<div className="timeline-node">
								{exp.logo ? (
									<img
										src={exp.logo}
										alt={`${exp.company} logo`}
										loading="lazy"
										decoding="async"
										width="56"
										height="56"
									/>
								) : (
									<span className="company-initial" aria-hidden="true">
										{exp.company.charAt(0)}
									</span>
								)}
							</div>
							<div className="experience-body">
								<div className="experience-identity">
									<p className="company-name">{exp.company}</p>
									<p className="experience-date">
										<Calendar size={14} />
										{formatDateRange(exp.startDate, exp.endDate, exp.current)}
									</p>
									<p className="experience-date">
										<MapPin size={14} />
										{exp.location}
									</p>
									{exp.current && !exp.endDate && (
										<span className="current-tag">
											<i />
											Current
										</span>
									)}
								</div>
								<div className="experience-content">
									<h3>{exp.role}</h3>
									{exp.description && <p>{exp.description}</p>}
									{exp.achievements.length > 0 && (
										<ul>
											{exp.achievements.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									)}
									{exp.technologies && (
										<div className="technology-list">
											{exp.technologies.map((tech) => (
												<span key={tech}>{tech}</span>
											))}
										</div>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
