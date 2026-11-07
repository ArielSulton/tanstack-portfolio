import {
	ArrowDown,
	ArrowUpRight,
	Download,
	Github,
	Instagram,
	Linkedin,
	Mail,
} from "lucide-react";
import { profile } from "../../data/profile";
import { HeroBackdrop } from "./hero-backdrop";

export function Hero() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Stable single-page navigation anchor, rendered once.
		<section id="home" className="hero">
			<HeroBackdrop />
			<div className="hero-content">
				<div className="hero-avatar">
					<img
						src={profile.avatar}
						alt={profile.name}
						decoding="async"
						fetchPriority="high"
						width="180"
						height="180"
					/>
				</div>
				<div className="hero-glass">
					<p className="hero-greeting">Hi there! I'm</p>
					<h1>
						Ariel Sulton<span className="name-dot">.</span>
					</h1>
					<div className="hero-roles">
						<span>Applied Data Science Student</span>
						<i aria-hidden="true" />
						<span>AI Engineer</span>
						<i aria-hidden="true" />
						<span>Full-Stack Developer</span>
					</div>
				</div>
				<div className="hero-buttons">
					<a className="action-primary" href={`mailto:${profile.email}`}>
						<Mail size={18} />
						Get in Touch
						<ArrowUpRight size={17} />
					</a>
					<a className="action-secondary" href={profile.resumeUrl} download>
						<Download size={18} />
						Download CV
					</a>
				</div>
				<div className="hero-socials">
					<a
						href={profile.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<Linkedin size={20} />
					</a>
					{profile.github && (
						<a
							href={profile.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<Github size={20} />
						</a>
					)}
					<a
						href="https://instagram.com/arielsulton"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<Instagram size={20} />
					</a>
				</div>
			</div>
			<a className="scroll-cue" href="#about">
				Scroll to explore
				<ArrowDown size={16} />
			</a>
		</section>
	);
}
