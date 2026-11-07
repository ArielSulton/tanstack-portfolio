/**
 * Facts, numbers and links for the Simak landing page (`/apps/simak`).
 * Update this file when the app is released; components only read from here.
 * Copy uses ordinary hyphens and contains no em dashes.
 */
import { siteUrl } from "../lib/site";

export type SimakStatus = "pre-release" | "released";
export type SimakPlatform = "Linux" | "Windows" | "macOS";

/** Release URLs per platform. Keep `downloads` as `null` until a real release exists. */
export type SimakDownloads = Record<SimakPlatform, string | null>;

const lastVerifiedPlatforms: SimakPlatform[] = ["Linux"];

export const simak = {
	name: "Simak",
	storeName: "Simak Ayat",
	tagline: "Ayat yang sedang dibacakan",
	taglineEn: "The ayah being recited, as you listen.",
	meaning: "menyimak: mendengarkan dengan saksama",
	pagePath: "/apps/simak",
	pageUrl: `${siteUrl}/apps/simak`,
	status: "pre-release" as SimakStatus,
	statusLabel: "Pra-rilis",
	reciter: "Al Sheikh Yasser Al-dosari",
	juz: 30,
	surahRange: { from: 78, to: 114 },
	surahTotal: 37,
	surahCount: 35,
	excludedSurahs: [
		{ number: 101, name: "Al-Qari'ah" },
		{ number: 104, name: "Al-Humazah" },
	],
	lastVerifiedPlatforms,
	platforms: [
		{ name: "Linux", mechanism: "MPRIS" },
		{ name: "macOS", mechanism: "AppleScript" },
		{ name: "Windows", mechanism: "media transport controls" },
	] satisfies { name: SimakPlatform; mechanism: string }[],
	sync: {
		rangeSeconds: 2,
		stepSeconds: 0.1,
		coarseStepSeconds: 1,
		driftSeconds: 1,
		keys: { earlier: "[", later: "]" },
	},
	// TODO: release links. Fill `downloads` per platform once a real release exists;
	// until then the page shows "Segera hadir" and renders no download link.
	downloads: null as SimakDownloads | null,
	repoUrl: "https://github.com/ArielSulton/quran-widget" as string | null,
	releasesUrl: "https://github.com/ArielSulton/quran-widget/releases" as
		| string
		| null,
	comingSoonLabel: "Segera hadir",
	nonAffiliation:
		"Simak tidak berafiliasi dengan, disponsori, atau didukung oleh Spotify AB. Spotify adalah merek dagang Spotify AB.",
	attributions: {
		quran:
			"Teks Al-Qur'an dari Tanzil Project (tanzil.net), lisensi CC BY 3.0. Satu-satunya perubahan: basmalah di awal ayat 1 dihapus agar dapat ditampilkan terpisah.",
		translation:
			"Terjemahan bahasa Indonesia oleh Kementerian Agama RI melalui Tanzil, hanya untuk penggunaan nonkomersial. Karena itu Simak gratis dan akan tetap nonkomersial.",
		audio:
			"Audio bacaan tidak pernah didistribusikan. Sebuah rekaman referensi publik hanya dipakai satu kali saat pengembangan untuk menghitung angka waktu.",
	},
	tanzilUrl: "https://tanzil.net",
	license: "MIT",
	licenseNote:
		"Kode sumber Simak berada di bawah license MIT (berkas LICENSE). Teks Al-Qur'an dan terjemah Indonesia yang disertakan tidak tercakup license MIT dan tetap mengikuti ketentuannya sendiri di atas, jadi datanya belum sepenuhnya open data.",
	licenseUrl: "https://github.com/ArielSulton/quran-widget/blob/main/LICENSE" as
		| string
		| null,
	dataTermsUrl:
		"https://github.com/ArielSulton/quran-widget/blob/main/data/README.md" as
			| string
			| null,
	contributingUrl:
		"https://github.com/ArielSulton/quran-widget/blob/main/CONTRIBUTING.md" as
			| string
			| null,
	openSource: {
		title: "Open source",
		lead: "Kode Simak terbuka di bawah license MIT. Kontribusi sangat diterima.",
		english:
			"Simak is open source under the MIT license, and contributions are welcome through a fork and a pull request. The bundled Quran text and Indonesian translation keep their own terms and are not covered by MIT, so the data is not fully open data and Simak stays free and non-commercial.",
		howTitle: "Cara berkontribusi",
		how: [
			"Fork repositori Simak di GitHub.",
			"Buat branch baru untuk perubahan Anda.",
			"Kirim pull request dengan penjelasan singkat tentang perubahannya.",
			"Baca panduan kontribusi lebih dulu. README tersedia dalam English dan Indonesia.",
		],
		helpTitle: "Help wanted",
		helpWanted: [
			"Uji coba di macOS dan Windows dengan example accuracy_probe, lalu kirim platform test report sebagai issue di GitHub.",
			"Listening check pada batas ayat yang ditandai, yaitu mendengarkan bacaan dan memastikan ayat berganti tepat waktu.",
			"Uji coba di Wayland.",
			"Terjemah bahasa Indonesia yang berlisensi bebas.",
			"Qari lain selain Al Sheikh Yasser Al-dosari.",
		],
		note: "Alat yang merekam audio pemutaran untuk mengukur waktu sengaja tidak dipublikasikan.",
	},
	image: {
		icon: {
			src: "/images/simak/simak-icon.svg",
			alt: "Ikon aplikasi Simak",
			width: 1024,
			height: 1024,
		},
		width: 1040,
		height: 640,
		short: {
			light: "/images/simak/widget-light-short.webp",
			dark: "/images/simak/widget-dark-short.webp",
		},
		controls: {
			light: "/images/simak/widget-light-controls.webp",
			dark: "/images/simak/widget-dark-controls.webp",
		},
		longest: {
			light: "/images/simak/widget-light-longest.webp",
			dark: "/images/simak/widget-dark-longest.webp",
		},
		waiting: {
			light: "/images/simak/widget-light-waiting.webp",
			dark: "/images/simak/widget-dark-waiting.webp",
		},
	},
	alt: {
		short:
			"Tampilan widget Simak di atas latar berwarna: ayat Al-Ikhlas 112:1 dalam tulisan Arab besar dengan terjemah Indonesia",
		controls:
			"Tampilan widget Simak di atas latar berwarna, dengan pilihan tema dan kontrol geser sinkron terlihat di bagian bawah",
		longest:
			"Tampilan widget Simak di atas latar berwarna menampilkan ayat panjang dengan terjemah Indonesia",
		waiting:
			"Tampilan widget Simak di atas latar berwarna saat menunggu bacaan: tulisan Menunggu bacaan Al-Qur'an",
	},
	seo: {
		title: "Simak Ayat - ayat yang sedang dibacakan",
		description:
			"Simak Ayat adalah widget desktop kecil yang menampilkan ayat yang sedang dibacakan dari Juz 30 di aplikasi Spotify desktop, lengkap dengan terjemah Kemenag. Tanpa akun, tanpa API Spotify, tanpa pengumpulan data. Pra-rilis.",
		keywords:
			"Simak Ayat, widget Al-Qur'an, Juz 30, ayat yang sedang dibacakan, terjemah Kemenag, Al Sheikh Yasser Al-dosari, aplikasi desktop, Tauri, Ariel Sulton",
	},
} as const;

export function formatSeconds(seconds: number): string {
	return String(seconds).replace(".", ",");
}

export function surahLabel(): string {
	return `${simak.surahCount} dari ${simak.surahTotal} surah`;
}
