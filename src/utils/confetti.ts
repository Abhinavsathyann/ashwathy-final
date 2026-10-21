/**
 * Lightweight, self-terminating canvas confetti tailored to the project's palette.
 * Bounded particle count, zero external dependencies, no memory leaks.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  opacity: number;
  shape: 'rect' | 'circle';
}

const PALETTE = [
  '#D79AAF', // Dusty rose
  '#D6B77A', // Champagne gold
  '#71384F', // Deep berry
  '#F4DDE5', // Soft blush
  '#F9E6D7', // Soft peach
  '#E9E3F4', // Muted lavender
];

export function launchConfetti(originX?: number, originY?: number, count = 90) {
  if (typeof window === 'undefined') return;

  // Check reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const startX = originX ?? width / 2;
  const startY = originY ?? height * 0.6;

  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4, // initial upward kick
      size: 6 + Math.random() * 6,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 8,
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    });
  }

  let animationFrameId: number;
  const startTime = performance.now();

  function render(now: number) {
    const elapsed = now - startTime;
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;
    const gravity = 0.18;
    const drag = 0.985;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.rotation += p.vRot;

      // Start fading after 1.5 seconds
      if (elapsed > 1500) {
        p.opacity = Math.max(0, 1 - (elapsed - 1500) / 1500);
      }

      if (p.opacity > 0 && p.y < height + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    if (activeCount > 0 && elapsed < 3500) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  animationFrameId = requestAnimationFrame(render);
}
