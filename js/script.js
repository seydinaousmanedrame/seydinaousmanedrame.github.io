// ===== Portfolio — Seydina Ousmane Dramé =====
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Menu mobile ---
  const burger = $('#burger');
  const navLinks = $('#navLinks');
  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('#navLinks a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // --- Thème clair / sombre ---
  const root = document.documentElement;
  $('#themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // --- Navbar au scroll + barre de progression ---
  const navbar = $('#navbar');
  const progress = $('#scrollProgress');
  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Lien actif dans le menu ---
  const sections = $$('main section[id]');
  const linkFor = id => $(`#navLinks a[href="#${id}"]`);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = linkFor(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        $$('#navLinks a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // --- Apparition au scroll ---
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealObs.observe(el);
  });

  // --- Compteurs ---
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      if (reduceMotion) { el.textContent = target; return; }
      const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countObs.observe(el));

  // --- Texte qui s'écrit ---
  const typed = $('#typed');
  const words = ['Mobile Flutter', 'Web PHP', 'Desktop C# / .NET', 'd\'apps de gestion'];
  if (typed && !reduceMotion) {
    let w = 0, c = words[0].length, deleting = true;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 45 : 85;
      if (!deleting && c === word.length) { deleting = true; delay = 1800; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  // --- Formulaire de contact (ouvre la messagerie) ---
  const form = $('#contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    ['name', 'email', 'message'].forEach(id => {
      const field = form.elements[id];
      const valid = field.value.trim() !== '' && field.checkValidity();
      field.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    const note = $('#formNote');
    if (!ok) { note.textContent = 'Merci de remplir correctement tous les champs.'; return; }
    const { name, email, subject, message } = form.elements;
    const body = `${message.value}\n\n— ${name.value} (${email.value})`;
    window.location.href = `mailto:seydinaousmanedrame1999@gmail.com?subject=${encodeURIComponent(subject.value + ' — ' + name.value)}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Votre messagerie va s\'ouvrir avec le message pré-rempli. Merci !';
  });

  // --- Année du footer ---
  $('#year').textContent = new Date().getFullYear();
})();
