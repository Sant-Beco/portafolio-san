// ==================== ANIMACIONES ARTESANALES ====================

// ========== 1. CÓDIGO BINARIO CAYENDO (Matrix Style) - Fondo "Sobre Mí" ==========
function createBinaryRain() {
  const binaryContainer = document.querySelector('.binary-rain');
  if (!binaryContainer) return;

  const message = "Sanweb artesano de código mejorando cada día";
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

  // Mostrar mensaje oculto ocasionalmente
  setInterval(() => {
    const randomColumn = binaryContainer.children[Math.floor(Math.random() * columns)];
    if (randomColumn) {
      randomColumn.innerHTML = '';
      const words = binaryMessage.split(' ');
      words.forEach(binary => {
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

// ========== 2. ASCII ART ANIMADO - Título Hero ==========
function animateASCIITitle() {
  const titles = document.querySelectorAll('.ascii-animated');
  
  titles.forEach(title => {
    const text = title.getAttribute('data-text') || title.textContent;
    const asciiSteps = [
      text.split('').map(() => String.fromCharCode(33 + Math.floor(Math.random() * 94))).join(''),
      text.split('').map((char, i) => Math.random() > 0.5 ? char : String.fromCharCode(33 + Math.floor(Math.random() * 94))).join(''),
      text
    ];
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < asciiSteps.length) {
        title.textContent = asciiSteps[step];
        step++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });
}

// ========== 3. HILOS TEJIENDO NOMBRE - Logo Santiago ==========
function createThreadWeaving() {
  const canvas = document.getElementById('thread-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 60;
  
  const threads = [
    { x: 0, y: 20, color: '#ff6b6b', speed: 2 },
    { x: 0, y: 30, color: '#4ecdc4', speed: 1.5 },
    { x: 0, y: 40, color: '#00adb5', speed: 2.5 }
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
        const y = thread.y + Math.sin(x * 0.1 + index) * 5;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      if (thread.x < canvas.width) {
        thread.x += thread.speed;
      }
    });
    
    ctx.font = 'bold 24px Montserrat';
    ctx.fillStyle = 'rgba(0, 173, 181, 0.8)';
    const textWidth = ctx.measureText(targetText).width;
    const revealWidth = (progress / 100) * textWidth;
    
    ctx.save();
    ctx.beginPath();
    ctx.rect(10, 15, revealWidth, 30);
    ctx.clip();
    ctx.fillText(targetText, 10, 40);
    ctx.restore();
    
    progress += 0.5;
    if (progress > 100) progress = 100;
    
    requestAnimationFrame(drawThread);
  }
  
  drawThread();
}

// ========== 4. PARTÍCULAS FORMANDO "SANWEB" - Fondo Hero ==========
function createParticleText() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 400;
  
  const particles = [];
  const text = 'SANWEB';
  
  ctx.font = 'bold 80px Bebas Neue';
  ctx.fillStyle = '#00adb5';
  ctx.fillText(text, canvas.width / 2 - 150, 200);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < imageData.height; y += 4) {
    for (let x = 0; x < imageData.width; x += 4) {
      const index = (y * imageData.width + x) * 4;
      const alpha = imageData.data[index + 3];
      
      if (alpha > 128) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: x,
          targetY: y,
          size: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 60 + 160}, 70%, 50%)`
        });
      }
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += (particle.targetX - particle.x) * 0.05;
      particle.y += (particle.targetY - particle.y) * 0.05;
      
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
  });
}

// ========== 5. TELAR DE CÓDIGO - Todos los H2 ==========
function createCodeLoom() {
  const headings = document.querySelectorAll('.loom-title');
  
  headings.forEach(heading => {
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
    
    const horizontalThreads = document.createElement('div');
    horizontalThreads.className = 'horizontal-threads';
    
    for (let i = 0; i < 3; i++) {
      const thread = document.createElement('div');
      thread.className = 'horizontal-thread';
      thread.style.animationDelay = `${i * 0.5}s`;
      horizontalThreads.appendChild(thread);
    }
    
    heading.appendChild(horizontalThreads);
  });
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    createBinaryRain();
    animateASCIITitle();
    createThreadWeaving();
    createParticleText();
    createCodeLoom();
  }, 100);
});

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ========== MENÚ MÓVIL ==========
const menuBurger = document.querySelector('.menu-burger');
const navMenu = document.querySelector('.nav-menu');

menuBurger?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  menuBurger.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
    menuBurger?.classList.remove('active');
  });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});