// ==================== ANIMACIONES ARTESANALES ====================

// ========== 1. CÓDIGO BINARIO CAYENDO ==========
function createBinaryRain() {
  const binaryContainer = document.querySelector('.binary-rain');
  if (!binaryContainer) return;

  const message = "Santiago Bedoya artesano de código backend python django fastapi";
  const binaryMessage = message.split('').map(char =>
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');

  const columns = Math.floor(binaryContainer.offsetWidth / 20);

  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.className = 'binary-column';
    column.style.left = `${i * 20}px`;
    column.style.animationDelay = `${Math.random() * 5}s`;
    column.style.animationDuration = `${10 + Math.random() * 10}s`;
    const digits = Math.floor(Math.random() * 20) + 10;
    for (let j = 0; j < digits; j++) {
      const digit = document.createElement('span');
      digit.textContent = Math.random() > 0.5 ? '1' : '0';
      digit.style.opacity = Math.random();
      column.appendChild(digit);
    }
    binaryContainer.appendChild(column);
  }

  setInterval(() => {
    const randomColumn = binaryContainer.children[Math.floor(Math.random() * columns)];
    if (randomColumn) {
      randomColumn.innerHTML = '';
      binaryMessage.split(' ').forEach(binary => {
        const span = document.createElement('span');
        span.textContent = binary;
        span.className = 'binary-highlight';
        randomColumn.appendChild(span);
      });
      setTimeout(() => {
        randomColumn.innerHTML = '';
        const digits = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < digits; j++) {
          const digit = document.createElement('span');
          digit.textContent = Math.random() > 0.5 ? '1' : '0';
          digit.style.opacity = Math.random();
          randomColumn.appendChild(digit);
        }
      }, 3000);
    }
  }, 8000);
}

// ========== 2. ASCII ART ANIMADO ==========
function animateASCIITitle() {
  const titles = document.querySelectorAll('.ascii-animated');
  titles.forEach(title => {
    const text = title.getAttribute('data-text') || title.textContent;
    title.style.fontFamily = '"Courier New", monospace';
    const asciiSteps = [
      text.split('').map(() => String.fromCharCode(33 + Math.floor(Math.random() * 94))).join(''),
      text.split('').map(char => Math.random() > 0.5 ? char : String.fromCharCode(33 + Math.floor(Math.random() * 94))).join(''),
      text
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < asciiSteps.length) {
        title.textContent = asciiSteps[step++];
      } else {
        clearInterval(interval);
        title.style.fontFamily = '';
      }
    }, 100);
  });
}

// ========== 3. HILOS TEJIENDO NOMBRE (colores Forge Master) ==========
function createThreadWeaving() {
  const canvas = document.getElementById('thread-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 60;

  // Paleta naranja-dorado Forge Master
  const threads = [
    { x: 0, y: 20, color: '#ff6b35', speed: 2   },
    { x: 0, y: 30, color: '#f7931e', speed: 1.5 },
    { x: 0, y: 40, color: '#ffd93d', speed: 2.5 }
  ];
  const targetText = 'SANTIAGO';
  let progress = 0;

  function drawThread() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    threads.forEach((thread, index) => {
      ctx.strokeStyle = thread.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, thread.y);
      for (let x = 0; x <= thread.x; x += 2) {
        ctx.lineTo(x, thread.y + Math.sin(x * 0.1 + index) * 5);
      }
      ctx.stroke();
      if (thread.x < canvas.width) thread.x += thread.speed;
    });

    ctx.font = 'bold 24px Montserrat';
    ctx.fillStyle = 'rgba(255, 107, 53, 0.9)';
    const textWidth = ctx.measureText(targetText).width;
    const revealWidth = (progress / 100) * textWidth;
    ctx.save();
    ctx.beginPath();
    ctx.rect(10, 15, revealWidth, 30);
    ctx.clip();
    ctx.fillText(targetText, 10, 40);
    ctx.restore();

    progress = Math.min(100, progress + 0.5);
    requestAnimationFrame(drawThread);
  }
  drawThread();
}

// ========== 4. PARTÍCULAS FORMANDO TÍTULO (tonos naranja-dorado) ==========
function createParticleTitle() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;
  let particles = [];

  function resizeCanvas() {
    canvas.width  = container.offsetWidth;
    canvas.height = container.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isMobile      = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    let fontSize;
    if      (isSmallMobile) fontSize = Math.min(canvas.width / 6,   28);
    else if (isMobile)      fontSize = Math.min(canvas.width / 6.5, 35);
    else                    fontSize = Math.min(canvas.width / 8,   80);

    ctx.font          = `bold ${fontSize}px Bebas Neue`;
    ctx.fillStyle     = '#ff6b35';   // color base naranja
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';

    const lines      = ['CONSTRUYENDO', 'SOLUCIONES', 'CON CÓDIGO'];
    const lineHeight = fontSize * 1.15;
    const startY     = (canvas.height - lineHeight * 2) / 2;
    lines.forEach((line, i) => ctx.fillText(line, canvas.width / 2, startY + i * lineHeight));

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sampling     = 3;
    const particleSize = isSmallMobile ? 1.0 : (isMobile ? 1.2 : 1);

    for (let y = 0; y < imageData.height; y += sampling) {
      for (let x = 0; x < imageData.width; x += sampling) {
        const alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
        if (alpha > 128) {
          // Rango de hue naranja-dorado: 15-45
          const hue        = 15  + Math.random() * 30;
          const saturation = isMobile ? 90 : 80;
          const lightness  = isMobile ? 60 : 50 + Math.random() * 15;
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: x, targetY: y,
            size:  (Math.random() * 1.5 + 0.8) * particleSize,
            color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
          });
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isMobile      = window.innerWidth <= 768;
    const glowMultiplier = isMobile ? 4 : 3;

    particles.forEach(p => {
      p.x += (p.targetX - p.x) * 0.05;
      p.y += (p.targetY - p.y) * 0.05;

      // Punto
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * glowMultiplier);
      g.addColorStop(0, p.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * glowMultiplier, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  animateParticles();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 250);
  });
}

