/* =========================================================
   Portfolio — script.js
   Interaksi: navbar, tema, typewriter, reveal, counter,
   filter projek, validasi form, progress bar.
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Tahun di footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Tema (dark default) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "portfolio-theme";

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------- 3. Navbar: scrolled state + mobile menu ---------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  const onScrollNav = () => {
    if (window.scrollY > 24) navbar?.classList.add("scrolled");
    else navbar?.classList.remove("scrolled");
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  const closeMenu = () => {
    navMenu?.classList.remove("open");
    navToggle?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.toggle("open");
    navToggle.classList.toggle("open", !!isOpen);
    navToggle.setAttribute("aria-expanded", String(!!isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* ---------- 4. Active link sesuai section (scroll spy) ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- 5. Scroll progress bar ---------- */
  const progress = document.getElementById("scrollProgress");
  const onScrollProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (progress) progress.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };
  onScrollProgress();
  window.addEventListener("scroll", onScrollProgress, { passive: true });

  /* ---------- 6. Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("visible"));
  } else {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // sedikit stagger untuk elemen yang muncul bersamaan
            setTimeout(() => entry.target.classList.add("visible"), i * 70);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));
  }

  /* ---------- 7. Typewriter ---------- */
  const typeEl = document.getElementById("typewriter");
  const phrases = [
    "Web Developer",
    "Front-End Engineer",
    "UI Enthusiast",
    "Problem Solver",
  ];
  if (typeEl) {
    if (prefersReduced) {
      typeEl.textContent = phrases[0];
    } else {
      let pIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const phrase = phrases[pIndex];
        charIndex += deleting ? -1 : 1;
        typeEl.textContent = phrase.slice(0, charIndex);

        let delay = deleting ? 45 : 90;

        if (!deleting && charIndex === phrase.length) {
          delay = 1600;
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          delay = 400;
        }
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* ---------- 8. Counter angka statistik ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObs.observe(c));

  /* ---------- 9. Skill bars ---------- */
  const bars = document.querySelectorAll(".bar i");
  const barObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level || "0";
          setTimeout(() => (entry.target.style.width = level + "%"), 120);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => barObs.observe(b));

  /* ---------- 10. Filter projek ---------- */
  const filters = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;

      projectCards.forEach((card) => {
        const match = cat === "all" || card.dataset.category === cat;
        card.classList.toggle("hide", !match);
        if (match && !prefersReduced) {
          card.classList.remove("visible");
          // re-trigger animasi halus
          requestAnimationFrame(() => card.classList.add("visible"));
        }
      });
    });
  });

  /* ---------- 11. Validasi form kontak ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  const setError = (field, msg) => {
    const wrap = field.closest(".field");
    const errEl = wrap?.querySelector(".field-error");
    if (wrap) wrap.classList.toggle("invalid", !!msg);
    if (errEl) errEl.textContent = msg || "";
  };

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "Nama minimal 2 karakter."),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Masukkan email yang valid.",
    subject: (v) => (v.trim().length >= 3 ? "" : "Subjek minimal 3 karakter."),
    message: (v) => (v.trim().length >= 10 ? "" : "Pesan minimal 10 karakter."),
  };

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      const msg = validators[name](field.value);
      setError(field, msg);
      if (msg) valid = false;
    });

    if (!valid) {
      if (note) {
        note.textContent = "Mohon perbaiki kolom yang ditandai.";
        note.className = "form-note error";
      }
      return;
    }

    // Simulasi pengiriman (ganti dengan fetch ke backend/Formspree bila perlu)
    if (note) {
      note.textContent = "Mengirim pesan...";
      note.className = "form-note";
    }
    setTimeout(() => {
      if (note) {
        note.textContent = "Terima kasih! Pesan Anda berhasil terkirim. 🙌";
        note.className = "form-note success";
      }
      form.reset();
    }, 900);
  });

  // Validasi langsung saat keluar dari field
  form?.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      const fn = validators[field.name];
      if (fn) setError(field, fn(field.value));
    });
    field.addEventListener("input", () => {
      if (field.closest(".field")?.classList.contains("invalid")) {
        const fn = validators[field.name];
        if (fn) setError(field, fn(field.value));
      }
    });
  });
})();
