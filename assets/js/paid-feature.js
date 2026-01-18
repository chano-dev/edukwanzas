const paidButtons = document.querySelectorAll(".cta-paid");
const toast = document.getElementById("paid-toast");

let toastTimeout;

paidButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Mostrar toast
    toast.classList.remove("opacity-0", "pointer-events-none");
    toast.classList.add("opacity-100");

    // Reset automático
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add("opacity-0", "pointer-events-none");
      toast.classList.remove("opacity-100");
    }, 4000);
  });
});
