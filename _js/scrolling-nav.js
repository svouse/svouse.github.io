document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("back-to-top");

    // Smooth scrolling when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Function to check if a section is in the viewport
    function revealSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                section.classList.add("active");
            }
        });
    }

    // Show "Back to Top" button when scrolling past the first section
    window.addEventListener("scroll", function () {
        if (window.scrollY > window.innerHeight) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
        revealSections();
    });

    // Scroll back to top when clicking the button
    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Initial check in case some sections are already visible
    revealSections();
});
