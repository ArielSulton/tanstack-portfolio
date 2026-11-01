import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const configRequire = createRequire(require.resolve("@netlify/config"));
const deepmerge = configRequire("deepmerge");
const { mergeConfigs } = await import(
	new URL("./merge.js", pathToFileURL(require.resolve("@netlify/config"))).href
);

describe("deepmerge prototype-poisoning regression", () => {
	it("does not inherit attacker properties while copying the target", () => {
		const target = JSON.parse('{"__proto__":{"polluted":true},"safe":1}');
		const result = deepmerge(target, { another: 2 });
		expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
		expect(result.polluted).toBeUndefined();
		expect(result.safe).toBe(1);
		expect(result.another).toBe(2);
	});

	it("does not invoke the prototype setter when the source key also exists on the target", () => {
		const target = JSON.parse('{"__proto__":{"first":true}}');
		const source = JSON.parse('{"__proto__":{"polluted":true}}');
		const result = deepmerge(target, source);
		expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
		expect(result.polluted).toBeUndefined();
		expect({}.polluted).toBeUndefined();
	});

	it("preserves nested merge and custom array behavior used by Netlify", () => {
		const first = { build: { environment: { ONE: "1" } }, files: ["first"] };
		const second = { build: { environment: { TWO: "2" } }, files: ["second"] };
		const result = deepmerge.all([first, second], { arrayMerge: (_a, b) => b });
		expect(result).toEqual({
			build: { environment: { ONE: "1", TWO: "2" } },
			files: ["second"],
		});
		expect(first.files).toEqual(["first"]);
	});
});

describe("Netlify configuration compatibility", () => {
	it("merges build configuration and plugin inputs without changing array precedence", () => {
		const result = mergeConfigs([
			{
				build: { command: "bun run build", environment: { FIRST: "1" } },
				plugins: [{ package: "example", inputs: { first: 1 } }],
				headers: ["old"],
			},
			{
				build: { environment: { SECOND: "2" } },
				plugins: [{ package: "example", inputs: { second: 2 } }],
				headers: ["new"],
			},
		]);
		expect(result.build).toEqual({
			command: "bun run build",
			environment: { FIRST: "1", SECOND: "2" },
		});
		expect(result.plugins).toEqual([
			{ package: "example", inputs: { first: 1, second: 2 } },
		]);
		expect(result.headers).toEqual(["new"]);
	});
});

describe("Netlify function packaging with security overrides", () => {
	it("traces required modules and respects included/excluded file patterns", async () => {
		const { zipFunctions } = await import("@netlify/zip-it-and-ship-it");
		const root = await mkdtemp(join(tmpdir(), "portfolio-netlify-package-"));
		try {
			const source = join(root, "functions");
			await mkdir(join(source, "assets"), { recursive: true });
			await writeFile(
				join(source, "hello.cjs"),
				'const message = require("./message.cjs"); exports.handler = async () => ({ statusCode: 200, body: message });',
			);
			await writeFile(join(source, "message.cjs"), 'module.exports = "hello";');
			await writeFile(join(source, "assets", "public.txt"), "included");
			await writeFile(join(source, "assets", "private.txt"), "excluded");
			const results = await zipFunctions(source, join(root, "output"), {
				archiveFormat: "none",
				basePath: root,
				config: {
					hello: {
						nodeBundler: "nft",
						includedFiles: [
							"functions/assets/*.txt",
							"!functions/assets/private.txt",
						],
					},
				},
			});
			const hello = results.find((item) => item.name === "hello");
			expect(hello).toBeDefined();
			const files = hello.includedFiles;
			expect(hello.inputs.some((file) => file.endsWith("message.cjs"))).toBe(
				true,
			);
			expect(files.some((file) => file.endsWith("public.txt"))).toBe(true);
			expect(files.some((file) => file.endsWith("private.txt"))).toBe(false);
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	}, 20000);
});
