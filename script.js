// 平滑滾動
document.querySelectorAll("[data-scroll]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const target=document.querySelector(btn.dataset.scroll);
    if(target) target.scrollIntoView({behavior:"smooth"});
  });
});

// Accordion
document.querySelectorAll(".day").forEach(day=>{
  const header=day.querySelector(".day__header");
  const toggle=day.querySelector(".day__toggle");

  header.addEventListener("click",()=>{
    day.classList.toggle("is-open");
    if(toggle){
      toggle.textContent=
        day.classList.contains("is-open")?"收合":"展開";
    }
  });
});

// Carousel
// ===============================
document.querySelectorAll("[data-carousel]").forEach((carousel) => {

  const images = carousel.querySelectorAll(".carousel__img");
  const dots = carousel.querySelectorAll(".dot");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  if (!images.length) return;

  let current = 0;
  let startX = 0;
  let isDown = false;

  function update(index) {
    current = (index + images.length) % images.length;

    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    images[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  function next() { update(current + 1); }
  function prev() { update(current - 1); }

  // 按鈕
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => update(i));
  });

  // ⭐ 改用 Pointer 事件（比 touch 穩定）
  carousel.addEventListener("pointerdown", (e) => {
    carousel.setPointerCapture(e.pointerId);
    startX = e.clientX;
    isDown = true;
  });

  carousel.addEventListener("pointerup", (e) => {
    if (!isDown) return;

    const diff = startX - e.clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }

    isDown = false;
    carousel.releasePointerCapture(e.pointerId);
  });

  update(0);
});