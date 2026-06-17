var hamburger = document.querySelector<HTMLElement>(".hamburger")!;
var navLinks = document.querySelector<HTMLElement>(".nav-links")!;
hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("expanded");
});
