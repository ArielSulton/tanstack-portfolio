/** biome-ignore-all lint/suspicious/noArrayIndexKey: index key ignore */
"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import {
	type MotionValue,
	motion,
	useMotionTemplate,
	useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { generateRandomString, Icon } from "./evervault-card";

interface SkillItem {
	name: string;
	icon?: IconType;
	color?: string;
	level: number;
}

interface SlideData {
	title: string;
	button: string;
	src: string;
	skills?: SkillItem[];
}

interface SlideProps {
	slide: SlideData;
	index: number;
	current: number;
	handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
	const slideRef = useRef<HTMLLIElement>(null);

	const xRef = useRef(0);
	const yRef = useRef(0);
	const frameRef = useRef<number | null>(null);

	// Evervault effect
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const [randomString, setRandomString] = useState("");

	useEffect(() => {
		const str = generateRandomString(10000);
		setRandomString(str);
	}, []);

	useEffect(() => {
		const animate = () => {
			if (!slideRef.current) return;

			const x = xRef.current;
			const y = yRef.current;

			slideRef.current.style.setProperty("--x", `${x}px`);
			slideRef.current.style.setProperty("--y", `${y}px`);

			frameRef.current = requestAnimationFrame(animate);
		};

		frameRef.current = requestAnimationFrame(animate);

		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
			}
		};
	}, []);

	const handleMouseMove = (event: React.MouseEvent) => {
		const el = slideRef.current;
		if (!el) return;

		const r = el.getBoundingClientRect();
		xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
		yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));

		// Evervault effect
		const { left, top } = r;
		mouseX.set(event.clientX - left);
		mouseY.set(event.clientY - top);
		const str = generateRandomString(10000);
		setRandomString(str);
	};

	const handleMouseLeave = () => {
		xRef.current = 0;
		yRef.current = 0;
	};

	const { button, title, skills } = slide;

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleSlideClick(index);
		}
	};

	return (
		<div className="perspective-distant transform-3d">
			<li
				ref={slideRef}
				className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
				onClick={() => handleSlideClick(index)}
				onKeyDown={handleKeyDown}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				aria-label={`Slide ${index + 1}: ${title}`}
				style={{
					transform:
						current !== index
							? "scale(0.98) rotateX(8deg)"
							: "scale(1) rotateX(0deg)",
					transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
					transformOrigin: "bottom",
				}}
			>
				<div
					className="absolute top-0 left-0 w-full h-full bg-black rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
					style={{
						transform:
							current === index
								? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
								: "none",
					}}
				></div>

				<article
					className={`relative p-[4vmin] w-full h-full flex flex-col transition-opacity duration-1000 ease-in-out z-30 ${
						current === index ? "opacity-100 visible" : "opacity-0 invisible"
					}`}
				>
					<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 pb-3 relative z-10">
						{title}
					</h2>

					{skills && skills.length > 0 ? (
						<div className="flex-1 relative border border-white/20 p-4 group/skills">
							{/* Corner Icons */}
							<Icon className="absolute h-6 w-6 -top-3 -left-3 text-white z-20" />
							<Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white z-20" />
							<Icon className="absolute h-6 w-6 -top-3 -right-3 text-white z-20" />
							<Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white z-20" />

							{/* Evervault Card Pattern Effect - hanya untuk skills area */}
							{current === index && (
								<EvervaultCardPattern
									mouseX={mouseX}
									mouseY={mouseY}
									randomString={randomString}
								/>
							)}
							<div className="overflow-y-auto overflow-x-hidden max-h-[50vh]">
								<div className="grid grid-cols-2 gap-2 relative z-10">
									{skills.map((skill, idx) => {
										const SkillIcon = skill.icon;
										return (
											<div
												key={idx}
												className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all text-left relative z-10 shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
											>
												{SkillIcon && (
													<SkillIcon
														className="w-4 h-4 shrink-0"
														style={{ color: skill.color }}
													/>
												)}
												<span className="text-xs md:text-sm font-medium truncate">
													{skill.name}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					) : (
						<div className="flex justify-center mt-auto">
							<button
								type="button"
								className="px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
							>
								{button}
							</button>
						</div>
					)}

					<div className="text-xs md:text-sm text-white/60 mt-3 pt-2 relative z-10">
						{button}
					</div>
				</article>
			</li>
		</div>
	);
};

// Evervault Card Pattern Component
function EvervaultCardPattern({
	mouseX,
	mouseY,
	randomString,
}: {
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
	randomString: string;
}) {
	const maskImage = useMotionTemplate`radial-gradient(450px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div className="pointer-events-none z-5 absolute inset-0 overflow-hidden">
			<div className="absolute inset-0 mask-[linear-gradient(white,transparent)] group-hover/skills:opacity-50"></div>
			<motion.div
				className="absolute inset-0 bg-linear-to-r from-green-500 via-purple-500 to-blue-700 opacity-0 group-hover/skills:opacity-100 backdrop-blur-xl transition duration-500"
				style={style}
			/>
			<motion.div
				className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/skills:opacity-100"
				style={style}
			>
				<p className="absolute inset-0 text-[8px] md:text-[10px] leading-tight wrap-break-word whitespace-pre-wrap text-white font-mono font-bold transition duration-500 overflow-hidden p-2">
					{randomString}
				</p>
			</motion.div>
		</div>
	);
}

interface CarouselControlProps {
	type: string;
	title: string;
	handleClick: () => void;
}

const CarouselControl = ({
	type,
	title,
	handleClick,
}: CarouselControlProps) => {
	return (
		<button
			type="button"
			className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
				type === "previous" ? "rotate-180" : ""
			}`}
			title={title}
			onClick={handleClick}
		>
			<IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
		</button>
	);
};

interface CarouselProps {
	slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
	const [current, setCurrent] = useState(0);

	const handlePreviousClick = () => {
		const previous = current - 1;
		setCurrent(previous < 0 ? slides.length - 1 : previous);
	};

	const handleNextClick = () => {
		const next = current + 1;
		setCurrent(next === slides.length ? 0 : next);
	};

	const handleSlideClick = (index: number) => {
		if (current !== index) {
			setCurrent(index);
		}
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: false positive
		<div
			className="relative w-[70vmin] h-[70vmin] mx-auto"
			role="region"
			aria-label="Skills carousel"
		>
			<ul
				className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
				style={{
					transform: `translateX(-${current * (100 / slides.length)}%)`,
				}}
			>
				{slides.map((slide, index) => (
					<Slide
						key={index}
						slide={slide}
						index={index}
						current={current}
						handleSlideClick={handleSlideClick}
					/>
				))}
			</ul>

			<div className="absolute flex justify-center w-full top-[calc(100%+2rem)]">
				<CarouselControl
					type="previous"
					title="Go to previous slide"
					handleClick={handlePreviousClick}
				/>

				<CarouselControl
					type="next"
					title="Go to next slide"
					handleClick={handleNextClick}
				/>
			</div>
		</div>
	);
}
