/**
 * Provenetix AI — SuperAnnotate Exact Clone Interactive Script & Canvas Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticleCanvas();
});

/**
 * 1. SuperAnnotate Stippled Particle Canvas Background Animation
 */
function initHeroParticleCanvas() {
  const canvas = document.getElementById('heroParticleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Generate particle constellation
  const particles = [];
  const numParticles = 120;

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.3 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(242, 101, 34, 0.2)',
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw stippled background particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    // Draw faint connecting network lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.08 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/**
 * 2. Infra Tab Switcher
 */
function switchInfraTab(tabKey) {
  const btns = document.querySelectorAll('.infra-tab-btn');
  btns.forEach(b => b.classList.remove('active'));

  event.currentTarget.classList.add('active');
  showToast(`Loaded ${tabKey.toUpperCase()} Infrastructure Suite`);
}

/**
 * 3. Studio Tool Selection
 */
function selectStudioTool(toolKey) {
  const tools = document.querySelectorAll('.s-tool-btn');
  tools.forEach(t => t.classList.remove('active'));

  event.currentTarget.classList.add('active');

  const bbox = document.getElementById('activeBbox');
  if (bbox) {
    if (toolKey === 'sam') {
      bbox.style.borderColor = '#10b981';
      bbox.style.background = 'rgba(16, 185, 129, 0.2)';
      showToast("Activated SAM Zero-Shot Smart Segmenter");
    } else if (toolKey === 'polygon') {
      bbox.style.borderColor = '#8b5cf6';
      bbox.style.background = 'rgba(139, 92, 246, 0.2)';
      showToast("Activated Polygon Annotation Tool");
    } else {
      bbox.style.borderColor = '#ef4444';
      bbox.style.background = 'rgba(239, 68, 68, 0.15)';
      showToast(`Activated ${toolKey.toUpperCase()} Tool`);
    }
  }
}

/**
 * 4. Toast Notification
 */
let toastTimeout;
function showToast(msg) {
  const bar = document.getElementById('toastBar');
  const text = document.getElementById('toastBarText');

  if (!bar || !text) return;

  text.innerText = msg;
  bar.style.display = 'block';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    bar.style.display = 'none';
  }, 2800);
}
