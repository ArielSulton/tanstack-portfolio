import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";

function Counter({ from, to }: { from: number; to: number }) {
	const count = useMotionValue(from);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const controls = animate(count, to, {
			duration: 2,
			ease: "easeOut",
		});

		return controls.stop;
	}, [to, count]);

	return <motion.div ref={ref}>{rounded}</motion.div>;
}

export function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Static ID needed for navigation anchor
		<section id="about" className="py-20 bg-muted/30">
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
						About <span className="text-gradient">Me</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Learn more about my background, expertise, and passion for AI
						innovation
					</p>
				</motion.div>

				{/* Bio Content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="max-w-4xl mx-auto"
				>
					<div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-lg">
						<p className="text-lg text-muted-foreground leading-relaxed">
							{profile.bio}
						</p>

						{/* Education */}
						<div className="mt-8 pt-8 border-t border-border">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 rounded-full bg-white overflow-hidden shadow-lg border-2 border-border shrink-0">
									<img
										src="/images/experience/avif/Logo_PENS.avif"
										alt="Politeknik Elektronika Negeri Surabaya"
										loading="lazy"
										decoding="async"
										className="w-full h-full object-cover"
									/>
								</div>
								<div>
									<h3 className="text-lg font-semibold">
										Applied Data Science Undergraduate Student
									</h3>
									<p className="text-muted-foreground">
										Politeknik Elektronika Negeri Surabaya
									</p>
								</div>
							</div>
						</div>

						{/* Quick Facts */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
							<div className="flex flex-col items-center justify-center text-center">
								<div className="text-3xl md:text-4xl font-bold text-gradient mb-2 flex items-center gap-1">
									<Counter from={0} to={2} />
									<span>+</span>
								</div>
								<p className="text-sm text-muted-foreground">
									Years Experience
								</p>
							</div>
							<div className="flex flex-col items-center justify-center text-center">
								<div className="text-3xl md:text-4xl font-bold text-gradient mb-2 flex items-center gap-1">
									<Counter from={0} to={30} />
									<span>+</span>
								</div>
								<p className="text-sm text-muted-foreground">
									Projects Completed
								</p>
							</div>
							<div className="flex flex-col items-center justify-center text-center">
								<div className="text-3xl md:text-4xl font-bold text-gradient mb-2 flex items-center gap-1">
									<Counter from={0} to={5} />
									<span>+</span>
								</div>
								<p className="text-sm text-muted-foreground">Awards Won</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
