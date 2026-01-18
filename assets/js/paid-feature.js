document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("paid-toast");
  const ctaButtons = document.querySelectorAll(".cta-btn");

  let toastTimeout;

  function showToast() {
    // Reset se já estiver visível
    clearTimeout(toastTimeout);

    toast.classList.remove("opacity-0", "pointer-events-none");
    toast.classList.add("opacity-100");
    toast.classList.remove("translate-y-4");
toast.classList.add("translate-y-0");


    toastTimeout = setTimeout(() => {
      toast.classList.add("opacity-0", "pointer-events-none");
      toast.classList.remove("opacity-100");
      toast.classList.add("translate-y-4");

    }, 3500);
  }

  ctaButtons.forEach(btn => {
    btn.addEventListener("click", showToast);
  });
});
