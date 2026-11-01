"use client";

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
		color: "contact-submit",
		disabled: false,
	});

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setButtonState({
			text: "Sending...",
			color: "contact-sending",
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
					color: "contact-success",
					disabled: true,
				});
				setTimeout(() => {
					setButtonState({
						text: "Send Message",
						color: "contact-submit",
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
				color: "contact-error",
				disabled: true,
			});
			setTimeout(() => {
				setButtonState({
					text: "Send Message",
					color: "contact-submit",
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
		<section id="contact" className="portfolio-section contact-section">
			<div className="section-container contact-sheet">
				{/* Section Header */}
				<div className="section-heading contact-heading">
					<h2 className="contact-title">
						Get in <span>Touch</span>
					</h2>
					<p className="contact-lead">
						Let's connect and feel free to reach out for collaborations or just
						a friendly chat
					</p>
				</div>

				{/* Contact Form */}
				<div className="contact-form-wrap">
					<div className="contact-form-group">
						<form onSubmit={handleSubmit} className="contact-form">
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
									aria-label="Your Name"
									autoComplete="name"
									placeholder="Your Name"
									className="contact-field"
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
									aria-label="Your Email"
									autoComplete="email"
									placeholder="Your Email"
									className="contact-field"
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
									aria-label="Your Message"
									placeholder="Your Message"
									rows={5}
									className="contact-field"
									required
								/>
							</div>

							{/* Submit Button */}
							<div className="relative">
								<Button
									aria-live="polite"
									type="submit"
									size="lg"
									disabled={buttonState.disabled}
									className={`w-full ${buttonState.color} text-white font-medium hover:opacity-90 transition-opacity`}
								>
									<Send className="mr-2 h-4 w-4" />
									{buttonState.text}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
