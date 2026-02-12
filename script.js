// ==================== THEME TOGGLE ====================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Animación del botón
  themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg) scale(1)';
  }, 300);
});

// ==================== MOBILE MENU ====================
const menuBurger = document.querySelector('.menu-burger');
const navMenu = document.querySelector('.nav-menu');

menuBurger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuBurger.classList.toggle('active');
  
  // Animar hamburguesa
  const spans = menuBurger.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translateY(8px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = menuBurger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== NAVBAR SCROLL ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = `${getComputedStyle(document.documentElement).getPropertyValue('--bg-primary')}ee`;
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animar elementos al scroll
document.querySelectorAll('.valor-card, .proyecto-card, .timeline-item, .tool-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ==================== DOWNLOAD CV ====================
const downloadBtn = document.getElementById('download-cv');

downloadBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  // Mostrar feedback
  const originalText = downloadBtn.textContent;
  downloadBtn.textContent = 'Generando CV...';
  downloadBtn.style.pointerEvents = 'none';
  
  try {
    // Simular descarga (aquí conectarías con un PDF real)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Crear PDF básico con jsPDF (necesitarías incluir la librería)
    // Por ahora, mostrar mensaje
    downloadBtn.textContent = '✓ ¡Descargado!';
    
    setTimeout(() => {
      downloadBtn.textContent = originalText;
      downloadBtn.style.pointerEvents = 'auto';
    }, 2000);
    
    // Aquí iría la lógica real de descarga
    console.log('Descargando CV...');
    
  } catch (error) {
    downloadBtn.textContent = '✗ Error';
    setTimeout(() => {
      downloadBtn.textContent = originalText;
      downloadBtn.style.pointerEvents = 'auto';
    }, 2000);
  }
});

// ==================== ANIMACIONES DE HERRAMIENTAS ====================
const toolItems = document.querySelectorAll('.tool-item');

toolItems.forEach(tool => {
  tool.addEventListener('mouseenter', () => {
    const emoji = tool.querySelector('.tool-emoji');
    emoji.style.transform = 'scale(1.3) rotate(10deg)';
    emoji.style.transition = 'transform 0.3s ease';
  });
  
  tool.addEventListener('mouseleave', () => {
    const emoji = tool.querySelector('.tool-emoji');
    emoji.style.transform = 'scale(1) rotate(0deg)';
  });
});

// ==================== CONTADOR DE SKILLS ====================
let hasAnimated = false;

const animateSkills = () => {
  if (hasAnimated) return;
  
  const skillsSection = document.querySelector('.herramientas');
  const rect = skillsSection.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    hasAnimated = true;
    
    document.querySelectorAll('.tool-fill').forEach(fill => {
      fill.style.animation = 'fillBar 1.5s ease forwards';
    });
  }
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Verificar al cargar

// ==================== FORMULARIO CONTACTO ====================
const contactForm = document.querySelector('.contacto-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // El formulario se enviará normalmente a Formspree
    // Esto solo muestra feedback visual
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  });
}

// ==================== PARALLAX SUAVE ====================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const gears = document.querySelectorAll('.gear');
  
  gears.forEach((gear, index) => {
    const speed = (index + 1) * 0.5;
    gear.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.5}deg)`;
  });
});

// ==================== EASTER EGG ====================
let clickCount = 0;
const logoIcon = document.querySelector('.logo-icon');

logoIcon.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount === 5) {
    logoIcon.style.animation = 'swing 0.5s ease-in-out 3';
    console.log('🔨 ¡Artesano mode activated!');
    
    // Agregar efecto temporal
    document.body.style.animation = 'hueRotate 2s linear';
    
    setTimeout(() => {
      clickCount = 0;
      document.body.style.animation = 'none';
    }, 2000);
  }
});

// Keyframes para el easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes hueRotate {
    from { filter: hue-rotate(0deg); }
    to { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ==================== PERFORMANCE ====================
// Lazy loading para imágenes
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback para navegadores antiguos
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

console.log('%c🔨 Portafolio de Santiago - Artesano de Código', 'font-size: 20px; font-weight: bold; color: #00adb5;');
console.log('%c¿Interesado en el código? ¡Contáctame!', 'font-size: 14px; color: #666;');