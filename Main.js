/* main.js
 - Panel de bienvenida con typing y animación de formas
 - Fondo con partículas en canvas
 - Tema día/noche persistente (localStorage)
 - Render dinámico de proyectos, búsqueda y filtrado por tag
 - Modal de proyecto y formulario de contacto (simulado)
*/

document.addEventListener('DOMContentLoaded', () => {
            /* ---------------------------
               Configuración de proyectos
               --------------------------- */
            const projects = [{
                    id: 'p1',
                    title: 'Landing Interactiva',
                    short: 'Landing avanzada con animaciones y accesibilidad',
                    description: 'Landing moderna con microinteracciones, animaciones suaves y foco en rendimiento. Construida con HTML, CSS y JavaScript puro.',
                    tags: ['HTML', 'CSS', 'JavaScript'],
                    thumbnailText: 'Landing',
                    liveUrl: '#',
                    repoUrl: '#'
                },
                {
                    id: 'p2',
                    title: 'E-Commerce UI',
                    short: 'Prototipo de tienda con carrito y filtros',
                    description: 'Mockup de tienda con lógica de carrito, filtros por categorías y diseño responsive.',
                    tags: ['UI', 'JavaScript'],
                    thumbnailText: 'E-Commerce',
                    liveUrl: '#',
                    repoUrl: '#'
                },
                {
                    id: 'p3',
                    title: 'Dashboard Analítico',
                    short: 'Panel con widgets y gráficos',
                    description: 'Dashboard con componentes reutilizables y layout escalable, pensado para mostrar métricas en tiempo real.',
                    tags: ['HTML', 'CSS'],
                    thumbnailText: 'Dashboard',
                    liveUrl: '#',
                    repoUrl: '#'
                }
            ];

            /* ---------------------------
               Elementos DOM
               --------------------------- */
            const welcome = document.getElementById('welcomePanel');
            const enterBtn = document.getElementById('enterBtn');
            const skipBtn = document.getElementById('skipBtn');
            const typedLine = document.getElementById('typedLine');
            const themeToggle = document.getElementById('themeToggle');
            const themeToggleWelcome = document.getElementById('themeToggleWelcome');
            const yearEl = document.getElementById('year');
            const projectsGrid = document.getElementById('projectsGrid');
            const searchInput = document.getElementById('searchProject');
            const filterTag = document.getElementById('filterTag');
            const projectModal = document.getElementById('projectModal');
            const modalClose = document.getElementById('modalClose');
            const modalTitle = document.getElementById('modalTitle');
            const modalDesc = document.getElementById('modalDesc');
            const modalTags = document.getElementById('modalTags');
            const modalLive = document.getElementById('modalLive');
            const modalRepo = document.getElementById('modalRepo');
            const contactForm = document.getElementById('contactForm');
            const formStatus = document.getElementById('formStatus');

            /* ---------------------------
               Tema día/noche (persistencia)
               --------------------------- */
            const THEME_KEY = 'miguel_theme';

            function applyTheme(theme) {
                if (theme === 'light') document.body.classList.add('theme-light');
                else document.body.classList.remove('theme-light');
                // Sincronizar toggles
                themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
                themeToggleWelcome.checked = theme === 'light';
            }

            function getStoredTheme() { return localStorage.getItem(THEME_KEY) || 'dark'; }

            applyTheme(getStoredTheme());
            themeToggle.addEventListener('click', () => {
                const newTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
                localStorage.setItem(THEME_KEY, newTheme);
                applyTheme(newTheme);
            });
            themeToggleWelcome.addEventListener('change', () => {
                const newTheme = themeToggleWelcome.checked ? 'light' : 'dark';
                localStorage.setItem(THEME_KEY, newTheme);
                applyTheme(newTheme);
            });

            /* ---------------------------
               Panel de bienvenida
               --------------------------- */
            const typingPhrases = [
                'Desarrollador Web — HTML • CSS • JavaScript',
                'Disponible para proyectos freelance y empleo',
                'Hagamos tu próxima web'
            ];
            let typingIndex = 0;
            let typingTimer;

            function typeLoop(el, phrases, index = 0) {
                let i = 0,
                    forward = true,
                    loopText = '';
                const speed = 40;
                const pause = 1200;

                function step() {
                    const phrase = phrases[index];
                    if (forward) {
                        loopText = phrase.slice(0, ++i);
                        el.textContent = loopText;
                        if (i === phrase.length) { forward = false;
                            setTimeout(step, pause); return; }
                    } else {
                        loopText = phrase.slice(0, --i);
                        el.textContent = loopText;
                        if (i === 0) { forward = true;
                            index = (index + 1) % phrases.length;
                            setTimeout(step, 220); return; }
                    }
                    typingTimer = setTimeout(step, speed);
                }
                step();
                return () => clearTimeout(typingTimer);
            }

            // Inicia typing
            const stopTyping = typeLoop(typedLine, typingPhrases, 0);

            // Mostrar panel solo si no existe preferencia "skipWelcome"
            if (localStorage.getItem('skipWelcome') === 'true') {
                welcome.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                welcome.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }

            enterBtn.addEventListener('click', () => {
                welcome.style.display = 'none';
                document.body.style.overflow = '';
                localStorage.setItem('skipWelcome', 'true');
                stopTyping();
            });
            skipBtn.addEventListener('click', () => {
                welcome.style.display = 'none';
                document.body.style.overflow = '';
                stopTyping();
            });

            /* ---------------------------
               Canvas - partículas de fondo
               --------------------------- */
            const canvas = document.getElementById('bgCanvas');
            const ctx = canvas.getContext('2d');
            let w = canvas.width = innerWidth;
            let h = canvas.height = innerHeight;
            const particles = [];
            const PARTICLE_COUNT = Math.max(30, Math.floor((w * h) / 80000));

            window.addEventListener('resize', () => {
                w = canvas.width = innerWidth;
                h = canvas.height = innerHeight;
            });

            function rand(min, max) { return Math.random() * (max - min) + min; }

            function createParticles() {
                particles.length = 0;
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    particles.push({
                        x: rand(0, w),
                        y: rand(0, h),
                        r: rand(0.8, 2.4),
                        vx: rand(-0.2, 0.2),
                        vy: rand(-0.15, 0.15),
                        hue: rand(180, 260),
                        life: rand(80, 200)
                    });
                }
            }

            function draw() {
                ctx.clearRect(0, 0, w, h);
                // sutil overlay de gradiente
                const g = ctx.createLinearGradient(0, 0, w, h);
                g.addColorStop(0, 'rgba(124,92,255,0.03)');
                g.addColorStop(1, 'rgba(0,212,255,0.02)');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    if (p.x < -10) p.x = w + 10;
                    if (p.x > w + 10) p.x = -10;
                    if (p.y < -10) p.y = h + 10;
                    if (p.y > h + 10) p.y = -10;
                    if (p.life <= 0) {
                        p.x = rand(0, w);
                        p.y = rand(0, h);
                        p.life = rand(80, 200);
                    }
                    ctx.beginPath();
                    const alpha = 0.08 + (p.r / 3) * 0.04;
                    ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha})`;
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                });

                // líneas entre partículas cercanas (sutil)
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const a = particles[i];
                        const b = particles[j];
                        const dx = a.x - b.x,
                            dy = a.y - b.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(124,92,255,${Math.max(0,0.018 - d*0.00012)})`;
                            ctx.lineWidth = 1;
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }

                requestAnimationFrame(draw);
            }

            createParticles();
            requestAnimationFrame(draw);

            /* ---------------------------
               Render de proyectos y filtrado
               --------------------------- */
            function uniqueTags(list) {
                const s = new Set();
                list.forEach(p => p.tags.forEach(t => s.add(t)));
                return Array.from(s).sort();
            }

            function populateFilterTags() {
                const tags = uniqueTags(projects);
                filterTag.innerHTML = `<option value="">Todos</option>` + tags.map(t => `<option value="${t}">${t}</option>`).join('');
            }

            function escapeHtml(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

            function renderProjects(list) {
                projectsGrid.innerHTML = '';
                if (list.length === 0) {
                    projectsGrid.innerHTML = '<p class="muted">No se encontraron proyectos.</p>';
                    return;
                }
                list.forEach(p => {
                            const card = document.createElement('article');
                            card.className = 'project-card';
                            card.tabIndex = 0;
                            card.setAttribute('role', 'button');
                            card.innerHTML = `
        <div class="project-thumbnail">${escapeHtml(p.thumbnailText)}</div>
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.short)}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') openModal(p); });
      projectsGrid.appendChild(card);
    });
  }

  function filterProjects(q, tag){
    q = (q||'').trim().toLowerCase();
    return projects.filter(p => {
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.short.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
      const matchesTag = !tag || p.tags.includes(tag);
      return matchesQ && matchesTag;
    });
  }

  searchInput.addEventListener('input', () => {
    renderProjects(filterProjects(searchInput.value, filterTag.value));
  });
  filterTag.addEventListener('change', () => {
    renderProjects(filterProjects(searchInput.value, filterTag.value));
  });

  populateFilterTags();
  renderProjects(projects);

  /* ---------------------------
     Modal de proyecto
     --------------------------- */
  function openModal(proj){
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.description;
    modalTags.innerHTML = proj.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('');
    modalLive.href = proj.liveUrl || '#';
    modalRepo.href = proj.repoUrl || '#';
    projectModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    projectModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => { if(e.target === projectModal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  /* ---------------------------
     Formulario de contacto (simulado)
     --------------------------- */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if(!name || !email || !message){
      formStatus.textContent = 'Por favor completa todos los campos.';
      return;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
      formStatus.textContent = 'Ingresa un correo válido.';
      return;
    }
    formStatus.textContent = 'Enviando...';
    setTimeout(() => {
      formStatus.textContent = 'Mensaje enviado (simulado). Te responderé pronto.';
      contactForm.reset();
    }, 900);
  });

  /* ---------------------------
     Pequeñas utilidades UI
     --------------------------- */
  yearEl.textContent = new Date().getFullYear();

  // Menu para pantallas pequeñas
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    if(getComputedStyle(navLinks).display === 'flex') navLinks.style.display = '';
    else navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.gap = '.5rem';
  });

  /* ---------------------------
     Mejora de accesibilidad:
     - Evitar que el panel capture foco al cerrarse
     --------------------------- */
  enterBtn.addEventListener('keydown', (e) => { if(e.key === 'Enter') enterBtn.click(); });

  /* ---------------------------
     Fin
     --------------------------- */
});