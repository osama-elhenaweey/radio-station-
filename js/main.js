const navTog = document.querySelector(".header");
const btn = document.querySelector(".btn-mobile-nav");
btn.addEventListener("click", function () {
    navTog.classList.toggle("nav-open");
});
// scrolling
// Smooth scrolling for nav links
const navLinks = document.querySelectorAll(".main-nav-link");
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        // Close mobile nav after clicking a link
        if (navTog.classList.contains("nav-open")) {
            navTog.classList.remove("nav-open");
        }
    });
});
// sticky navbar
const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        if (ent.isIntersecting === false) {
            console.log(ent);
            document.querySelector(".header").classList.add("sticky");
            document.querySelector(".header").classList.remove("nav-open");
        }
        if (ent.isIntersecting === true) {
            console.log(ent);
            document.querySelector(".header").classList.remove("sticky");
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: "-40px",
    }
);
observer.observe(sectionHeroEl);
