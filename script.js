/* =============================================
   九州五日家族旅行 ｜ JavaScript script.js
============================================= */

(function () {
      'use strict';

      /* ──────────────────────────────
         1. TAB 切換（每日行程）
      ────────────────────────────── */
      (function initTabs() {
        const tabs   = document.querySelectorAll('.day-tab');
        const panels = document.querySelectorAll('.day-panel');

        tabs.forEach(function (tab) {
          tab.addEventListener('click', function () {
            const targetId = 'panel-' + tab.getAttribute('data-panel');

            // 重置所有
            tabs.forEach(function (t) {
              t.classList.remove('active');
              t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(function (p) { p.classList.remove('active'); });

            // 啟用目標
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = document.getElementById(targetId);
            if (panel) {
              panel.classList.add('active');
              // 平滑捲到行程區（扣掉 nav 高度）
              const navH = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '56'
              );
              const top = document.getElementById('itinerary').getBoundingClientRect().top
                          + window.scrollY - navH - 12;
              window.scrollTo({ top: top, behavior: 'smooth' });
            }
          });
        });
      })();

      /* ──────────────────────────────
         2. 輪播（飯店圖片）
      ────────────────────────────── */
      (function initCarousel() {
        const track  = document.getElementById('carouselTrack');
        const prev   = document.getElementById('prevBtn');
        const next   = document.getElementById('nextBtn');
        const dots   = document.querySelectorAll('.carousel__dot');
        if (!track) return;

        let cur = 0;
        const total = dots.length;
        let timer;

        function go(idx) {
  cur = (idx + total) % total;
  const slideWidth = track.parentElement.offsetWidth;  // 取容器實際寬度
  track.style.transform = 'translateX(-' + (cur * slideWidth) + 'px)';
  dots.forEach(function (d, i) {
    d.classList.toggle('active', i === cur);
  });
}

        function startAuto() { timer = setInterval(function () { go(cur + 1); }, 4500); }
        function stopAuto()  { clearInterval(timer); }

        prev.addEventListener('click', function () { stopAuto(); go(cur - 1); startAuto(); });
        next.addEventListener('click', function () { stopAuto(); go(cur + 1); startAuto(); });
        dots.forEach(function (d) {
          d.addEventListener('click', function () {
            stopAuto();
            go(parseInt(d.getAttribute('data-index'), 10));
            startAuto();
          });
        });

        startAuto();
      })();

      /* ──────────────────────────────
         3. Scroll Fade-in
      ────────────────────────────── */
      (function initFadeIn() {
        if (!('IntersectionObserver' in window)) {
          document.querySelectorAll('.fade-in').forEach(function (el) {
            el.classList.add('visible');
          });
          return;
        }

        const obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.fade-in').forEach(function (el) { obs.observe(el); });
      })();

      /* ──────────────────────────────
         4. Nav active highlight on scroll
      ────────────────────────────── */
      (function initNavHighlight() {
        const sections = ['flight', 'hotel', 'itinerary', 'tips'];
        const links = document.querySelectorAll('.nav__links a');

        window.addEventListener('scroll', function () {
          let cur = '';
          sections.forEach(function (id) {
            const el = document.getElementById(id);
            if (!el) return;
            if (window.scrollY >= el.offsetTop - 80) cur = id;
          });
          links.forEach(function (a) {
            const href = a.getAttribute('href').replace('#', '');
            a.style.color = href === cur ? 'var(--accent)' : '';
            a.style.borderBottomColor = href === cur ? 'var(--accent)' : '';
          });
        }, { passive: true });
      })();

    })();