// ========== 5. TELAR DE CÓDIGO ==========
function createCodeLoom() {
  document.querySelectorAll('.loom-title').forEach(heading => {
    const text = heading.getAttribute('data-text') || heading.textContent.trim();
    heading.innerHTML = '';
    heading.classList.add('loom-container');

    const loom = document.createElement('div');
    loom.className = 'loom-threads';
    for (let i = 0; i < text.length * 3; i++) {
      const thread = document.createElement('div');
      thread.className = 'vertical-thread';
      thread.style.left = `${(i / (text.length * 3)) * 100}%`;
      thread.style.animationDelay = `${i * 0.1}s`;
      loom.appendChild(thread);
    }
    heading.appendChild(loom);

    const textContainer = document.createElement('div');
    textContainer.className = 'loom-text';
    text.split('').forEach((char, index) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'woven-char';
      charSpan.textContent = char;
      charSpan.style.animationDelay = `${index * 0.1}s`;
      textContainer.appendChild(charSpan);
    });
    heading.appendChild(textContainer);

    const hThreads = document.createElement('div');
    hThreads.className = 'horizontal-threads';
    for (let i = 0; i < 3; i++) {
      const t = document.createElement('div');
      t.className = 'horizontal-thread';
      t.style.animationDelay = `${i * 0.5}s`;
      hThreads.appendChild(t);
    }
    heading.appendChild(hThreads);
  });
}

// ========== 6. PROYECTOS: FILTROS + ENTRADA ANIMADA ==========
function initProyectos() {
  const btns  = document.querySelectorAll('.pf-btn');
  const cards = document.querySelectorAll('.proyecto-card');
  const grid  = document.getElementById('proyectos-grid');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      let firstVisible = true;
      cards.forEach(card => {
        const match = f === 'all' || card.dataset.cat === f;
        card.style.display = match ? '' : 'none';
        card.classList.remove('proyecto-featured');
        if (match && firstVisible) { card.classList.add('proyecto-featured'); firstVisible = false; }
      });

      grid.style.gridTemplateColumns = f === 'all'
        ? '1.6fr 1fr 1fr'
        : 'repeat(auto-fit, minmax(300px, 1fr))';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
}

// ========== 7. CTA FLOTANTE ==========
function initFloatingCTA() {
  const cta = document.querySelector('.floating-cta');
  if (!cta) return;
  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.pageYOffset > 500);
  });
  cta.querySelector('.floating-cta-btn')?.addEventListener('click', () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ========== 8. CONTADOR ANIMADO ==========
function initCounterAnimation() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const animateCounter = (el, target) => {
    const increment = target / (2000 / 16);
    let current = 0;
    const tick = () => {
      current += increment;
      if (current < target) {
        el.textContent = el.dataset.type === 'percent' ? Math.floor(current) + '%'
                       : el.dataset.type === 'plus'    ? '+' + Math.floor(current)
                       : Math.floor(current);
        requestAnimationFrame(tick);
      } else {
        el.textContent = el.dataset.type === 'percent' ? target + '%'
                       : el.dataset.type === 'plus'    ? '+' + target
                       : target;
      }
    };
    tick();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.closest('.stat-item')?.classList.add('visible');
        setTimeout(() => animateCounter(el, parseInt(el.dataset.target)), 200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}

// ========== 9. SCROLL REVEAL ==========
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== 10. TESTIMONIOS ==========
function initTestimonios() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.testimonio-card').forEach(c => observer.observe(c));
}

// ========== 11. AVATAR — carga real de imagen ==========
function initAvatar() {
  const avatar = document.querySelector('.hero-avatar');
  if (!avatar) return;
  const show = () => avatar.classList.add('loaded');
  if (avatar.complete && avatar.naturalWidth) {
    show();
  } else {
    avatar.addEventListener('load',  show);
    avatar.addEventListener('error', show);   // mostrar aunque falle
    setTimeout(show, 800);                    // fallback de seguridad
  }
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    createBinaryRain();
    animateASCIITitle();
    createThreadWeaving();
    createParticleTitle();
    createCodeLoom();
    initProyectos();
    initFloatingCTA();
    initCounterAnimation();
    initScrollReveal();
    initTestimonios();
    initAvatar();
  }, 100);
});

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme  = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ========== MENÚ MÓVIL ==========
const menuBurger = document.querySelector('.menu-burger');
const navMenu    = document.querySelector('.nav-menu');

menuBurger?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  menuBurger.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link =>
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
    menuBurger?.classList.remove('active');
  })
);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor =>
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  })
);