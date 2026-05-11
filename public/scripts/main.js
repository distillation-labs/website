document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initTestimonialCarousel();
});

/* -------------------- Language Switcher -------------------- */

function initLanguageSwitcher() {
  const toggle = document.getElementById("dropdowntoggle");
  const dropdown = document.getElementById("dropdown");

  if (!toggle || !dropdown) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !dropdown.classList.contains("hidden");
    dropdown.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    dropdown.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  });

  // Prevent clicks inside dropdown from closing it
  dropdown.addEventListener("click", (e) => e.stopPropagation());
}

/* -------------------- Testimonial Carousel -------------------- */

function initTestimonialCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".carousel-indicator");

  if (slides.length < 2 || !prevButton || !nextButton || !indicators.length)
    return;

  let currentSlide = 0;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("opacity-100");
    indicators[currentSlide].classList.remove("bg-primary");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("opacity-100");
    indicators[currentSlide].classList.add("bg-primary");
  }

  prevButton.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextButton.addEventListener("click", () => goToSlide(currentSlide + 1));

  indicators.forEach((indicator, index) =>
    indicator.addEventListener("click", () => goToSlide(index)),
  );

  goToSlide(0);
}
