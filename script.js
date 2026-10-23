/* ===== СЧЁТЧИКИ ===== */
document.querySelectorAll(".stat b").forEach(b => {
  const target = +b.dataset.count;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(timer); }
    b.textContent = cur;
  }, 30);
});

/* ===== КУРСОР-СВЕТ НА КАРТОЧКАХ ===== */
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".card:hover").forEach(card => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
});

/* ===== ПЛАВНЫЙ СКРОЛЛ ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  });
});

/* ===== КАСТОМНЫЙ КУРСОР ===== */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");

if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  }
  loop();

  const hoverables = "a, button, .card, .acc-header, .penalty, .btn-join, .btn-red";
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  window.addEventListener("mousedown", () => document.body.classList.add("cursor-down"));
  window.addEventListener("mouseup", () => document.body.classList.remove("cursor-down"));
}