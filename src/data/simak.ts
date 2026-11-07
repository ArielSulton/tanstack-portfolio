/**
 * Facts, numbers and links for the Simak landing page (`/apps/simak`).
 * Update this file when the app is released; components only read from here.
 * Copy uses ordinary hyphens and contains no em dashes.
 */
import { siteUrl } from "../lib/site";

export type SimakStatus = "pre-release" | "released";
export type SimakPlatform = "Linux" | "Windows" | "macOS";

export type SimakPlatformStatus = "verified" | "experimental";

export interface SimakDownloadFile {
	/** File type shown on the button, for example ".deb". */
	kind: string;
	note: string;
	href: string;
}

export interface SimakPlatformDownload {
	name: SimakPlatform;
	status: SimakPlatformStatus;
	files: SimakDownloadFile[];
	steps: string[];
}

/** Real release assets. Keep `downloads` as `null` when there is no release, which shows "Segera hadir". */
export interface SimakDownloads {
	version: string;
	releaseUrl: string;
	checksumsUrl: string;
	platforms: SimakPlatformDownload[];
}

const repo = "https://github.com/ArielSulton/quran-widget";
const releaseVersion = "0.1.0";
const assetBase = `${repo}/releases/download/v${releaseVersion}`;

const downloads: SimakDownloads = {
	version: releaseVersion,
	releaseUrl: `${repo}/releases/tag/v${releaseVersion}`,
	checksumsUrl: `${assetBase}/SHA256SUMS`,
	platforms: [
		{
			name: "Linux",
			status: "verified",
			files: [
				{
					kind: ".deb",
					note: "Debian, Ubuntu",
					href: `${assetBase}/Simak_${releaseVersion}_amd64.deb`,
				},
				{
					kind: ".rpm",
					note: "Fedora, openSUSE",
					href: `${assetBase}/Simak-${releaseVersion}-1.x86_64.rpm`,
				},
				{
					kind: ".AppImage",
					note: "Distro lain",
					href: `${assetBase}/Simak_${releaseVersion}_amd64.AppImage`,
				},
			],
			steps: [
				"Pasang .deb dengan sudo apt install ./berkas.deb, atau jalankan chmod +x pada AppImage lalu buka. Perlu libwebkit2gtk-4.1.",
				"Putar bacaan Juz 30 di Spotify desktop.",
			],
		},
		{
			name: "macOS",
			status: "experimental",
			files: [
				{
					kind: ".dmg",
					note: "Apple silicon dan Intel",
					href: `${assetBase}/Simak_${releaseVersion}_universal.dmg`,
				},
			],
			steps: [
				"Seret Simak ke Applications.",
				"Aplikasi belum ditandatangani, jadi Gatekeeper memblokirnya: klik kanan Simak lalu pilih Open, atau izinkan di System Settings > Privacy & Security.",
				"Izinkan Simak mengontrol Spotify saat macOS bertanya.",
			],
		},
		{
			name: "Windows",
			status: "experimental",
			files: [
				{
					kind: ".exe",
					note: "Installer",
					href: `${assetBase}/Simak_${releaseVersion}_x64-setup.exe`,
				},
				{
					kind: ".msi",
					note: "Paket MSI",
					href: `${assetBase}/Simak_${releaseVersion}_x64_en-US.msi`,
				},
			],
			steps: [
				"Aplikasi belum ditandatangani, jadi SmartScreen menampilkan Windows protected your PC.",
				"Klik More info, lalu Run anyway, dan putar bacaan di Spotify desktop.",
			],
		},
	],
};

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
	// Release assets of v0.1.0. Set to null when there is no release: the page then shows "Segera hadir".
	downloads: downloads as SimakDownloads | null,
	repoUrl: repo as string | null,
	releasesUrl: `${repo}/releases` as string | null,
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
