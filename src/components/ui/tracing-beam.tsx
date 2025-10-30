"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
			if (contentRef.current) {
				setSvgHeight(contentRef.current.offsetHeight);
			}
		};

		// Initial height calculation
		updateHeight();

		// ResizeObserver to update height when content resizes
		const resizeObserver = new ResizeObserver(updateHeight);
		if (contentRef.current) {
			resizeObserver.observe(contentRef.current);
		}

		// Cleanup
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
		{
			stiffness: 500,
			damping: 90,
		},
	);
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
		{
			stiffness: 500,
			damping: 90,
		},
	);

	return (
		<motion.div
			ref={ref}
			className={cn("relative mx-auto h-full w-full max-w-6xl px-8", className)}
		>
			<div className="absolute top-3 left-8 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
				<svg
					viewBox={`0 0 40 ${svgHeight}`}
					width="40"
					height={svgHeight} // Set the SVG height
					className="block absolute top-0 -z-10"
					aria-hidden="true"
				>
					<motion.path
						d={`M 20 0 V ${svgHeight}`}
						fill="none"
						stroke="#9091A0"
						strokeOpacity="0.3"
						strokeWidth="3"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<motion.path
						d={`M 20 0 V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="3"
						className="motion-reduce:hidden"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<defs>
						{/** biome-ignore lint/correctness/useUniqueElementIds: id key ignore */}
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							y1={y1} // set y1 for gradient
							y2={y2} // set y2 for gradient
						>
							<stop stopColor="#18CCFC" stopOpacity="0"></stop>
							<stop stopColor="#18CCFC"></stop>
							<stop offset="0.325" stopColor="#6344F5"></stop>
							<stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
						</motion.linearGradient>
					</defs>
				</svg>
				<motion.div
					transition={{
						duration: 0.2,
						delay: 0.5,
					}}
					animate={{
						boxShadow:
							scrollYProgress.get() > 0
								? "none"
								: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
					}}
					className="border-netural-200 flex h-6 w-6 items-center justify-center rounded-full border shadow-sm bg-background z-10 relative"
				>
					<motion.div
						transition={{
							duration: 0.2,
							delay: 0.5,
						}}
						animate={{
							backgroundColor: scrollYProgress.get() > 0 ? "white" : "#10b981",
							borderColor: scrollYProgress.get() > 0 ? "white" : "#059669",
						}}
						className="h-3 w-3 rounded-full border border-neutral-300 bg-white"
					/>
				</motion.div>
			</div>
			<div ref={contentRef}>{children}</div>
		</motion.div>
	);
};
