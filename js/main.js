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
const sectionHeroEl = document.querySelector(".section-live");
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
// slider
const sliderContainer = document.querySelector(".section-hero");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-dot");
const numberOfSlides = slides.length;
let slideNumber = 0;

// Function to reset active classes
function resetActiveClasses() {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });
}
// previous button functionality
prevBtn.addEventListener("click", () => {
    resetActiveClasses(); // Reset all active classes
    // Remove the active class from the current slide
    slides[slideNumber].classList.remove("active");
    slideIcons[slideNumber].classList.remove("active");

    // Move to the next slide
    slideNumber++;

    // If it's the last slide, loop back to the first
    if (slideNumber >= numberOfSlides) {
        slideNumber = 0;
    }

    // Add the active class to the new current slide
    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});
// next button functionality
nextBtn.addEventListener("click", () => {
    resetActiveClasses(); // Reset all active classes
    // Remove the active class from the current slide
    slides[slideNumber].classList.remove("active");
    slideIcons[slideNumber].classList.remove("active");

    // Move to the next slide
    slideNumber--;

    // If it's the last slide, loop back to the first
    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }

    // Add the active class to the new current slide
    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});
//slider autoplay
let playSlider;
let repeater = () => {
    playSlider = setInterval(function () {
        resetActiveClasses(); // Reset all active classes
        // Remove the active class from the current slide

        slides[slideNumber].classList.remove("active");
        slideIcons[slideNumber].classList.remove("active");

        // Move to the next slide
        slideNumber--;

        // If it's the last slide, loop back to the first
        if (slideNumber < 0) {
            slideNumber = numberOfSlides - 1;
        }

        // Add the active class to the new current slide
        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    }, 4000);
};

// Stop autoplay on mouseover
sliderContainer.addEventListener("mouseover", () => {
    clearInterval(playSlider);
    console.log("stoping");
});

// Resume autoplay on mouseout
sliderContainer.addEventListener("mouseout", () => {
    repeater();
    console.log("work again");
});
