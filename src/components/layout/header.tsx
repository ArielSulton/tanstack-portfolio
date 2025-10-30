import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import { Button } from "../ui/button";

const navigation = [
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#projects" },
	{ name: "Achievements", href: "#achievements" },
];

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<button
						type="button"
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className="font-mono font-bold text-xl hover:opacity-80 transition-opacity"
					>
						<span className="text-muted-foreground">&lt;</span>
						Ariel Sulton
						<span className="text-muted-foreground"> /&gt;</span>
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6">
						{navigation.map((item) => (
							<button
								key={item.name}
								type="button"
								onClick={() => scrollToSection(item.href)}
								className="text-muted-foreground hover:text-foreground transition-colors font-medium"
							>
								{item.name}
							</button>
						))}
						<Button asChild size="sm">
							<a href={`mailto:${profile.email}`}>Contact</a>
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
					<nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
						{navigation.map((item) => (
							<button
								key={item.name}
								type="button"
								onClick={() => scrollToSection(item.href)}
								className="text-left px-4 py-2 rounded-lg hover:bg-accent transition-colors font-medium"
							>
								{item.name}
							</button>
						))}
						<Button asChild className="mt-2">
							<a href={`mailto:${profile.email}`}>Contact</a>
						</Button>
					</nav>
				</div>
			)}
		</header>
	);
}
