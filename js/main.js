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

// script.js

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById("backToTop");

    // Create an observer
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        },
        { threshold: 0.1 } // Adjust the threshold as needed
    );

    // Observe the #explore section
    const exploreSection = document.getElementById("explore");
    observer.observe(exploreSection);
});

// Slider
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

// Next button functionality
nextBtn.addEventListener("click", () => {
    resetActiveClasses();
    slideNumber--;
    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }
    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});

// previous button functionality
prevBtn.addEventListener("click", () => {
    resetActiveClasses();
    slideNumber++;
    if (slideNumber >= numberOfSlides) {
        slideNumber = 0;
    }
    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});
// Dot click functionality
slideIcons.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        resetActiveClasses();
        slideNumber = index; // Set slide number to the clicked dot's index
        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    });

    // Make dots focusable and accessible
    dot.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            resetActiveClasses();
            slideNumber = index;
            slides[slideNumber].classList.add("active");
            slideIcons[slideNumber].classList.add("active");
        }
    });
});
// Autoplay functionality
let playSlider;
let repeater = () => {
    playSlider = setInterval(function () {
        resetActiveClasses();
        slideNumber++;
        if (slideNumber >= numberOfSlides) {
            slideNumber = 0;
        }
        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    }, 3000);
};

// Stop autoplay on mouseover
sliderContainer.addEventListener("mouseover", () => {
    clearInterval(playSlider);
});

// Resume autoplay on mouseout
sliderContainer.addEventListener("mouseout", () => {
    repeater();
});
// see more less buttons
// Apply 'active' class on page load to all paragraphs
document.querySelectorAll(".explore-info-paragraph").forEach((paragraph) => {
    paragraph.classList.remove("active");
});

// Add click event listener for "see more" buttons
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
    e.target.innerHTML = isActive ? "اقرا اقل" : "اقرا المزيد";
});

// playlist
const main_video = document.querySelector(".main-video .video-frame");
const main_video_title = document.querySelector(".main-video-title");
const video_playlist = document.querySelector(".video-playlist .videos");
const playlist_details = document.querySelector(".playlist-details");

let data = [
    {
        id: "a1",
        title: "ما هو التسويق الرقمي؟",
        name: "https://www.youtube.com/watch?v=g0alb1Ya1bY&ab_channel=EhabMesallum",
        duration: "10:02",
    },
    {
        id: "a2",
        title: "كيفية إنشاء استراتيجية تسويق إلكتروني فعالة",
        name: "https://www.youtube.com/watch?v=UO-XOUX3aD4&ab_channel=SchoolOfMarketing",
        duration: "7:58",
    },
    {
        id: "a3",
        title: "أفضل طرق الإعلان على الإنترنت",
        name: "https://www.youtube.com/watch?v=BwzLXZ0Q8Ag&ab_channel=SocialCave",
        duration: "12:10",
    },
    {
        id: "a4",
        title: "أساسيات التسويق بالمحتوى",
        name: "https://www.youtube.com/watch?v=GMFb27PdB3I&ab_channel=CARTCODE--%D8%AF.%D8%AD%D8%B3%D9%86%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%BA%D9%8A",
        duration: "8:42",
    },
    {
        id: "a5",
        title: "التسويق عبر وسائل التواصل الاجتماعي",
        name: "https://www.youtube.com/watch?v=1-LL7ySbRUE&ab_channel=SarahRefai",
        duration: "15:23",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
    {
        id: "a6",
        title: "كيفية فهم وتحليل سلوك المستهلك",
        name: "https://www.youtube.com/watch?v=Xp6nM2GOW6M",
        duration: "9:36",
    },
];

// Calculate and display dynamic playlist details
function calculateTotalDuration(data) {
    let totalSeconds = 0;
    data.forEach((video) => {
        const [minutes, seconds] = video.duration.split(":").map(Number);
        totalSeconds += minutes * 60 + seconds;
    });
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    return `${
        totalHours ? `${totalHours}h ` : ""
    }${remainingMinutes}m ${remainingSeconds}s`;
}

const totalLessons = data.length;
const totalDuration = calculateTotalDuration(data);
playlist_details.innerHTML = `عدد الفديوهات  : ${totalLessons} &nbsp; المدة : &nbsp; ${totalDuration}`;

// Generate the video list
data.forEach((video, i) => {
    let video_element = `
        <div class="video" data-id="${video.id}">
            <img src="./images/vid-images/play.svg" alt="">
            <p>${i + 1 > 9 ? i + 1 : "0" + (i + 1)}. </p>
            <h3 class="title">${video.title}</h3>
            <p class="time">${video.duration}</p>
        </div>
    `;
    video_playlist.innerHTML += video_element;
});

// Handle video click and playback
let videos = document.querySelectorAll(".video");
videos[0].classList.add("active");
videos[0].querySelector("img").src = "./images/vid-images/pause.svg";

videos.forEach((selected_video) => {
    selected_video.onclick = () => {
        videos.forEach((video) => {
            video.classList.remove("active");
            video.querySelector("img").src = "./images/vid-images/play.svg";
        });

        selected_video.classList.add("active");
        selected_video.querySelector("img").src =
            "./images/vid-images/pause.svg";

        const match_video = data.find(
            (video) => video.id == selected_video.dataset.id
        );

        if (match_video.name.includes("youtube.com")) {
            const videoId = new URL(match_video.name).searchParams.get("v");
            main_video.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            main_video.src = match_video.name;
        }

        main_video_title.innerHTML = match_video.title;
    };
});
