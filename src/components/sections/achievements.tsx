import { Award, Medal, Trophy } from "lucide-react";
import { achievements } from "../../data/achievements";
import { formatDate } from "../../lib/utils";

export function Achievements() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Stable single-page navigation anchor, rendered once.
		<section id="achievements" className="portfolio-section">
			<div className="section-container">
				<div className="section-heading">
					<h2>Awards & Achievements</h2>
					<p>
						Recognition for excellence in AI innovation and technological
						development
					</p>
				</div>
				<div className="achievements-grid">
					{achievements.map((achievement) => {
						const RankIcon =
							!achievement.rank ||
							achievement.rank.includes("1") ||
							achievement.rank.toLowerCase().includes("champion")
								? Trophy
								: achievement.rank.includes("2") ||
										achievement.rank.toLowerCase().includes("finalist")
									? Medal
									: Award;
						return (
							<article className="achievement-card" key={achievement.id}>
								<div className="achievement-preview">
									{achievement.imageUrl ? (
										<img
											src={achievement.imageUrl}
											alt={achievement.imageAlt ?? achievement.title}
											style={{
												objectFit: achievement.imageFit,
												objectPosition: achievement.imagePosition,
											}}
											loading="lazy"
											decoding="async"
										/>
									) : (
										<RankIcon size={48} aria-hidden="true" />
									)}
									{achievement.rank && (
										<span className="achievement-rank">
											<RankIcon size={15} />
											{achievement.rank}
										</span>
									)}
								</div>
								<div className="achievement-body">
									<h3>{achievement.title}</h3>
									<p className="achievement-organization">
										{achievement.organization}
									</p>
									{achievement.description && <p>{achievement.description}</p>}
									<p className="achievement-date">
										{formatDate(achievement.date)}
									</p>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
