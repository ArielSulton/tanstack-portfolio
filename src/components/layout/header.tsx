import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { profile } from "../../data/profile";

const navigation = [
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#projects" },
	{ name: "Achievements", href: "#achievements" },
];

// Standalone pages (for example /apps/simak) have no home-page sections, so the
// island offers a single link back to the portfolio instead of broken anchors.
const standaloneNavigation = [{ name: "Portofolio", href: "/" }];

// After a client-side navigation the new page can commit a frame after the
// header re-renders, so wait briefly for its landmarks instead of giving up.
function whenPresent(
	selector: string,
	callback: (element: Element) => void,
	attempts = 60,
) {
	let frame = 0;
	const look = () => {
		const element = document.querySelector(selector);
		if (element) callback(element);
		else if (attempts-- > 0) frame = requestAnimationFrame(look);
	};
	look();
	return () => cancelAnimationFrame(frame);
}

export function Header() {
	const menuId = useId();
	const isHome = useRouterState({
		select: (state) => state.location.pathname === "/",
	});
	const [open, setOpen] = useState(false);
	const [dark, setDark] = useState(false);
	const [desktop, setDesktop] = useState(false);
	const [folded, setFolded] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const [heroAction, setHeroAction] = useState(true);
	const [active, setActive] = useState("");
	const [panelWidth, setPanelWidth] = useState(600);
	const menuButton = useRef<HTMLButtonElement>(null);
	const header = useRef<HTMLElement>(null);
	const panel = useRef<HTMLDivElement>(null);
	const compact = desktop && folded && !hovered && !focused;

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = () => {
			let saved: string | null = null;
			try {
				saved = localStorage.getItem("portfolio-theme");
			} catch {
				/* Storage is optional. */
			}
			const next = saved ? saved === "dark" : media.matches;
			setDark(next);
			document.documentElement.classList.toggle("dark", next);
		};
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, []);

	useEffect(() => {
		const media = matchMedia("(min-width: 1000px)");
		const sync = () => {
			const activeElement = document.activeElement;
			if (media.matches && activeElement === menuButton.current)
				header.current
					?.querySelector<HTMLAnchorElement>(".island-brand")
					?.focus();
			if (!media.matches && panel.current?.contains(activeElement))
				menuButton.current?.focus();
			setDesktop(media.matches);
			setOpen(false);
		};
		sync();
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		if (!desktop) return;
		let previous = window.scrollY;
		let frame = 0;
		const scroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				const y = window.scrollY;
				if (y < 100) setFolded(false);
				else if (Math.abs(y - previous) >= 6) setFolded(y > previous);
				if (Math.abs(y - previous) >= 6 || y < 100) previous = y;
			});
		};
		window.addEventListener("scroll", scroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", scroll);
			cancelAnimationFrame(frame);
		};
	}, [desktop]);

	useEffect(() => {
		const inner = panel.current;
		if (!inner) return;
		const resize = new ResizeObserver(() =>
			setPanelWidth(Math.ceil(inner.getBoundingClientRect().width)),
		);
		resize.observe(inner);
		return () => resize.disconnect();
	}, []);

	useEffect(() => {
		if (!isHome) {
			setHeroAction(false);
			return;
		}
		let observer: IntersectionObserver | undefined;
		const stop = whenPresent(".hero-buttons", (target) => {
			observer = new IntersectionObserver((entries) =>
				setHeroAction(entries[0]?.isIntersecting ?? false),
			);
			observer.observe(target);
		});
		return () => {
			stop();
			observer?.disconnect();
		};
	}, [isHome]);

	useEffect(() => {
		if (!isHome) {
			setActive("");
			return;
		}
		let observer: IntersectionObserver | undefined;
		const stop = whenPresent("#home", (home) => {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries)
						if (entry.isIntersecting)
							setActive(
								entry.target.id === "home" ? "" : `#${entry.target.id}`,
							);
				},
				{ rootMargin: "-12% 0px -65% 0px" },
			);
			observer.observe(home);
			for (const item of navigation) {
				const target = document.querySelector(item.href);
				if (target) observer.observe(target);
			}
		});
		return () => {
			stop();
			observer?.disconnect();
		};
	}, [isHome]);

	useEffect(() => {
		if (!open) return;
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				menuButton.current?.focus({ preventScroll: true });
			}
		};
		const outside = (event: Event) => {
			if (!header.current?.contains(event.target as Node)) setOpen(false);
		};
		document.addEventListener("keydown", close);
		document.addEventListener("pointerdown", outside);
		document.addEventListener("focusin", outside);
		return () => {
			document.removeEventListener("keydown", close);
			document.removeEventListener("pointerdown", outside);
			document.removeEventListener("focusin", outside);
		};
	}, [open]);

	// Close the mobile menu when navigating to another page.
	// biome-ignore lint/correctness/useExhaustiveDependencies: Only the page change should close the menu.
	useEffect(() => {
		setOpen(false);
	}, [isHome]);

	const toggleTheme = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem("portfolio-theme", next ? "dark" : "light");
		} catch {
			/* Theme still works without storage. */
		}
	};
	const closeMenu = () => {
		setOpen(false);
		menuButton.current?.focus({ preventScroll: true });
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: Passive hover/focus observers reveal native navigation controls.
		<header
			ref={header}
			className={`island-header ${open ? "is-open" : ""}`}
			data-island={compact ? "compact" : "expanded"}
			data-cta={heroAction ? "later" : "visible"}
			style={{ "--panel-width": `${panelWidth}px` } as CSSProperties}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onFocus={() => setFocused(true)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget))
					setFocused(false);
			}}
		>
			<div className="island-bar">
				{isHome ? (
					// biome-ignore lint/a11y/useValidAnchor: Native fragment navigation to the hero.
					<a
						className="island-brand"
						href="#home"
						onClick={() => setOpen(false)}
					>
						<span className="brand-dot" aria-hidden="true" />
						Ariel Sulton
					</a>
				) : (
					<Link className="island-brand" to="/" onClick={() => setOpen(false)}>
						<span className="brand-dot" aria-hidden="true" />
						Ariel Sulton
					</Link>
				)}
				<div className="island-navigation" inert={compact}>
					<div ref={panel} className="island-navigation-inner">
						<nav className="desktop-nav" aria-label="Main navigation">
							{isHome
								? navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											aria-current={
												active === item.href ? "location" : undefined
											}
										>
											{item.name}
										</a>
									))
								: standaloneNavigation.map((item) => (
										<Link key={item.name} to={item.href}>
											{item.name}
										</Link>
									))}
						</nav>
					</div>
				</div>
				<div className="island-actions">
					<button
						type="button"
						className="icon-control"
						onClick={toggleTheme}
						aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
					>
						{dark ? <Sun size={18} /> : <Moon size={18} />}
					</button>
					<div className="island-contact-wrap" inert={desktop && heroAction}>
						<a className="island-contact" href={`mailto:${profile.email}`}>
							Contact
							<ArrowUpRight size={15} />
						</a>
					</div>
					<button
						ref={menuButton}
						type="button"
						className="icon-control menu-toggle"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						aria-controls={menuId}
						onClick={() => setOpen(!open)}
					>
						{open ? <X size={21} /> : <Menu size={21} />}
					</button>
				</div>
			</div>
			<div className="mobile-nav-shell" inert={!open} aria-hidden={!open}>
				<nav id={menuId} className="mobile-nav" aria-label="Mobile navigation">
					<div className="mobile-nav-content">
						{isHome
							? navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={active === item.href ? "location" : undefined}
										onClick={closeMenu}
									>
										{item.name}
										<ArrowUpRight size={20} />
									</a>
								))
							: standaloneNavigation.map((item) => (
									<Link key={item.name} to={item.href} onClick={closeMenu}>
										{item.name}
										<ArrowUpRight size={20} />
									</Link>
								))}
						<a href={`mailto:${profile.email}`} onClick={closeMenu}>
							Contact
							<ArrowUpRight size={20} />
						</a>
					</div>
				</nav>
			</div>
		</header>
	);
}
