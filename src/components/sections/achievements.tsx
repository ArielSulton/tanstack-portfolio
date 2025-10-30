import { motion } from "framer-motion";
import { Award, Medal, Trophy } from "lucide-react";
import { achievements } from "../../data/achievements";
import { formatDate } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const getRankIcon = (rank?: string) => {
	if (!rank) return <Trophy className="w-5 h-5" />;
	if (rank.includes("1") || rank.toLowerCase().includes("champion")) {
		return <Trophy className="w-5 h-5 text-yellow-500" />;
	}
	if (rank.includes("2") || rank.toLowerCase().includes("finalist")) {
		return <Medal className="w-5 h-5 text-gray-400" />;
	}
	return <Award className="w-5 h-5 text-orange-500" />;
};

// Generate placeholder image URL based on achievement ID
const getPlaceholderImage = (_id: string, index: number) => {
	const colors = [
		"FFD700,FFA500", // Gold gradient
		"C0C0C0,808080", // Silver gradient
		"CD7F32,8B4513", // Bronze gradient
		"6366F1,8B5CF6", // Primary purple gradient
		"3B82F6,06B6D4", // Blue cyan gradient
		"EC4899,F43F5E", // Pink red gradient
	];
	const colorIndex = index % colors.length;
	return `https://placehold.co/600x400/${colors[colorIndex]}/FFFFFF?text=Achievement`;
};

export function Achievements() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Static ID needed for navigation anchor
		<section id="achievements" className="py-20">
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
						Awards & <span className="text-gradient">Achievements</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Recognition for excellence in AI innovation and technological
						development
					</p>
				</motion.div>

				{/* Achievements Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{achievements.map((achievement, idx) => (
						<motion.div
							key={achievement.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
						>
							<Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group p-0">
								{/* Achievement Image */}
								<div className="relative aspect-video overflow-hidden">
									<img
										src={
											achievement.imageUrl ||
											getPlaceholderImage(achievement.id, idx)
										}
										alt={achievement.title}
										loading="lazy"
										decoding="async"
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									/>
									{/* Overlay with Rank Badge */}
									<div className="absolute top-4 right-4">
										{achievement.rank && (
											<Badge
												variant={
													achievement.rank.includes("1") ||
													achievement.rank.toLowerCase().includes("champion")
														? "default"
														: "secondary"
												}
												className="shadow-lg"
											>
												{achievement.rank}
											</Badge>
										)}
									</div>
									{/* Icon Overlay */}
									<div className="absolute bottom-4 left-4 p-3 rounded-lg bg-background/90 backdrop-blur-sm">
										{getRankIcon(achievement.rank)}
									</div>
								</div>

								{/* Content */}
								<div className="p-6 space-y-4">
									{/* Title */}
									<div>
										<h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
											{achievement.title}
										</h3>
									</div>

									{/* Organization */}
									<p className="text-sm font-medium text-muted-foreground">
										{achievement.organization}
									</p>

									{/* Description */}
									{achievement.description && (
										<p className="text-sm text-muted-foreground line-clamp-3">
											{achievement.description}
										</p>
									)}

									{/* Date */}
									<div className="pt-2 border-t border-border/50">
										<p className="text-xs text-muted-foreground">
											{formatDate(achievement.date)}
										</p>
									</div>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
