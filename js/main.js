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
// playlist
const main_video = document.querySelector(".main-video .video-frame");
const main_video_title = document.querySelector(".main-video-title");
const video_playlist = document.querySelector(".video-playlist .videos");
const playlist_details = document.querySelector(".playlist-details");

let data = [
    {
        id: "a1",
        title: "Course Introduction: Getting Started",
        name: "https://www.youtube.com/watch?v=MnpuK0MK4yo&ab_channel=BeyondFireship",
        duration: "2:47",
    },
    {
        id: "a2",
        title: "Working with Modules and npm in Node.js",
        name: "https://www.youtube.com/watch?v=MnpuK0MK4yo&ab_channel=BeyondFireship",
        duration: "2:45",
    },
    {
        id: "a3",
        title: "Working with Modules and npm in Node.js",
        name: "https://www.youtube.com/watch?v=GqoPuVRMOqM&ab_channel=%D8%A3%D8%A8%D9%88%D8%A3%D8%B5%D8%A7%D9%8A%D9%84-AbuAsayel",
        duration: "58:45",
    },
    // other video data...
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
playlist_details.innerHTML = `${totalLessons} lessons &nbsp; . &nbsp; ${totalDuration}`;

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
