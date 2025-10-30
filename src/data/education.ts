import type { Education } from "../types";

export const education: Education[] = [
	{
		id: "edu-1",
		institution: "Politeknik Elektronika Negeri Surabaya",
		degree: "Bachelor of Applied Science",
		field: "Applied Data Science",
		location: "Surabaya, Indonesia",
		startDate: "July 2023",
		endDate: undefined,
		gpa: "3.77 / 4.00",
		achievements: [
			"Fully funded by the Indonesia Government's KIP-K Scholarship (Kartu Indonesia Pintar Kuliah)",
			"Current GPA: 3.77 / 4.00",
		],
	},
	{
		id: "edu-2",
		institution: "MAN Sidoarjo",
		degree: "High School",
		field: "Mathematics & Natural Sciences",
		location: "Sidoarjo, Indonesia",
		startDate: "July 2020",
		endDate: "May 2023",
		achievements: [],
	},
];
