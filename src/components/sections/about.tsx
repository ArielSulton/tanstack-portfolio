import { education } from "../../data/education";
import { profile } from "../../data/profile";

export function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Stable single-page navigation anchor, rendered once.
		<section id="about" className="portfolio-section">
			<div className="section-container">
				<div className="section-heading">
					<h2>About Me</h2>
					<p>
						Learn more about my background, expertise, and passion for AI
						innovation
					</p>
				</div>
				<div className="about-sheet">
					<p className="about-bio">{profile.bio}</p>
					<div className="education-row">
						<img
							src="/images/experience/avif/Logo_PENS.avif"
							alt="Politeknik Elektronika Negeri Surabaya"
							loading="lazy"
							decoding="async"
							width="56"
							height="56"
						/>
						<div>
							<h3>Applied Data Science Undergraduate Student</h3>
							<p>Politeknik Elektronika Negeri Surabaya</p>
							<p>GPA: {education[0].gpa}</p>
						</div>
					</div>
					<div className="quick-facts">
						<div>
							<strong>
								2<span>+</span>
							</strong>
							<p>Years Experience</p>
						</div>
						<div>
							<strong>
								30<span>+</span>
							</strong>
							<p>Projects Completed</p>
						</div>
						<div>
							<strong>
								10<span>+</span>
							</strong>
							<p>Awards Won</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
