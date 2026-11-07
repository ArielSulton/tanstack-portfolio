import { HeroGradient } from "./hero-gradient";

/** Shared theme-aware wallpaper, including the static reduced-motion fallback. */
export function HeroBackdrop() {
	return (
		<>
			<div className="hero-wallpaper" aria-hidden="true">
				<div />
				<div />
				<div />
			</div>
			<HeroGradient />
		</>
	);
}
