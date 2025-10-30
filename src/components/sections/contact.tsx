"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "../ui/button";

export function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [buttonState, setButtonState] = useState({
		text: "Send Message",
		color: "bg-linear-to-r from-primary via-purple-500 to-pink-500",
		disabled: false,
	});

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setButtonState({
			text: "Sending...",
			color: "bg-blue-500",
			disabled: true,
		});

		try {
			const formDataObj = new FormData(event.target as HTMLFormElement);
			formDataObj.append("access_key", "31be41b5-c6ca-4f2e-913b-dfad1c4050fb"); // Web3Forms API key

			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formDataObj,
			});

			const data = await response.json();

			if (data.success) {
				setButtonState({
					text: "Success!",
					color: "bg-green-500",
					disabled: true,
				});
				setTimeout(() => {
					setButtonState({
						text: "Send Message",
						color: "bg-linear-to-r from-primary via-purple-500 to-pink-500",
						disabled: false,
					});
				}, 2000);
				(event.target as HTMLFormElement).reset();
				setFormData({ name: "", email: "", message: "" });
			} else {
				throw new Error(data.message || "Submission failed");
			}
		} catch (error) {
			console.error("Error:", error);
			setButtonState({
				text: "Failed",
				color: "bg-red-500",
				disabled: true,
			});
			setTimeout(() => {
				setButtonState({
					text: "Send Message",
					color: "bg-linear-to-r from-primary via-purple-500 to-pink-500",
					disabled: false,
				});
			}, 2000);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Static ID needed for navigation anchor
		<section id="contact" className="py-20">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Get in <span className="text-gradient">Touch</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Let's connect and feel free to reach out for collaborations or just
						a friendly chat
					</p>
				</motion.div>

				{/* Contact Form */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="max-w-2xl mx-auto"
				>
					<div className="relative p-1 rounded-2xl bg-linear-to-br from-primary/30 to-purple-500/30">
						<form
							onSubmit={handleSubmit}
							className="space-y-6 bg-background rounded-2xl p-8"
						>
							{/* Name Field */}
							<div className="relative">
								<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-muted-foreground" />
								</div>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Your Name"
									className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
									required
								/>
							</div>

							{/* Email Field */}
							<div className="relative">
								<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-muted-foreground" />
								</div>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your Email"
									className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
									required
								/>
							</div>

							{/* Message Field */}
							<div className="relative">
								<div className="absolute top-3.5 left-3 flex items-start pointer-events-none">
									<MessageSquare className="h-5 w-5 text-muted-foreground" />
								</div>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									placeholder="Your Message"
									rows={5}
									className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
									required
								/>
							</div>

							{/* Submit Button */}
							<motion.div
								className="relative"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									type="submit"
									size="lg"
									disabled={buttonState.disabled}
									className={`w-full ${buttonState.color} text-white font-medium hover:opacity-90 transition-opacity`}
								>
									<Send className="mr-2 h-4 w-4" />
									{buttonState.text}
								</Button>
							</motion.div>
						</form>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
