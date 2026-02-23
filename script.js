(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Smooth scroll for nav buttons
  const scrollToTarget = (selector) => {
    const el = qs(selector);
    if (!el) return;
    const topbar = qs(".topbar");
    const offset = (topbar?.offsetHeight || 0) + 10;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  qsa("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      if (target) scrollToTarget(target);
    });
  });

  // Day accordion: expand/collapse
  qsa(".day").forEach((day) => {
    const header = qs(".day__header", day);
    const body = qs(".day__body", day);
    const toggleText = qs(".day__toggle", day);

    if (!header || !body || !toggleText) return;

    header.addEventListener("click", () => {
      const expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!expanded));
      body.style.display = expanded ? "none" : "block";
      toggleText.textContent = expanded ? "展開" : "收合";
    });
  });

  // Optional: reduce motion preference
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.documentElement.style.scrollBehavior = "auto";
  }
})();

// hotel carousel
document.querySelectorAll("[data-carousel]").forEach(carousel => {

  const imgs = carousel.querySelectorAll(".carousel__img");
  const dots = carousel.querySelectorAll(".dot");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");

  let index = 0;

  function show(i){
    imgs.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    imgs[i].classList.add("active");
    dots[i].classList.add("active");
    index = i;
  }

  prev.onclick = () => show((index - 1 + imgs.length) % imgs.length);
  next.onclick = () => show((index + 1) % imgs.length);

  dots.forEach((dot,i)=>{
    dot.onclick = () => show(i);
  });

  // auto play
  setInterval(()=>{
    show((index + 1) % imgs.length);
  },8000);

});