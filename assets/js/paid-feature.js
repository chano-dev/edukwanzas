document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("paid-toast");
  const ctaButtons = document.querySelectorAll(".cta-btn");

  let toastTimeout;

  function showToast() {
    // Reset se já estiver visível
    clearTimeout(toastTimeout);

    toast.classList.remove("opacity-0", "pointer-events-none");
    toast.classList.add("opacity-100");


    toastTimeout = setTimeout(() => {
      toast.classList.add("opacity-0", "pointer-events-none");
      toast.classList.remove("opacity-100");

    }, 3500);
  }

  ctaButtons.forEach(btn => {
    btn.addEventListener("click", showToast);
  });
});
