document.addEventListener("DOMContentLoaded", () => {
  const lazyBgs = document.querySelectorAll("[data-bg]");

  if (!("IntersectionObserver" in window)) {
    // Fallback (Safari antigo ou edge cases)
    lazyBgs.forEach(el => {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const bg = el.dataset.bg;

          if (bg) {
            el.style.backgroundImage = `url('${bg}')`;
            el.removeAttribute("data-bg");
            el.classList.add("loaded"); 
          }

          obs.unobserve(el);
        }
      });
    },
    {
      rootMargin: "200px", // carrega um pouco antes de aparecer
      threshold: 0.1
    }
  );

  lazyBgs.forEach(el => observer.observe(el));
  
  // Pré-carregar o primeiro banner (opcional)
const firstBg = document.querySelector(".banner-slide[data-bg]");
if (firstBg) {
  firstBg.style.backgroundImage = `url('${firstBg.dataset.bg}')`;
  firstBg.removeAttribute("data-bg");
  firstBg.classList.add("loaded");
}

});
