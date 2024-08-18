document.addEventListener("DOMContentLoaded", function() {
    // Fade-in effect on page load
    document.body.style.opacity = "1";

    const header = document.querySelector("header.sticky-header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            // Scrolling down
            header.classList.add("header-hidden");
        } else {
            // Scrolling up
            header.classList.remove("header-hidden");
        }
        lastScrollY = window.scrollY;
    });
});
