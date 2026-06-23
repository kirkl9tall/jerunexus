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

    // ── Shield body ──────────────────────────────────────────────────────────
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
      depth: 0.45, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.14, bevelSegments: 4, curveSegments: 32,
    });
    shieldGeo.center();
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.35, roughness: 0.35 });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);

    // ── Checkmark on the face ────────────────────────────────────────────────
    const check = new THREE.Shape();
    check.moveTo(-0.5, 0.05);
    check.lineTo(-0.2, -0.3);
    check.lineTo(0.5, 0.55);
    check.lineTo(0.32, 0.72);
    check.lineTo(-0.2, 0.04);
    check.lineTo(-0.34, 0.22);
    check.closePath();
    const checkGeo = new THREE.ExtrudeGeometry(check, { depth: 0.18, bevelEnabled: false, curveSegments: 8 });
    checkGeo.center();
    const checkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.5, emissive: 0x1e3a8a, emissiveIntensity: 0.15 });
    const checkMark = new THREE.Mesh(checkGeo, checkMat);
    checkMark.scale.setScalar(1.25);
    checkMark.position.set(0, 0.12, 0.42);

    const group = new THREE.Group();
    group.add(shield, checkMark);
    group.scale.setScalar(1.2);
    scene.add(group);

    // ── Lights ───────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x60a5fa, 0.8, 30);
    rim.position.set(-5, -2, 4);
    scene.add(rim);

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
      checkGeo.dispose(); checkMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} aria-hidden="true" />;
}
