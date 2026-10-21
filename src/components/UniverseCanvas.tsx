import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * UniverseCanvas: Ultra-premium 3D Celestial Stardust & Luminous Depth Canvas
 * Built with Three.js r160+ best practices:
 * - isSoftwareGl detection & resource guard
 * - SRGBColorSpace & ACESFilmicToneMapping
 * - Zero GC in animation loop (pre-allocated vectors)
 * - Window scroll & mouse parallax with exponential damping
 * - Full memory disposal on unmount
 * - Non-blocking pointer-events-none layer
 */
export const UniverseCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL renderer (SwiftShader, llvmpipe, softpipe, etc.)
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Three.js Scene, Camera, and Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });

    const isMobile = window.innerWidth < 768;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(isSoftwareGl || isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent so the page's ivory/blush shows through

    container.appendChild(renderer.domElement);

    // 3. Generate Procedural Glow Star Texture (100% zero external file dependencies)
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(244, 221, 229, 0.9)'); // Blush
        gradient.addColorStop(0.5, 'rgba(215, 154, 175, 0.45)'); // Rose
        gradient.addColorStop(0.8, 'rgba(214, 183, 122, 0.2)'); // Gold
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // 4. Particle Constellation 1: Luminous Floating Stardust
    const starCount = isSoftwareGl ? 120 : (isMobile ? 220 : 420);
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const scales = new Float32Array(starCount);

    // Palette: Gold (#D6B77A), Rose (#D79AAF), Blush (#F4DDE5), Berry (#71384F), Lavender (#E9E3F4)
    const palette = [
      new THREE.Color(0xd6b77a), // Gold
      new THREE.Color(0xd79aaf), // Rose
      new THREE.Color(0xf4dde5), // Blush
      new THREE.Color(0xe9e3f4), // Lavender
      new THREE.Color(0x71384f), // Deep Berry
      new THREE.Color(0xffffff), // Pure star
    ];

    for (let i = 0; i < starCount; i++) {
      // Cylindrical/spherical volume dispersion around view
      const radius = 25 + Math.random() * 95;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 160;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius - 30;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 1.5 + 0.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5. Celestial Ring / Orbital Ribbons (Dreamy floating cosmic rings)
    const ringGroup = new THREE.Group();
    const ringRadius = 42;
    const ringTube = 0.35;
    const ringGeometry = new THREE.TorusGeometry(ringRadius, ringTube, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd6b77a,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const orbitalRing = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitalRing.rotation.x = Math.PI / 3;
    ringGroup.add(orbitalRing);

    const innerRingGeo = new THREE.TorusGeometry(ringRadius * 0.72, 0.25, 12, 80);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xd79aaf,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2.4;
    innerRing.rotation.y = Math.PI / 6;
    ringGroup.add(innerRing);

    // Position orbital rings slightly in the background
    ringGroup.position.set(0, 0, -25);
    scene.add(ringGroup);

    // 6. Pre-allocated Math Helpers for Zero GC per frame
    const mouseTarget = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let scrollProgress = 0;

    // Event Handlers: Mouse tracking with normalization
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    // Event Handlers: Scroll tracking without layout thrashing
    const handleScroll = () => {
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    // Event Handlers: Resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Exponential Damping
    let frameId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (document.hidden) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isReduced) {
        // Smooth mouse damping
        currentMouse.x = THREE.MathUtils.damp(currentMouse.x, mouseTarget.x, 2.5, delta);
        currentMouse.y = THREE.MathUtils.damp(currentMouse.y, mouseTarget.y, 2.5, delta);

        // Slow celestial rotation
        starField.rotation.y += delta * 0.04;
        starField.rotation.x = currentMouse.y * 0.12 - scrollProgress * 0.8;
        starField.rotation.z = currentMouse.x * 0.08;

        // Subtle camera parallax
        camera.position.x = currentMouse.x * 4.5;
        camera.position.y = currentMouse.y * 3.5 + Math.sin(now * 0.0006) * 1.5;
        camera.position.z = 85 - scrollProgress * 15;

        // Gentle ring orbit
        ringGroup.rotation.z += delta * 0.03;
        ringGroup.rotation.y += delta * 0.02;
        ringGroup.position.y = -scrollProgress * 40;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // 8. Cleanup & Resource Disposal
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries
      starGeometry.dispose();
      ringGeometry.dispose();
      innerRingGeo.dispose();

      // Dispose materials
      starMaterial.dispose();
      ringMaterial.dispose();
      innerRingMat.dispose();

      // Dispose textures
      glowTexture.dispose();

      // Dispose renderer
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReduced]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
