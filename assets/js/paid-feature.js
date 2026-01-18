document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("paid-toast");
  const paidButtons = document.querySelectorAll(".cta-paid");

  let toastTimeout;

  function showToast(e) {
    e.preventDefault();

    clearTimeout(toastTimeout);

    toast.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "translate-y-4"
    );

    toast.classList.add(
      "opacity-100",
      "translate-y-0"
    );

    toastTimeout = setTimeout(() => {
      toast.classList.add(
        "opacity-0",
        "pointer-events-none",
        "translate-y-4"
      );

      toast.classList.remove(
        "opacity-100",
        "translate-y-0"
      );
    }, 4000);
  }

  paidButtons.forEach(btn => {
    btn.addEventListener("click", showToast);
  });
});
