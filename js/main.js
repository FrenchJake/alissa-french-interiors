/* =============================================================
   ALISSA FRENCH INTERIORS — main.js
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================================================
     1. HEADER — FADE ON SCROLL (index only)
     Inner pages have a static always-visible header (.inner-header)
     so we skip the fade logic for them.
  =========================================================== */
  const header   = document.getElementById('site-header');
  const isInner  = document.body.classList.contains('inner-page');

  if (header && !isInner) {
    function updateHeader() {
      const scrollY   = window.scrollY;
      const fadeStart = 80;

      header.style.opacity = '1';
      header.classList.toggle('scrolled', scrollY > fadeStart);
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }


  /* ===========================================================
     2. HAMBURGER / NAV DRAWER
  =========================================================== */
  const hamburger  = document.getElementById('hamburger');
  const navDrawer  = document.getElementById('nav-drawer');
  const navOverlay = document.getElementById('nav-overlay');

  function openNav() {
    hamburger?.classList.add('is-open');
    hamburger?.setAttribute('aria-expanded', 'true');
    navDrawer?.classList.add('is-open');
    navDrawer?.setAttribute('aria-hidden', 'false');
    navOverlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    hamburger?.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    navDrawer?.classList.remove('is-open');
    navDrawer?.setAttribute('aria-hidden', 'true');
    navOverlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () =>
    hamburger.classList.contains('is-open') ? closeNav() : openNav()
  );
  navOverlay?.addEventListener('click', closeNav);
  navDrawer?.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });


  /* ===========================================================
     3. SLIDESHOW — cinematic crossfade with Ken Burns + progress bar
  =========================================================== */
  const slides    = Array.from(document.querySelectorAll('.slide'));
  const dots      = Array.from(document.querySelectorAll('.dot'));
  const prevBtn   = document.getElementById('slide-prev');
  const nextBtn   = document.getElementById('slide-next');
  const progressBar = document.getElementById('slide-progress');

  if (slides.length) {
    let current  = 0;
    let timer    = null;
    const INTERVAL = 6000;   // ms between auto-advances
    const FADE_MS  = 1400;   // must match CSS transition duration

    /* Reset Ken Burns on a slide so re-activating replays the animation */
    function resetAnimation(slide) {
      const img = slide.querySelector('img');
      if (!img) return;
      img.style.animation = 'none';
      // Force reflow so the browser registers the removal
      void img.offsetWidth;
      img.style.animation = '';
    }

    /* Advance progress bar */
    function startProgress() {
      if (!progressBar) return;
      progressBar.classList.remove('running');
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      // Tiny delay lets the browser reset before starting the transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressBar.classList.add('running');
        });
      });
    }

    function stopProgress() {
      if (!progressBar) return;
      progressBar.classList.remove('running');
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }

    function goTo(idx) {
      if (slides.length < 2) return;
      idx = (idx + slides.length) % slides.length;
      if (idx === current) return;

      // Outgoing slide — fade to 0
      slides[current].classList.remove('is-active');
      dots[current]?.classList.remove('is-active');

      // Incoming slide — reset Ken Burns animation, then activate
      current = idx;
      resetAnimation(slides[current]);
      slides[current].classList.add('is-active');
      dots[current]?.classList.add('is-active');

      startProgress();
    }

    function startAuto() {
      stopAuto();
      startProgress();
      timer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
      stopProgress();
    }

    prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => {
      stopAuto(); goTo(+d.dataset.index); startAuto();
    }));

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
      if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
    });

    // Touch / swipe
    let touchX = 0;
    const ss = document.getElementById('slideshow');
    ss?.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, { passive: true });
    ss?.addEventListener('touchend', e => {
      const delta = touchX - e.changedTouches[0].screenX;
      if (Math.abs(delta) > 44) { stopAuto(); delta > 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
    }, { passive: true });

    // Pause on hover (desktop only)
    ss?.addEventListener('mouseenter', stopAuto);
    ss?.addEventListener('mouseleave', startAuto);

    // Kick off
    resetAnimation(slides[0]);
    startAuto();
  }


  /* ===========================================================
     4. GALLERY FILTER (index page)
  =========================================================== */
  const gfilterBtns = document.querySelectorAll('.gfilter-btn');
  const gTiles      = document.querySelectorAll('.g-tile[data-category]');

  gfilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gfilterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      gTiles.forEach(tile => {
        const show = f === 'all' || tile.dataset.category === f;
        tile.classList.toggle('is-hidden', !show);
      });
    });
  });


  /* ===========================================================
     6. SCROLL FADE-UP
  =========================================================== */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }


  /* ===========================================================
     7. LIGHTBOX
  =========================================================== */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbClose     = document.getElementById('lightbox-close');
  const lbPrev      = document.getElementById('lightbox-prev');
  const lbNext      = document.getElementById('lightbox-next');
  const triggers    = document.querySelectorAll('.lightbox-trigger');

  if (lightbox && triggers.length) {
    const imgs = Array.from(triggers).map(t => t.querySelector('img'));
    let cur = 0;
    const open  = i => { cur = i; lbImg.src = imgs[i].src; lbImg.alt = imgs[i].alt; lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
    triggers.forEach((t, i) => t.addEventListener('click', () => open(i)));
    lbClose?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    lbPrev?.addEventListener('click', () => open((cur - 1 + imgs.length) % imgs.length));
    lbNext?.addEventListener('click', () => open((cur + 1) % imgs.length));
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  open((cur-1+imgs.length)%imgs.length);
      if (e.key === 'ArrowRight') open((cur+1)%imgs.length);
    });

    // Touch / swipe — same gesture as the homepage slideshow
    let lbTouchX = 0;
    lightbox.addEventListener('touchstart', e => { lbTouchX = e.changedTouches[0].screenX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const delta = lbTouchX - e.changedTouches[0].screenX;
      if (Math.abs(delta) > 44) delta > 0 ? open((cur + 1) % imgs.length) : open((cur - 1 + imgs.length) % imgs.length);
    }, { passive: true });
  }

});
