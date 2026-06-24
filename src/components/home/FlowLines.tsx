"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lusion-style flowing lines rendered with a single full-screen fragment shader
 * (one quad — very light, no geometry rebuilds). The lines undulate over time and
 * shift with scroll progress, so "every scroll the line moves". Honours
 * prefers-reduced-motion, renders only while on screen, and disposes on unmount.
 */
export default function FlowLines({ getProgress }: Readonly<{ getProgress?: () => number }>) {
  const mountRef = useRef<HTMLDivElement>(null);
  const getProgressRef = useRef(getProgress);
  getProgressRef.current = getProgress;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = mount.clientWidth || 800;
    let height = mount.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uAspect: { value: width / height },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform float uProgress;
        uniform float uAspect;
        varying vec2 vUv;

        void main() {
          float x = vUv.x * uAspect;
          // Scroll shifts the phase so the lines travel as you scroll.
          float t = uTime * 0.45 + uProgress * 5.0;

          vec3 col = vec3(0.0);
          float a = 0.0;
          for (int i = 0; i < 6; i++) {
            float fi = float(i);
            float speed = 0.8 + fi * 0.14;
            float base = 0.15 + fi * 0.13;
            float yc = base
              + 0.10 * sin(x * 1.4 + t * speed + fi * 1.3)
              + 0.05 * sin(x * 3.1 - t * 1.3 + fi * 2.1)
              + 0.02 * sin(x * 6.0 + t * 2.0 + fi);
            float d = abs(vUv.y - yc);

            // Sharp bright core + softer glow halo.
            float core = smoothstep(0.0045, 0.0, d);
            float glow = smoothstep(0.035, 0.0, d) * 0.45;

            // Bright energy pulses travelling along the line — keeps it alive.
            float flow = 0.45 + 0.55 * sin(x * 2.6 - t * 3.2 + fi * 1.7);
            float inten = core + glow * flow;

            // Wood / copper palette: dark browns up to amber & orange-gold highlights.
            vec3 cDark  = vec3(0.290, 0.180, 0.110); // #4A2E1C dark brown
            vec3 cMid   = vec3(0.545, 0.353, 0.169); // #8B5A2B mid copper
            vec3 cAmber = vec3(0.784, 0.573, 0.290); // #C8924A amber/tan
            vec3 cGold  = vec3(0.831, 0.580, 0.227); // #D4943A orange-gold
            float m = 0.5 + 0.5 * sin(fi * 1.6 + x * 0.5 + t * 0.5);
            vec3 c = mix(cMid, cAmber, m);
            c = mix(c, cGold, 0.4 + 0.4 * sin(fi * 0.9 - t * 0.4 + x * 0.3));
            c = mix(cDark, c, 0.45 + 0.55 * smoothstep(0.2, 0.9, flow)); // ridges catch the light
            col += c * inten * 1.3;
            a = max(a, inten);
          }
          gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = false;

    const frame = () => {
      const ext = getProgressRef.current;
      const progress = ext ? THREE.MathUtils.clamp(ext(), 0, 1) : 0;
      material.uniforms.uProgress.value = progress;
      material.uniforms.uTime.value = reduceMotion ? 0 : clock.getElapsedTime();
      renderer.render(scene, camera);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) frame();
    }, { threshold: 0 });
    io.observe(mount);

    const onResize = () => {
      width = mount.clientWidth || width;
      height = mount.clientHeight || height;
      renderer.setSize(width, height);
      material.uniforms.uAspect.value = width / height;
    };
    globalThis.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      globalThis.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} aria-hidden="true" />;
}
