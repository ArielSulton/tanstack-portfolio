import type { IconType } from "react-icons";

export interface Profile {
	name: string;
	title: string;
	location: string;
	email: string;
	phone: string;
	bio: string;
	avatar: string;
	resumeUrl: string;
	linkedin: string;
	github?: string;
}

export interface Experience {
	id: string;
	company: string;
	role: string;
	location: string;
	startDate: string;
	endDate?: string;
	current: boolean;
	description: string;
	achievements: string[];
	technologies?: string[];
	logo?: string;
}

export interface Education {
	id: string;
	institution: string;
	degree: string;
	field: string;
	location: string;
	startDate: string;
	endDate?: string;
	gpa?: string;
	achievements?: string[];
}

export interface Project {
	id: string;
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	longDescription?: string;
	category: "AI/ML" | "Robotics" | "Website";
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
	imageUrl: string;
	achievement?: string;
	startDate: string;
	endDate?: string;
}

export interface SkillCategory {
	category:
		| "Data & ML/DL"
		| "Computer Vision"
		| "LLM & RAG"
		| "Robotics/Edge"
		| "Backend"
		| "Frontend"
		| "DevOps";
	skills: Skill[];
}

export interface Skill {
	name: string;
	level: 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert
	icon?: IconType;
	color?: string;
}

export interface Achievement {
	id: string;
	title: string;
	organization: string;
	date: string;
	rank?: string;
	description: string;
	imageUrl?: string;
}

export interface Certification {
	id: string;
	name: string;
	issuer: string;
	date: string;
	credentialUrl?: string;
	imageUrl?: string;
}

export interface SocialLink {
	platform: "LinkedIn" | "GitHub" | "Email" | "Twitter" | "Portfolio";
	url: string;
	icon: string;
}

export interface Organization {
	id: string;
	name: string;
	role: string;
	location: string;
	date: string;
	description: string;
	achievements: string[];
}
