"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight WebGL security shield that rotates as the section scrolls through
 * the viewport. Built procedurally (no model download). The render loop only
 * runs while the canvas is on screen, the pixel ratio is capped, and everything
 * is disposed on unmount, so the cost stays small. Honours prefers-reduced-motion.
 */
export default function ShieldScene({ getProgress }: Readonly<{ getProgress?: () => number }>) {
  const mountRef = useRef<HTMLDivElement>(null);
  const getProgressRef = useRef(getProgress);
  getProgressRef.current = getProgress;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = mount.clientWidth || 400;
    let height = mount.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const GLOW = 0x38bdf8; // electric cyan accent

    // ── Shield body (dark futuristic metal) ───────────────────────────────────
    const w = 1.45;
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.75);
    shape.lineTo(w, 1.55);
    shape.lineTo(w, 0.5);
    shape.quadraticCurveTo(w, -1.4, 0, -1.95);
    shape.quadraticCurveTo(-w, -1.4, -w, 0.5);
    shape.lineTo(-w, 1.55);
    shape.closePath();

    const shieldGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.42, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.12, bevelSegments: 4, curveSegments: 48,
    });
    shieldGeo.center();
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0x0b1220, metalness: 0.95, roughness: 0.22, emissive: 0x06283d, emissiveIntensity: 0.5 });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);

    // ── Holographic Fresnel rim glow (custom shader, additive) ────────────────
    const rimMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(GLOW) }, uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorld;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorld;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorld);
          float fres = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
          float pulse = 0.8 + 0.2 * sin(uTime * 2.2);
          gl_FragColor = vec4(uColor * fres * pulse, fres);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const rimGlow = new THREE.Mesh(shieldGeo, rimMat);

    // ── Glowing edge outline (tech lines) ─────────────────────────────────────
    const edgeGeo = new THREE.EdgesGeometry(shieldGeo, 35);
    const edgeMat = new THREE.LineBasicMaterial({ color: GLOW, transparent: true, opacity: 0.6 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);

    // ── Checkmark on the face (emissive glow) ─────────────────────────────────
    const check = new THREE.Shape();
    check.moveTo(-0.5, 0.05);
    check.lineTo(-0.2, -0.3);
    check.lineTo(0.5, 0.55);
    check.lineTo(0.32, 0.72);
    check.lineTo(-0.2, 0.04);
    check.lineTo(-0.34, 0.22);
    check.closePath();
    const checkGeo = new THREE.ExtrudeGeometry(check, { depth: 0.16, bevelEnabled: false, curveSegments: 8 });
    checkGeo.center();
    const checkMat = new THREE.MeshStandardMaterial({ color: 0x0b1220, metalness: 0.4, roughness: 0.3, emissive: GLOW, emissiveIntensity: 1.8 });
    const checkMark = new THREE.Mesh(checkGeo, checkMat);
    checkMark.scale.setScalar(1.25);
    checkMark.position.set(0, 0.12, 0.4);

    const group = new THREE.Group();
    group.add(shield, rimGlow, edges, checkMark);
    group.scale.setScalar(1.2);
    scene.add(group);

    // ── Lights ───────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x223044, 0.85));
    const key = new THREE.DirectionalLight(0xbfe3ff, 1.9);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.PointLight(GLOW, 1.4, 30);
    fill.position.set(-5, -2, 4);
    scene.add(fill);

    // ── Animation (scroll-driven) ─────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = false;

    const frame = () => {
      // Prefer an externally-supplied scroll progress (used when the stage is
      // pinned); otherwise derive it from the canvas position in the viewport.
      let progress: number;
      const ext = getProgressRef.current;
      if (ext) {
        progress = THREE.MathUtils.clamp(ext(), 0, 1);
      } else {
        const rect = mount.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        progress = THREE.MathUtils.clamp(1 - center / globalThis.innerHeight, 0, 1);
      }
      rimMat.uniforms.uTime.value = clock.getElapsedTime();
      if (reduceMotion) {
        group.position.x = 0;
        group.rotation.y = 0.35;
      } else {
        // Slide across the section while doing a half (semi) rotation.
        group.position.x = THREE.MathUtils.lerp(-3.6, 3.6, progress);
        group.rotation.y = THREE.MathUtils.lerp(-Math.PI / 2, Math.PI / 2, progress);
        group.rotation.x = -0.05 + Math.sin(clock.getElapsedTime() * 0.6) * 0.04; // gentle float
      }
      renderer.render(scene, camera);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    // Only render while on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) frame();
    }, { threshold: 0 });
    io.observe(mount);

    const onResize = () => {
      width = mount.clientWidth || width;
      height = mount.clientHeight || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    globalThis.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      globalThis.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      shieldGeo.dispose(); shieldMat.dispose();
      rimMat.dispose();
      edgeGeo.dispose(); edgeMat.dispose();
      checkGeo.dispose(); checkMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} aria-hidden="true" />;
}
