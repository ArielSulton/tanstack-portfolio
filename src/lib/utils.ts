import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		year: "numeric",
	}).format(new Date(date));
}

export function formatDateRange(
	startDate: string,
	endDate?: string,
	current = false,
): string {
	const start = formatDate(startDate);
	if (current) return `${start} - Present`;
	if (!endDate) return start;
	return `${start} - ${formatDate(endDate)}`;
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/--+/g, "-")
		.trim();
}

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function calculateYearsOfExperience(startDate: string): number {
	const start = new Date(startDate);
	const now = new Date();
	const years = now.getFullYear() - start.getFullYear();
	const months = now.getMonth() - start.getMonth();
	return months < 0 ? years - 1 : years;
}
