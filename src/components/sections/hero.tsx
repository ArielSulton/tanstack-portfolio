import { motion } from "framer-motion";
import {
	ArrowDown,
	Download,
	Github,
	Instagram,
	Linkedin,
	Mail,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { profile } from "../../data/profile";
import { Button } from "../ui/button";

export function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated Background Gradient */}
			<div className="absolute inset-0 bg-linear-to-br from-primary/10 via-primary/50 to-pink-500/10 dark:from-primary/5 dark:via-purple-500/5 dark:to-pink-500/5" />

			{/* Grid Pattern Overlay */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[4rem_4rem]" />

			<div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center px-4 py-20">
				{/* Text Content */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="space-y-6"
				>
					{/* Greeting */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="inline-block"
					>
						<span className="text-lg font-medium text-muted-foreground">
							Hi there! I'm
						</span>
					</motion.div>

					{/* Name */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="text-5xl md:text-7xl font-bold leading-tight"
					>
						<span className="text-gradient">Ariel Sulton</span>
					</motion.h1>

					{/* Title with Typing Effect */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="text-2xl md:text-3xl font-semibold min-h-10"
					>
						<TypeAnimation
							sequence={[
								"Applied Data Science Student",
								2000,
								"AI Engineer",
								2000,
								"Full-Stack Developer",
								2000,
							]}
							wrapper="span"
							speed={50}
							repeat={Infinity}
							cursor={true}
							className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
						/>
					</motion.div>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="flex flex-wrap gap-4 pt-4"
					>
						<Button size="lg" asChild>
							<a href={`mailto:${profile.email}`}>
								<Mail className="mr-2 h-4 w-4" />
								Get in Touch
							</a>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<a href={profile.resumeUrl} download>
								<Download className="mr-2 h-4 w-4" />
								Download CV
							</a>
						</Button>
					</motion.div>

					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="flex gap-4 pt-2"
					>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors"
						>
							<Linkedin className="h-6 w-6" />
							<span className="sr-only">LinkedIn</span>
						</a>
						{profile.github && (
							<a
								href={profile.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<Github className="h-6 w-6" />
								<span className="sr-only">GitHub</span>
							</a>
						)}
						<a
							href="https://instagram.com/arielsulton"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors"
						>
							<Instagram className="h-6 w-6" />
							<span className="sr-only">Instagram</span>
						</a>
					</motion.div>
				</motion.div>

				{/* Profile Image */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
					className="relative flex justify-center lg:justify-end"
				>
					<motion.div
						animate={{ y: [0, -20, 0] }}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="relative"
					>
						{/* Gradient Glow Effect */}
						<div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/30 to-purple-500/30 blur-3xl" />

						{/* Profile Image */}
						<div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
							<img
								src={profile.avatar}
								alt={profile.name}
								decoding="async"
								fetchPriority="high"
								className="w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="flex flex-col items-center gap-2"
				>
					<span className="text-sm text-muted-foreground">
						Scroll to explore
					</span>
					<ArrowDown className="w-5 h-5 text-muted-foreground" />
				</motion.div>
			</motion.div>
		</section>
	);
}
