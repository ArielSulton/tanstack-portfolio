import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { profile } from "../../data/profile";

export function Footer() {
	return (
		<footer className="py-8 mt-20">
			<div className="container mx-auto px-4">
				<div className="text-center">
					<div className="flex justify-center space-x-4 items-center mb-6">
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<Linkedin size={20} />
						</a>
						{profile.github && (
							<a
								href={profile.github}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="text-gray-400 hover:text-white transition-colors duration-300"
							>
								<Github size={20} />
							</a>
						)}
						<a
							href="https://instagram.com/arielsulton"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<Instagram size={20} />
						</a>
						<a
							href={`mailto:${profile.email}`}
							aria-label="Email"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							<Mail size={20} />
						</a>
					</div>

					<p className="text-sm">
						&copy; {new Date().getFullYear()} {profile.name}. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
