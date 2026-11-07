import { Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowUpRight,
	BookOpenText,
	ChevronDown,
	Download,
	Feather,
	Github,
	Palette,
	ShieldCheck,
	SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";
import { formatSeconds, simak, surahLabel } from "../../data/simak";
import { Footer } from "./footer";
import { HeroBackdrop } from "./hero-backdrop";

type SimakData = typeof simak;

interface ThemedSources {
	light: string;
	dark: string;
}

/**
 * The site themes with a `.dark` class on the root element, so the matching
 * screenshot is chosen in CSS. Both images carry their intrinsic size to avoid
 * layout shift. They load and decode eagerly (about 100 KB per theme) so the
 * frames never depend on scroll position, lazy loading or deferred async
 * decoding; only the hero one is given high fetch priority.
 */
function ThemedImage({
	sources,
	alt,
	width,
	height,
	priority = false,
}: {
	sources: ThemedSources;
	alt: string;
	width: number;
	height: number;
	priority?: boolean;
}) {
	return (
		<>
			<img
				className="simak-shot-light"
				src={sources.light}
				alt={alt}
				width={width}
				height={height}
				fetchPriority={priority ? "high" : undefined}
			/>
			<img
				className="simak-shot-dark"
				src={sources.dark}
				alt={alt}
				width={width}
				height={height}
			/>
		</>
	);
}

function Section({
	anchor,
	title,
	lead,
	children,
}: {
	anchor: string;
	title: string;
	lead?: string;
	children: ReactNode;
}) {
	return (
		<section
			id={anchor}
			className="portfolio-section"
			aria-labelledby={`${anchor}-title`}
		>
			<div className="section-container">
				<div className="section-heading">
					<h2 id={`${anchor}-title`}>{title}</h2>
					{lead && <p>{lead}</p>}
				</div>
				{children}
			</div>
		</section>
	);
}

function Hero({ data }: { data: SimakData }) {
	return (
		<>
			<section className="hero simak-hero" aria-label="Pengenalan Simak">
				<HeroBackdrop />
				<div className="hero-content">
					<img
						className="simak-icon"
						src={data.image.icon.src}
						alt={data.image.icon.alt}
						width={144}
						height={144}
						decoding="async"
						fetchPriority="high"
					/>
					<div className="hero-glass simak-hero-copy">
						<div className="simak-hero-title">
							<h1>
								{data.name}
								<span className="name-dot">.</span>
							</h1>
							<p className="simak-status">
								<i aria-hidden="true" />
								{data.statusLabel}
							</p>
						</div>
						<p className="simak-tagline">{data.tagline}</p>
						<p className="simak-tagline-en" lang="en">
							{data.taglineEn}
						</p>
						<p className="simak-lead">
							Widget kecil yang selalu di atas jendela lain. Saat bacaan Juz{" "}
							{data.juz} oleh {data.reciter} diputar di aplikasi Spotify
							desktop, Simak menampilkan ayat yang sedang dibacakan beserta
							terjemah Indonesia dari Kemenag, lalu berganti ke ayat berikutnya
							saat qari melanjutkan.
						</p>
						<p className="simak-meaning">
							&ldquo;{data.name}&rdquo; dari kata {data.meaning}. Nama
							lengkapnya {data.storeName}.
						</p>
					</div>
					<div className="hero-buttons simak-actions">
						{data.downloads ? (
							<a className="action-primary" href="#unduh">
								<Download size={18} />
								Unduh
							</a>
						) : (
							<button type="button" className="action-primary" disabled>
								<Download size={18} />
								Unduh
							</button>
						)}
						<a className="action-secondary" href="#cara-kerja">
							Cara kerja
						</a>
						{data.repoUrl && (
							<a
								className="action-secondary"
								href={data.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github size={18} />
								Lihat di GitHub
								<ArrowUpRight size={16} />
							</a>
						)}
					</div>
					{!data.downloads && (
						<div className="simak-soon">
							<p>
								<strong>{data.comingSoonLabel}</strong>
							</p>
							{data.releasesUrl && (
								<p>
									Unduhan akan tersedia di halaman Releases di GitHub.{" "}
									<a
										href={data.releasesUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										Halaman Releases
									</a>
								</p>
							)}
						</div>
					)}
				</div>
			</section>
			<div className="section-container simak-preview">
				<figure className="simak-shot simak-shot-hero">
					<ThemedImage
						sources={data.image.short}
						alt={data.alt.short}
						width={data.image.width}
						height={data.image.height}
						priority
					/>
				</figure>
			</div>
		</>
	);
}

function Downloads({ data }: { data: SimakData }) {
	const { downloads } = data;
	if (!downloads) return null;

	return (
		<Section
			anchor="unduh"
			title="Unduh"
			lead={`Simak ${downloads.version}, pra-rilis. Pilih sistem operasi Anda.`}
		>
			<div className="simak-downloads">
				{downloads.platforms.map((platform) => (
					<article className="simak-sheet simak-download" key={platform.name}>
						<header>
							<h3>{platform.name}</h3>
							<span className="simak-badge" data-status={platform.status}>
								{platform.status === "verified"
									? "Terverifikasi"
									: "Eksperimental"}
							</span>
						</header>
						<div className="simak-download-files">
							{platform.files.map((file) => (
								<a
									key={file.kind}
									className="action-primary"
									href={file.href}
									rel="noopener noreferrer"
								>
									<Download size={18} />
									<span>
										{file.kind}
										<small>{file.note}</small>
									</span>
								</a>
							))}
						</div>
						<ol className="simak-download-steps">
							{platform.steps.map((step) => (
								<li key={step}>{step}</li>
							))}
						</ol>
					</article>
				))}
			</div>
			<p className="simak-download-meta">
				Butuh aplikasi Spotify desktop di komputer yang sama. Periksa unduhan
				dengan{" "}
				<a
					href={downloads.checksumsUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					SHA256SUMS
				</a>
				, atau lihat{" "}
				<a
					href={downloads.releaseUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					halaman rilis
				</a>
				.
			</p>
		</Section>
	);
}

const steps = [
	{
		title: "Putar bacaan di Spotify desktop",
		text: (data: SimakData) =>
			`Buka aplikasi Spotify di komputer dan putar bacaan Juz ${data.juz} oleh ${data.reciter}.`,
	},
	{
		title: "Simak membaca judul dan posisi putar",
		text: (data: SimakData) =>
			`Simak membaca judul trek, durasi, dan posisi putar dari aplikasi Spotify lewat kontrol media sistem operasi: ${data.platforms
				.map((platform) => `${platform.mechanism} di ${platform.name}`)
				.join(", ")}. Tanpa login dan tanpa API Spotify.`,
	},
	{
		title: "Ayat dan terjemah tampil tepat saat berganti",
		text: () =>
			"Ayat Arab tampil besar dengan terjemah Kemenag di bawahnya, lalu berganti ke ayat berikutnya tepat saat qari melanjutkan.",
	},
];

function HowItWorks({ data }: { data: SimakData }) {
	return (
		<Section
			anchor="cara-kerja"
			title="Cara kerja"
			lead="Tiga langkah, tanpa pengaturan akun."
		>
			<ol className="simak-steps">
				{steps.map((step, index) => (
					<li key={step.title} className="simak-sheet simak-step">
						<span className="simak-step-number" aria-hidden="true">
							{index + 1}
						</span>
						<h3>{step.title}</h3>
						<p>{step.text(data)}</p>
					</li>
				))}
			</ol>
		</Section>
	);
}

function Features({ data }: { data: SimakData }) {
	const features = [
		{
			icon: BookOpenText,
			title: "Ayat Arab dan terjemah Kemenag",
			text: "Tulisan Arab besar yang mudah dibaca, dengan terjemah bahasa Indonesia dari Kementerian Agama RI.",
		},
		{
			icon: Palette,
			title: "Tema Otomatis, Terang, atau Gelap",
			text: "Kartu kaca bergaya macOS yang mengikuti tema sistem atau dipilih sendiri.",
		},
		{
			icon: SlidersHorizontal,
			title: "Geser sinkron",
			text: `Selaraskan waktu pergantian ayat sampai ±${data.sync.rangeSeconds} detik dengan langkah ${formatSeconds(data.sync.stepSeconds)} detik.`,
		},
		{
			icon: Feather,
			title: "Ringan dan tanpa akun",
			text: "Widget kecil yang selalu di atas jendela lain. Tanpa login, tanpa pendaftaran.",
		},
		{
			icon: ShieldCheck,
			title: "Privasi",
			text: "Tidak mengumpulkan data, tidak memakai jaringan, dan tidak pernah merekam atau menyimpan audio.",
		},
	];

	return (
		<Section
			anchor="fitur"
			title="Fitur"
			lead="Sengaja dibuat kecil: satu kartu, satu tugas."
		>
			<ul className="simak-sheet simak-list">
				{features.map((feature) => (
					<li key={feature.title}>
						<feature.icon size={22} aria-hidden="true" />
						<div>
							<h3>{feature.title}</h3>
							<p>{feature.text}</p>
						</div>
					</li>
				))}
			</ul>
			<div className="simak-gallery">
				<figure className="simak-shot">
					<ThemedImage
						sources={data.image.longest}
						alt={data.alt.longest}
						width={data.image.width}
						height={data.image.height}
					/>
					<figcaption>Ayat panjang</figcaption>
				</figure>
				<figure className="simak-shot">
					<ThemedImage
						sources={data.image.waiting}
						alt={data.alt.waiting}
						width={data.image.width}
						height={data.image.height}
					/>
					<figcaption>Saat menunggu bacaan</figcaption>
				</figure>
			</div>
		</Section>
	);
}

function Limits({ data }: { data: SimakData }) {
	const excluded = data.excludedSurahs
		.map((surah) => `${surah.name} (${surah.number})`)
		.join(" dan ");

	return (
		<Section
			anchor="keterbatasan"
			title="Keterbatasan"
			lead="Yang perlu diketahui sebelum mencoba, apa adanya."
		>
			<ul className="simak-sheet simak-list simak-limits">
				<li>
					<div>
						<h3>Hanya Juz {data.juz}</h3>
						<p>
							Versi 1 mencakup surah {data.surahRange.from}-{data.surahRange.to}
							.
						</p>
					</div>
				</li>
				<li>
					<div>
						<h3>{surahLabel()}</h3>
						<p>
							{excluded} tidak didukung karena trek di Spotify-nya adalah
							rekaman yang berbeda.
						</p>
					</div>
				</li>
				<li>
					<div>
						<h3>Satu qari</h3>
						<p>Hanya bacaan {data.reciter}.</p>
					</div>
				</li>
				<li>
					<div>
						<h3>Windows dan macOS belum terverifikasi</h3>
						<p>
							Installer keduanya ada di rilis sebagai eksperimental, tetapi
							belum diuji di mesin sungguhan. Platform yang sudah terverifikasi
							sejauh ini: {data.lastVerifiedPlatforms.join(", ")}.
						</p>
						<ul className="technology-list" aria-label="Status platform">
							{data.platforms.map((platform) => (
								<li key={platform.name}>
									{platform.name}:{" "}
									{data.lastVerifiedPlatforms.includes(platform.name)
										? "terverifikasi"
										: "belum diverifikasi"}
								</li>
							))}
						</ul>
					</div>
				</li>
			</ul>
		</Section>
	);
}

function SyncSection({ data }: { data: SimakData }) {
	const { sync } = data;

	return (
		<Section
			anchor="sinkron"
			title="Sinkron dan perangkat"
			lead="Kenapa ada kontrol geser sinkron."
		>
			<div className="simak-sync">
				<div className="simak-sheet simak-prose">
					<p>
						Posisi putar yang dilaporkan Spotify bisa menyimpang dari audio
						sampai sekitar ±{sync.driftSeconds} detik di beberapa sistem.
						Perangkat keluaran juga menambah latensi, misalnya Bluetooth.
						Akibatnya ayat bisa berganti sedikit lebih awal atau lebih lambat
						dari suara yang Anda dengar.
					</p>
					<p>
						Geser sinkron menggeser waktu pergantian ayat sampai ±
						{sync.rangeSeconds} detik, dengan langkah{" "}
						{formatSeconds(sync.stepSeconds)} detik. Nilai positif membuat ayat
						muncul lebih lambat.
					</p>
					<ul className="simak-keys">
						<li>
							<kbd>{sync.keys.earlier}</kbd> mengurangi{" "}
							{formatSeconds(sync.stepSeconds)} detik
						</li>
						<li>
							<kbd>{sync.keys.later}</kbd> menambah{" "}
							{formatSeconds(sync.stepSeconds)} detik
						</li>
						<li>
							Tahan <kbd>Shift</kbd> saat menekan untuk langkah{" "}
							{sync.coarseStepSeconds} detik
						</li>
					</ul>
				</div>
				<figure className="simak-shot">
					<ThemedImage
						sources={data.image.controls}
						alt={data.alt.controls}
						width={data.image.width}
						height={data.image.height}
					/>
				</figure>
			</div>
		</Section>
	);
}

function OpenSource({ data }: { data: SimakData }) {
	const { openSource } = data;

	return (
		<Section anchor="kontribusi" title="Open source" lead={openSource.lead}>
			<div className="simak-sheet simak-oss">
				<div className="simak-oss-columns">
					<div>
						<h3>{openSource.howTitle}</h3>
						<ol className="simak-oss-list simak-oss-steps">
							{openSource.how.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ol>
					</div>
					<div>
						<h3>{openSource.helpTitle}</h3>
						<ul className="simak-oss-list simak-oss-help">
							{openSource.helpWanted.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<p className="simak-oss-note">{openSource.note}</p>
					</div>
				</div>
				<p className="simak-oss-en" lang="en">
					{openSource.english}
				</p>
				{(data.repoUrl || data.contributingUrl) && (
					<div className="simak-oss-actions">
						{data.repoUrl && (
							<a
								className="action-secondary"
								href={data.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github size={18} />
								Lihat di GitHub
								<ArrowUpRight size={16} />
							</a>
						)}
						{data.contributingUrl && (
							<a
								className="action-secondary"
								href={data.contributingUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<BookOpenText size={18} />
								Panduan kontribusi
								<ArrowUpRight size={16} />
							</a>
						)}
					</div>
				)}
			</div>
		</Section>
	);
}

function Faq({ data }: { data: SimakData }) {
	const items = [
		{
			question: "Apakah Simak memakai API Spotify?",
			answer:
				"Tidak. Simak tidak memakai API atau SDK Spotify dan tidak meminta login. Simak hanya membaca judul trek, durasi, dan posisi putar dari aplikasi Spotify desktop lewat kontrol media sistem operasi.",
		},
		{
			question: "Apakah Simak merekam suara?",
			answer:
				"Tidak. Simak tidak pernah merekam atau menyimpan audio, tidak memakai jaringan, dan tidak mengumpulkan data.",
		},
		{
			question: `Kenapa hanya Juz ${data.juz}?`,
			answer: `Versi 1 dibatasi pada Juz ${data.juz} (surah ${data.surahRange.from}-${data.surahRange.to}) dengan bacaan ${data.reciter}. Dari ${data.surahTotal} surah di rentang itu, ${data.surahCount} didukung. ${data.excludedSurahs.map((surah) => surah.name).join(" dan ")} belum, karena trek di Spotify-nya adalah rekaman yang berbeda.`,
		},
		{
			question: "Apakah bisa dipakai di Windows dan macOS?",
			answer: `Bisa dicoba. Installer Windows dan macOS ada di bagian Unduh, tetapi eksperimental: belum diverifikasi di mesin sungguhan dan belum ditandatangani, jadi sistem Anda akan menampilkan peringatan saat pertama dibuka. Platform yang sudah terverifikasi sejauh ini: ${data.lastVerifiedPlatforms.join(", ")}. Hasil uji Anda sangat membantu, kirim sebagai platform test report di GitHub.`,
		},
		{
			question: "Apakah Simak gratis?",
			answer:
				"Ya. Terjemah Kemenag dari Tanzil hanya boleh dipakai untuk tujuan nonkomersial, jadi Simak gratis dan akan tetap nonkomersial.",
		},
		{
			question: "Apakah Simak open source?",
			answer: `Ya, kodenya. Kode sumber Simak berada di bawah license ${data.license}, dan kontribusi diterima lewat fork lalu pull request. Teks Al-Qur'an dan terjemah Indonesia yang disertakan tidak tercakup license ${data.license} dan tetap mengikuti ketentuannya sendiri, jadi datanya belum sepenuhnya open data.`,
		},
	];

	return (
		<Section anchor="faq" title="Pertanyaan umum">
			<div className="simak-sheet simak-faq">
				{items.map((item) => (
					<details key={item.question}>
						<summary>
							{item.question}
							<ChevronDown size={20} aria-hidden="true" />
						</summary>
						<p>{item.answer}</p>
					</details>
				))}
			</div>
		</Section>
	);
}

function Credits({ data }: { data: SimakData }) {
	return (
		<Section anchor="kredit" title="Kredit dan hukum">
			<div className="simak-sheet simak-prose simak-credits">
				<p>
					{data.attributions.quran}{" "}
					<a href={data.tanzilUrl} target="_blank" rel="noopener noreferrer">
						tanzil.net
					</a>
				</p>
				<p>{data.attributions.translation}</p>
				<p>{data.attributions.audio}</p>
				<p>{data.licenseNote}</p>
				{(data.licenseUrl || data.dataTermsUrl) && (
					<p className="simak-credit-links">
						{data.licenseUrl && (
							<a
								href={data.licenseUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								LICENSE
							</a>
						)}
						{data.dataTermsUrl && (
							<a
								href={data.dataTermsUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								data/README.md
							</a>
						)}
					</p>
				)}
				<p className="simak-legal">{data.nonAffiliation}</p>
			</div>
		</Section>
	);
}

function BackHome() {
	return (
		<div className="section-container simak-back">
			<Link className="action-secondary" to="/">
				<ArrowLeft size={18} />
				Kembali ke portofolio
			</Link>
		</div>
	);
}

export function SimakPage({ data = simak }: { data?: SimakData }) {
	return (
		<>
			{/* biome-ignore lint/correctness/useUniqueElementIds: One main landmark, targeted by the skip link. */}
			<main id="main-content" tabIndex={-1} lang="id" className="min-h-screen">
				<Hero data={data} />
				<Downloads data={data} />
				<HowItWorks data={data} />
				<Features data={data} />
				<Limits data={data} />
				<SyncSection data={data} />
				<OpenSource data={data} />
				<Faq data={data} />
				<Credits data={data} />
				<BackHome />
			</main>
			<Footer />
		</>
	);
}
