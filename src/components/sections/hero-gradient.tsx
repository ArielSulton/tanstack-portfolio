import { useEffect, useRef, useState } from "react";

// A flowing, four-to-five colour gradient drawn by a small fragment shader, in
// the manner of the animated gradient on Masalabs' hero. The colours come from
// the page's CSS (`--wp-*`), so it follows the light/dark theme. It renders at
// half resolution (the gradient is smooth anyway), pauses off-screen or in a
// hidden tab, and stays out of the way entirely when WebGL is missing or
// motion is reduced: the CSS wallpaper underneath is the fallback.

const VERT = `attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
uniform vec3 uBase;
uniform float uMix;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = uTime * 0.06;

  // warp the domain twice so the colour bands flow like silk
  vec2 q = vec2(fbm(p * 1.1 + vec2(0.0, t)), fbm(p * 1.1 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.3 + 2.0 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(p * 1.3 + 2.0 * q + vec2(8.3, 2.8) - t * 0.6));
  float f = fbm(p * 1.2 + 2.6 * r);

  // broad diagonal bands, bent by the noise
  float band = uv.x * 0.55 + (1.0 - uv.y) * 0.45 + (f - 0.5) * 0.95;
  band += sin(uv.x * 3.0 + r.x * 2.0 + uTime * 0.12) * 0.05;
  band = clamp(band, 0.0, 1.0) * 4.0;

  vec3 col = uC0;
  col = mix(col, uC1, smoothstep(0.0, 1.0, band));
  col = mix(col, uC2, smoothstep(1.0, 2.0, band));
  col = mix(col, uC3, smoothstep(2.0, 3.0, band));
  col = mix(col, uC4, smoothstep(3.0, 4.0, band));

  // soft silk highlights
  col += smoothstep(0.55, 0.9, fbm(p * 3.0 + r * 2.0 - t * 2.0)) * 0.1;
  col = mix(uBase, col, uMix);
  gl_FragColor = vec4(col, 1.0);
}`;

const RESOLUTION = 0.5;
const COLOR_VARS = ["--wp-d", "--wp-a", "--wp-b", "--wp-c", "--wp-e"] as const;

function parseColor(value: string): [number, number, number] {
	const hex = value.trim().replace("#", "");
	if (hex.length !== 6) return [0.5, 0.5, 0.5];
	const n = parseInt(hex, 16);
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

export function HeroGradient() {
	const [motionAllowed, setMotionAllowed] = useState(false);
	useEffect(() => {
		const media = matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setMotionAllowed(!media.matches);
		sync();
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas || !motionAllowed || typeof canvas.getContext !== "function")
			return;
		const reduced = matchMedia("(prefers-reduced-motion: reduce)");
		if (reduced.matches) return;

		const gl = (() => {
			try {
				return canvas.getContext("webgl", { antialias: false, alpha: false });
			} catch {
				return null;
			}
		})();
		if (!gl) return;

		const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
		const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG);
		const program = gl.createProgram();
		if (!vertex || !fragment || !program) return;
		gl.attachShader(program, vertex);
		gl.attachShader(program, fragment);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
		// biome-ignore lint/correctness/useHookAtTopLevel: WebGL useProgram is a graphics API, not a React hook.
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW,
		);
		const position = gl.getAttribLocation(program, "p");
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const uniform = (name: string) => gl.getUniformLocation(program, name);
		const uRes = uniform("uRes");
		const uTime = uniform("uTime");
		const uBase = uniform("uBase");
		const uMix = uniform("uMix");
		const uColors = COLOR_VARS.map((_, index) => uniform(`uC${index}`));

		const readTheme = () => {
			const style = getComputedStyle(canvas);
			COLOR_VARS.forEach((name, index) => {
				const [r, g, b] = parseColor(style.getPropertyValue(name));
				gl.uniform3f(uColors[index], r, g, b);
			});
			const [r, g, b] = parseColor(style.getPropertyValue("--wp-base"));
			gl.uniform3f(uBase, r, g, b);
			gl.uniform1f(
				uMix,
				parseFloat(style.getPropertyValue("--wp-mix")) || 0.85,
			);
		};

		const resize = () => {
			const width = Math.max(2, Math.round(canvas.clientWidth * RESOLUTION));
			const height = Math.max(2, Math.round(canvas.clientHeight * RESOLUTION));
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
			}
			gl.viewport(0, 0, width, height);
			gl.uniform2f(uRes, width, height);
		};

		const start = performance.now();
		let frame = 0;
		let running = false;
		let onScreen = true;

		const draw = (now: number) => {
			gl.uniform1f(uTime, (now - start) / 1000 + 14);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			canvas.classList.add("is-live");
		};
		let lastDraw = 0;
		const loop = (now: number) => {
			if (now - lastDraw >= 1000 / 30) {
				draw(now);
				lastDraw = now;
			}
			frame = requestAnimationFrame(loop);
		};
		const sync = () => {
			const shouldRun = onScreen && !document.hidden && !reduced.matches;
			if (shouldRun && !running) {
				running = true;
				frame = requestAnimationFrame(loop);
			} else if (!shouldRun && running) {
				running = false;
				cancelAnimationFrame(frame);
			}
		};

		readTheme();
		resize();
		draw(performance.now());

		const resizeObserver = new ResizeObserver(() => {
			resize();
			if (!running) draw(performance.now());
		});
		resizeObserver.observe(canvas);
		const visibility = new IntersectionObserver((entries) => {
			onScreen = entries[entries.length - 1]?.isIntersecting ?? true;
			sync();
		});
		visibility.observe(canvas);
		document.addEventListener("visibilitychange", sync);
		reduced.addEventListener("change", sync);
		const theme = new MutationObserver(() => {
			readTheme();
			if (!running) draw(performance.now());
		});
		theme.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		sync();

		return () => {
			running = false;
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			visibility.disconnect();
			theme.disconnect();
			document.removeEventListener("visibilitychange", sync);
			reduced.removeEventListener("change", sync);
			gl.deleteBuffer(buffer);
			gl.deleteProgram(program);
			gl.deleteShader(vertex);
			gl.deleteShader(fragment);
			canvas.classList.remove("is-live");
		};
	}, [motionAllowed]);

	return (
		<canvas
			ref={ref}
			className="hero-gradient"
			tabIndex={-1}
			aria-hidden="true"
		/>
	);
}
