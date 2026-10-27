
// ==============================
// 1. THEME TOGGLE
// ==============================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("light-theme")) {
        icon.className = "bi bi-moon-fill";
    } else {
        icon.className = "bi bi-sun-fill";
    }
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const currentTheme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem("portfolioTheme", currentTheme);

        updateThemeIcon();
    });
}


// ==============================
// 2. CURRENT YEAR
// ==============================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==============================
// 3. PROJECT FILTER
// ==============================

const filterButtons = document.querySelectorAll(".filter-btn");

const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        const selectedFilter = button.dataset.filter;

        // Filter projects
        projectItems.forEach(project => {
            const projectCategory = project.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        });

    });
});


// ==============================
// 4. CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        // Check empty fields
        if (!name || !email || !subject || !message) {

            if (formMessage) {
                formMessage.textContent = "Please fill in all fields.";
            }

            return;
        }

        // Check email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            if (formMessage) {
                formMessage.textContent = "Please enter a valid email address.";
            }

            return;
        }

        // Prepare email subject
        const emailSubject = encodeURIComponent(subject);

        // Prepare email body
        const emailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        // Create mailto link
        const mailtoLink =
            `mailto:ba20sma20@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        // Open email application
        window.location.href = mailtoLink;

        if (formMessage) {
            formMessage.textContent =
                "Your email application will open to send the message.";
        }

    });

}
