const slidesData = [
  {
    title: "Crédito para quem mira objetivos, não paredes",
    text: "Financiamos decisões conscientes para construir o futuro.",
    cta: "Quero um empréstimo",
    desktopImg: "assets/img/banners/desktop-1.png",
    mobileImg: "assets/img/banners/mobile-1.png"
  },
  {
    title: "Dinheiro com direção certa",
    text: "Mais clareza, menos desperdício.",
    cta: "Simular agora",
    desktopImg: "assets/img/banners/desktop-2.png",
    mobileImg: "assets/img/banners/mobile-2.png"
  },
  {
    title: "Crédito pensado para avançar",
    text: "Soluções simples, seguras e responsáveis.",
    cta: "Avançar com pedido",
    desktopImg: "assets/img/banners/desktop-3.png",
    mobileImg: "assets/img/banners/mobile-3.png"
  }
];

const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let current = 0;
let interval;
const delay = 6000;

/* ---------- CREATE SLIDES ---------- */
slidesData.forEach((slide, index) => {
  const slideEl = document.createElement("div");

  slideEl.className = ` w-full h-full
    absolute inset-0 transition-opacity duration-700
    ${index === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}
  `;

  slideEl.innerHTML = `
    <div class="w-full h-full overflow-hidden
                bg-cover bg-center flex"
         >

      <!-- DESKTOP -->
      <div class="absolute inset-0  hidden md:block bg-cover bg-center"
           style="background-image: url('${slide.desktopImg}')"></div>
      <!-- MOBILE IMAGE -->
      <div class="absolute inset-0 md:hidden bg-cover bg-center bg-black/10 bg-blend-overlay" style="background-image: url('${slide.mobileImg}')"></div>

      <!-- LEFT CONTENT -->
      <div class="relative z-10 w-full md:w-1/2 text-white text-center items-center flex flex-col justify-center pt-35 md:p-0">

        <h2 class="text-2xl md:text-3xl font-logo font-bold leading-tight">
          ${slide.title}
        </h2>

        <p class="mt-4 text-white/90 max-w-md font-primary font-medium">
          ${slide.text}
        </p>

        <button class="cta-paid mt-6 w-fit px-6 py-3 rounded-full
                       bg-azul-1 hover:bg-white hover:text-azul-1 hover:scale-[1.02]
                       transition-all transition-discrete duration-150 font-medium font-primary">
          ${slide.cta}
        </button>
      </div>
    </div>
  `;

  slider.appendChild(slideEl);

  // Dots
  const dot = document.createElement("button");
  dot.className = `
    w-3 h-1 rounded-full
    ${index === 0 ? "bg-white w-6" : "bg-white/50"}
    transition-all
  `;
  dot.onclick = () => goToSlide(index);
  dotsContainer.appendChild(dot);
});

/* ---------- FUNCTIONS ---------- */
function updateSlides() {
  [...slider.children].forEach((slide, i) => {
    slide.classList.toggle("opacity-100", i === current);
    slide.classList.toggle("z-10", i === current);
    slide.classList.toggle("opacity-0", i !== current);
    slide.classList.toggle("z-0", i !== current);
  });

  [...dotsContainer.children].forEach((dot, i) => {
    dot.className = `
      h-1 rounded-full transition-all
      ${i === current ? "bg-white w-6" : "bg-white/50 w-3"}
    `;
  });
}

function goToSlide(index) {
  current = index;
  updateSlides();
  resetAutoplay();
}

function nextSlide() {
  current = (current + 1) % slidesData.length;
  updateSlides();
}

function prevSlide() {
  current = (current - 1 + slidesData.length) % slidesData.length;
  updateSlides();
}

/* ---------- AUTOPLAY ---------- */
function startAutoplay() {
  interval = setInterval(nextSlide, delay);
}

function resetAutoplay() {
  clearInterval(interval);
  startAutoplay();
}

/* ---------- EVENTS ---------- */
nextBtn.onclick = () => {
  nextSlide();
  resetAutoplay();
};

prevBtn.onclick = () => {
  prevSlide();
  resetAutoplay();
};

/* ---------- SWIPE (MOBILE) ---------- */
let startX = 0;

slider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? nextSlide() : prevSlide();
    resetAutoplay();
  }
});

/* INIT */
startAutoplay();
