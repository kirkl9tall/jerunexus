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
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uAspect: { value: width / height },
        uColor: { value: new THREE.Color(0x2563eb) },
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
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          float x = vUv.x * uAspect;
          // Scroll shifts the phase so the lines travel as you scroll.
          float t = uTime * 0.25 + uProgress * 4.0;
          float a = 0.0;
          for (int i = 0; i < 4; i++) {
            float fi = float(i);
            float base = 0.22 + fi * 0.18;
            float yc = base
              + 0.11 * sin(x * 1.5 + t + fi * 1.3)
              + 0.05 * sin(x * 3.3 - t * 1.2 + fi * 2.1);
            float d = abs(vUv.y - yc);
            a = max(a, smoothstep(0.018, 0.0, d));   // soft glowing line
          }
          gl_FragColor = vec4(uColor, a * 0.8);
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
