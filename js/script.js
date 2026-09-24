/* AOS Foundation — lightweight static-site rendering and interactions */
document.addEventListener("DOMContentLoaded", () => {
  const C = window.AOS_CONTENT;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  // Global content
  $$(".js-short-name").forEach(el => el.textContent = C.site.shortName);
  $$(".js-official-name").forEach(el => el.textContent = C.site.officialName);
  $$(".js-founder").forEach(el => el.textContent = C.site.founder);
  $$(".js-location").forEach(el => el.textContent = C.site.location);
  $$(".js-logo").forEach(el => { el.src = C.site.logo; el.alt = `${C.site.shortName} logo`; });
  $$(".js-year").forEach(el => el.textContent = new Date().getFullYear());

  // Header / mobile menu
  const menuBtn = $(".menu-toggle");
  const nav = $(".site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    $$(".site-nav a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  // Page-specific renderers
  const path = location.pathname.split("/").pop() || "index.html";

  if (path === "index.html" || path === "") renderHome();
  if (path === "about.html") renderAbout();
  if (path === "programs.html") renderPrograms();
  if (path === "impact.html") renderImpact();
  if (path === "gallery.html") renderGallery();
  if (path === "team.html") renderTeam();
  if (path === "get-involved.html") renderInvolvement();
  if (path === "contact.html") renderContact();

  function renderHome() {
    setText("hero-title", C.home.heroTitle);
    setText("hero-text", C.home.heroText);
    setText("hero-primary", C.home.heroPrimary);
    setText("hero-secondary", C.home.heroSecondary);
    setText("challenge-title", C.home.challengeTitle);
    setText("challenge-text", C.home.challengeText);
    setText("response-title", C.home.responseTitle);
    setText("response-text", C.home.responseText);
    setText("impact-intro", C.home.impactIntro);
    setText("stories-title", C.home.storiesTitle);
    setText("stories-text", C.home.storiesText);
    setText("cta-title", C.home.ctaTitle);
    setText("cta-text", C.home.ctaText);
    setImage("hero-image", C.site.heroImage, "AOS Foundation");
    renderPrograms("#home-programs", 3);
    renderMetrics("#home-metrics");
    renderStories("#home-stories", 2);
  }

  function renderAbout() {
    setText("about-story-title", C.about.storyTitle);
    setText("about-story-text", C.about.storyText);
    setText("mission", C.about.mission);
    setText("vision", C.about.vision);
    setText("founder-bio", C.about.founderBio);
    setText("values-note", C.about.valuesNote);
    const list = $("#values-list");
    if (list) list.innerHTML = C.about.values.map(v => `<li>${escapeHTML(v)}</li>`).join("");
    setText("about-founder-name", C.site.founder);
  }

  function renderPrograms(target="#program-list", limit=null) {
    const el = $(target);
    if (!el) return;
    const items = limit ? C.programs.slice(0, limit) : C.programs;
    el.innerHTML = items.map((p, i) => `
      <article class="program-card reveal">
        <div class="media-frame"><img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy"></div>
        <div class="program-card__body">
          <span class="eyebrow">${escapeHTML(p.status || "Area of work")}</span>
          <h3>${escapeHTML(p.title)}</h3>
          <p>${escapeHTML(p.description)}</p>
          ${limit ? `<a class="text-link" href="programs.html">Explore this area <span aria-hidden="true">↗</span></a>` : ""}
        </div>
      </article>`).join("");
  }

  function renderImpact() {
    setText("impact-intro", C.impact.intro);
    renderMetrics("#impact-metrics");
    renderStories("#impact-stories", null);
  }

  function renderMetrics(target) {
    const el = $(target);
    if (!el) return;
    el.innerHTML = C.impact.metrics.map(m => `
      <div class="metric">
        <strong>${escapeHTML(m.value)}</strong>
        <span>${escapeHTML(m.label)}</span>
      </div>`).join("");
  }

  function renderStories(target, limit=null) {
    const el = $(target);
    if (!el) return;
    const items = limit ? C.stories.slice(0, limit) : C.stories;
    el.innerHTML = items.map(s => `
      <article class="story-card reveal">
        <span class="eyebrow">${escapeHTML(s.label)}</span>
        <h3>${escapeHTML(s.title)}</h3>
        <p>${escapeHTML(s.text)}</p>
      </article>`).join("");
  }

  function renderGallery() {
    const grid = $("#gallery-grid");
    const filters = $("#gallery-filters");
    if (!grid) return;
    const cats = ["All", ...new Set(C.gallery.map(x => x.category))];
    if (filters) filters.innerHTML = cats.map((c,i) => `<button class="filter-btn ${i===0?"active":""}" data-filter="${escapeAttr(c)}">${escapeHTML(c)}</button>`).join("");
    const draw = filter => {
      grid.innerHTML = C.gallery
        .filter(g => filter === "All" || g.category === filter)
        .map((g,i) => `<button class="gallery-item" data-index="${C.gallery.indexOf(g)}" aria-label="Open ${escapeAttr(g.title)}">
          <img src="${escapeAttr(g.image)}" alt="${escapeAttr(g.title)}" loading="lazy">
          <span><b>${escapeHTML(g.title)}</b><small>${escapeHTML(g.category)}</small></span>
        </button>`).join("");
    };
    draw("All");
    if (filters) filters.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", filters).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      draw(btn.dataset.filter);
    });
    grid.addEventListener("click", e => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      openLightbox(Number(item.dataset.index));
    });
  }

  function openLightbox(index) {
    const g = C.gallery[index];
    const modal = $("#lightbox");
    if (!modal || !g) return;
    $(".lightbox-img", modal).src = g.image;
    $(".lightbox-img", modal).alt = g.title;
    $(".lightbox-title", modal).textContent = g.title;
    $(".lightbox-description", modal).textContent = g.description || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
  function closeLightbox() {
    const modal = $("#lightbox");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
  $$(".lightbox-close, .lightbox-backdrop").forEach(el => el.addEventListener("click", closeLightbox));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  function renderTeam() {
    const grid = $("#team-grid");
    if (!grid) return;
    grid.innerHTML = C.team.map(t => `
      <article class="team-card reveal">
        <div class="team-photo"><img src="${escapeAttr(t.image)}" alt="${escapeAttr(t.name)}" loading="lazy"></div>
        <div class="team-copy">
          <span class="eyebrow">${escapeHTML(t.role)}</span>
          <h2>${escapeHTML(t.name)}</h2>
          <p>${escapeHTML(t.bio)}</p>
        </div>
      </article>`).join("");
  }

  function renderInvolvement() {
    const grid = $("#involvement-grid");
    if (!grid) return;
    grid.innerHTML = C.involvement.map(x => `
      <article class="involvement-card reveal">
        <span class="number">${escapeHTML(x.icon)}</span>
        <h2>${escapeHTML(x.title)}</h2>
        <p>${escapeHTML(x.text)}</p>
      </article>`).join("");
  }

  function renderContact() {
    setText("contact-location", C.contact.location);
    setText("contact-email", C.contact.email);
    setText("contact-phone", C.contact.phone);
    setText("contact-whatsapp", C.contact.whatsapp);
    setText("contact-address", C.contact.address);
    setText("form-note", C.contact.formNote);
    const social = $("#social-links");
    if (social) {
      social.innerHTML = [
        ["Facebook", C.contact.facebook],
        ["Instagram", C.contact.instagram],
        ["LinkedIn", C.contact.linkedin]
      ].map(([name,url]) => `<a href="#" data-placeholder="${escapeAttr(url)}" class="social-placeholder">${name}<span>↗</span></a>`).join("");
    }
  }

  const form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const msg = $("#form-message");
      if (msg) msg.textContent = "This form is not connected to a sending service yet. Add Formspree, Netlify Forms, Google Forms or a backend before launch.";
    });
  }

  // Small, non-scroll-janky reveal: IntersectionObserver only toggles a class.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
    }), { threshold: 0.08 });
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("is-visible"));

  function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }
  function setImage(id, src, alt) { const el = document.getElementById(id); if (el) { el.src = src; el.alt = alt; } }
  function escapeHTML(v) { return String(v).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c])); }
  function escapeAttr(v) { return escapeHTML(v); }
});
