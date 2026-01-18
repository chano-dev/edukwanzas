// FAQ TOGGLE
const faqToggles = document.querySelectorAll(".faq-toggle");

faqToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const item = toggle.parentElement;
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");

    // Fecha os outros
    document.querySelectorAll(".faq-content").forEach(el => {
      if (el !== content) el.classList.add("hidden");
    });

    document.querySelectorAll(".faq-icon").forEach(ic => {
      if (ic !== icon) ic.classList.remove("rotate-180");
    });

    // Toggle atual
    content.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  });
});
