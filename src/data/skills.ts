import type { IconType } from "react-icons";
import { FaLinux } from "react-icons/fa";
import { GrVmware } from "react-icons/gr";
import { LuBrainCircuit } from "react-icons/lu";
import { MdDataUsage } from "react-icons/md";
import {
	SiApacheairflow,
	SiCplusplus,
	SiCss3,
	SiDocker,
	SiFastapi,
	SiFlask,
	SiGit,
	SiGooglecloud,
	SiGrafana,
	SiHtml5,
	SiJavascript,
	SiNextdotjs,
	SiNumpy,
	SiOpencv,
	SiPandas,
	SiPostgresql,
	SiPrometheus,
	SiPython,
	SiPytorch,
	SiReact,
	SiRos,
	SiScikitlearn,
	SiSupabase,
	SiTailwindcss,
	SiTensorflow,
	SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

export interface Skill {
	name: string;
	level: number;
	icon: IconType;
	color: string;
}

export interface SkillCategory {
	category: string;
	skills: Skill[];
}

export const skills: SkillCategory[] = [
	{
		category: "Data & ML/DL",
		skills: [
			{ name: "Python", level: 5, icon: SiPython, color: "#3776AB" },
			{ name: "NumPy", level: 5, icon: SiNumpy, color: "#013243" },
			{ name: "Pandas", level: 5, icon: SiPandas, color: "#150458" },
			{
				name: "scikit-learn",
				level: 4,
				icon: SiScikitlearn,
				color: "#F7931E",
			},
			{
				name: "TensorFlow",
				level: 4,
				icon: SiTensorflow,
				color: "#FF6F00",
			},
			{ name: "PyTorch", level: 4, icon: SiPytorch, color: "#EE4C2C" },
			{ name: "MLOps", level: 4, icon: MdDataUsage, color: "#00ADD8" },
			{ name: "MLFlow", level: 4, icon: GrVmware, color: "#0194E2" },
		],
	},
	{
		category: "Computer Vision",
		skills: [
			{ name: "OpenCV", level: 5, icon: SiOpencv, color: "#5C3EE8" },
			{ name: "YOLO", level: 5, icon: LuBrainCircuit, color: "#00FFFF" },
			{ name: "TensorRT", level: 4, icon: LuBrainCircuit, color: "#76B900" },
			{ name: "RKNN", level: 4, icon: LuBrainCircuit, color: "#FF6B35" },
			{ name: "C++", level: 4, icon: SiCplusplus, color: "#00599C" },
			{
				name: "TensorFlow",
				level: 4,
				icon: SiTensorflow,
				color: "#FF6F00",
			},
		],
	},
	{
		category: "LLM & RAG",
		skills: [
			{ name: "LangChain", level: 4, icon: LuBrainCircuit, color: "#1C3C3C" },
			{ name: "Groq API", level: 4, icon: TbApi, color: "#F55036" },
			{
				name: "Prompt Engineering",
				level: 4,
				icon: LuBrainCircuit,
				color: "#10B981",
			},
			{ name: "Pinecone", level: 3, icon: MdDataUsage, color: "#000000" },
		],
	},
	{
		category: "Robotics/Edge",
		skills: [
			{ name: "ROS2", level: 4, icon: SiRos, color: "#22314E" },
			{ name: "MAVROS", level: 4, icon: SiRos, color: "#0B5E90" },
			{ name: "LiDAR", level: 4, icon: MdDataUsage, color: "#FF6B6B" },
			{ name: "GPS/IMU", level: 4, icon: MdDataUsage, color: "#4ECDC4" },
		],
	},
	{
		category: "Backend",
		skills: [
			{ name: "FastAPI", level: 5, icon: SiFastapi, color: "#009688" },
			{ name: "REST API", level: 5, icon: TbApi, color: "#61DAFB" },
			{ name: "Flask", level: 4, icon: SiFlask, color: "#000000" },
			{ name: "Airflow", level: 4, icon: SiApacheairflow, color: "#017CEE" },
			{ name: "Supabase", level: 4, icon: SiSupabase, color: "#3ECF8E" },
			{ name: "PostgreSQL", level: 4, icon: SiPostgresql, color: "#336791" },
		],
	},
	{
		category: "Frontend",
		skills: [
			{ name: "Next.js", level: 5, icon: SiNextdotjs, color: "#000000" },
			{ name: "React", level: 5, icon: SiReact, color: "#61DAFB" },
			{ name: "TanStack Start", level: 4, icon: SiReact, color: "#FF4154" },
			{ name: "TypeScript", level: 4, icon: SiTypescript, color: "#3178C6" },
			{ name: "JavaScript", level: 5, icon: SiJavascript, color: "#F7DF1E" },
			{ name: "HTML", level: 5, icon: SiHtml5, color: "#E34F26" },
			{ name: "CSS", level: 5, icon: SiCss3, color: "#1572B6" },
			{ name: "Tailwind", level: 5, icon: SiTailwindcss, color: "#06B6D4" },
		],
	},
	{
		category: "DevOps",
		skills: [
			{ name: "Docker", level: 5, icon: SiDocker, color: "#2496ED" },
			{ name: "Linux", level: 5, icon: FaLinux, color: "#FCC624" },
			{ name: "Git", level: 5, icon: SiGit, color: "#F05032" },
			{ name: "Grafana", level: 4, icon: SiGrafana, color: "#F46800" },
			{ name: "Prometheus", level: 4, icon: SiPrometheus, color: "#E6522C" },
			{ name: "GCP", level: 4, icon: SiGooglecloud, color: "#4285F4" },
		],
	},
];
