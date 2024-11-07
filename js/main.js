const navTog = document.querySelector(".header");
const btn = document.querySelector(".btn-mobile-nav");
btn.addEventListener("click", function () {
    navTog.classList.toggle("nav-open");
});
// scroll smooth
// const allLinks = document.querySelectorAll("a:link");
// allLinks.forEach(function (link) {
//     link.addEventListener("click", function (e) {
//         e.preventDefault();
//         const href = link.getAttribute("href");
//         // scroll to top
//         if (href === "#") {
//             window.scrollTo({
//                 top: 0,
//                 behavior: "smooth",
//             });
//         }
//         if (href !== "#" && href.startsWith("#")) {
//             const sectionEl = document.querySelector(href);
//             sectionEl.scrollIntoView({ behavior: "smooth" });
//         }
//         if (link.classList.contains("main-nav-link")) {
//             navTog.classList.toggle("nav-open");
//         }
//     });
// });
// sticky navbar
const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        if (ent.isIntersecting === false) {
            console.log(ent);
            document.querySelector(".header").classList.add("sticky");
        }
        if (ent.isIntersecting === true) {
            console.log(ent);
            document.querySelector(".header").classList.remove("sticky");
            document.querySelector(".header").classList.remove("nav-open");
        }
    },
    {
        root: null,
        threshold: 0,
    }
);
observer.observe(sectionHeroEl);
