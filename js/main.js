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
const sectionLiveEl = document.querySelector(".section-live");

let isHeroInView = true;
let isLiveInView = true;

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach((entry) => {
            if (entry.target === sectionHeroEl) {
                isHeroInView = entry.isIntersecting;
            }
            if (entry.target === sectionLiveEl) {
                isLiveInView = entry.isIntersecting;
            }

            // Only add the sticky class if both sections are out of view
            if (!isHeroInView && !isLiveInView) {
                document.querySelector(".header").classList.add("sticky");
                document.querySelector(".header").classList.remove("nav-open");
            } else {
                document.querySelector(".header").classList.remove("sticky");
            }
        });
    },
    {
        root: null,
        threshold: 0,
        rootMargin: "-40px",
    }
);

observer.observe(sectionHeroEl);
observer.observe(sectionLiveEl);

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
});

// Resume autoplay on mouseout
sliderContainer.addEventListener("mouseout", () => {
    repeater();
});

// see more
const sectionExploreEl = document.getElementById("explore");

sectionExploreEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("see-more-btn")) return;

    // Find the closest `.explore-row-info` ancestor, then query `.explore-info-paragraph` within it
    const exploreRowInfo = e.target.closest(".explore-row-info");
    const exploreInfoParagraph = exploreRowInfo
        ? exploreRowInfo.querySelector(".explore-info-paragraph")
        : null;

    // Toggle the 'active' class on the paragraph
    const isActive = exploreInfoParagraph.classList.toggle("active");

    // Set the button text based on the active state
    e.target.innerHTML = isActive ? "اقرا المزيد" : "اقرا اقل";
});
