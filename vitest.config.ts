import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: { tsconfigPaths: true },
	test: {
		include: ["scripts/**/*.test.mjs", "src/**/*.test.{ts,tsx}"],
		environment: "node",
	},
});
