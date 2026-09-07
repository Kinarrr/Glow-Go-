/* =========================================================
   GLOW & GO — FINAL JAVASCRIPT
   Support: all 6 pages
========================================================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    });

    // Close menu after clicking a navigation link
    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuBtn.textContent = "☰";

            menuBtn.setAttribute("aria-label", "Open menu");
        });

    });
}


/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

        if (themeBtn) {
            themeBtn.textContent = "☀";
            themeBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

    } else {

        document.body.classList.remove("dark");

        if (themeBtn) {
            themeBtn.textContent = "☾";
            themeBtn.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }
}

if (themeBtn) {

    const savedTheme = localStorage.getItem("glowTheme");

    if (savedTheme) {
        setTheme(savedTheme);
    } else {

        const prefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        setTheme(prefersDark ? "dark" : "light");
    }

    themeBtn.addEventListener("click", () => {

        const isDark =
            document.body.classList.contains("dark");

        const newTheme = isDark ? "light" : "dark";

        setTheme(newTheme);

        localStorage.setItem("glowTheme", newTheme);
    });
}


/* =========================
   BACK TO TOP
========================= */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    function checkScroll() {

        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    }

    window.addEventListener("scroll", checkScroll);

    checkScroll();

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements = document.querySelectorAll(
    ".feature-card, " +
    ".beauty-card, " +
    ".routine-card, " +
    ".quick-tip, " +
    ".inspiration-card, " +
    ".split-content, " +
    ".split-image, " +
    ".stat-item, " +
    ".question, " +
    ".contact-info, " +
    ".contact-form"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach(element => {

        element.classList.add("animate");

        observer.observe(element);
    });

} else {

    animatedElements.forEach(element => {
        element.classList.add("visible");
    });
}


/* =========================
   FAQ
========================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        // Close other FAQ items
        faqQuestions.forEach(otherQuestion => {

            if (otherQuestion !== question) {

                otherQuestion.classList.remove("active");

                const otherAnswer =
                    otherQuestion.nextElementSibling;

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            }

        });

        // Toggle selected FAQ
        question.classList.toggle("active");

        if (question.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;
        }

    });

});


/* =========================
   BEAUTY QUIZ
========================= */

const beautyQuiz =
    document.getElementById("beautyQuiz");

const quizResult =
    document.getElementById("quizResult");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const retryQuiz =
    document.getElementById("retryQuiz");


if (beautyQuiz) {

    beautyQuiz.addEventListener("submit", event => {

        event.preventDefault();

        const selectedAnswers =
            beautyQuiz.querySelectorAll(
                'input[type="radio"]:checked'
            );

        if (selectedAnswers.length < 5) {

            alert(
                "Yuk jawab semua pertanyaan dulu ya! ✨"
            );

            return;
        }

        let naturalScore = 0;
        let glamScore = 0;

        selectedAnswers.forEach(answer => {

            if (answer.value === "natural") {
                naturalScore++;
            }

            if (answer.value === "glam") {
                glamScore++;
            }

        });


        /* =========================
           NATURAL RESULT
        ========================= */

        if (naturalScore >= glamScore) {

            resultTitle.textContent =
                "Soft & Natural ✨";

            resultText.textContent =
                "Kamu cenderung menyukai look yang ringan, fresh, dan effortless. Natural makeup dengan complexion ringan, warna lembut, dan tampilan yang nyaman bisa menjadi pilihan yang cocok untukmu.";

        }

        /* =========================
           GLAM RESULT
        ========================= */

        else {

            resultTitle.textContent =
                "Bold & Expressive ✦";

            resultText.textContent =
                "Kamu cenderung menyukai look yang lebih standout, defined, dan expressive. Kamu bisa bereksperimen dengan warna, eyeliner, blush, atau lip color untuk menunjukkan kreativitasmu.";

        }


        beautyQuiz.style.display = "none";

        quizResult.classList.add("show");

        quizResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });
}


/* =========================
   RETRY QUIZ
========================= */

if (retryQuiz && beautyQuiz && quizResult) {

    retryQuiz.addEventListener("click", () => {

        beautyQuiz.reset();

        quizResult.classList.remove("show");

        beautyQuiz.style.display = "block";

        beautyQuiz.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const nameInput =
            document.getElementById("name");

        const name =
            nameInput ? nameInput.value.trim() : "there";

        alert(
            `Thank you, ${name}! 💕\n\n` +
            "Pesan kamu berhasil dikirim."
        );

        contactForm.reset();

    });

}


/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const emailInput =
            newsletterForm.querySelector(
                'input[type="email"]'
            );

        const email =
            emailInput ? emailInput.value.trim() : "";

        if (!email) {

            alert(
                "Masukkan email kamu terlebih dahulu ya! ✨"
            );

            return;
        }

        alert(
            "Welcome to Glow & Go! 💕\n\n" +
            "Kamu berhasil bergabung dengan beauty newsletter kami."
        );

        newsletterForm.reset();

    });

}


/* =========================
   ESCAPE KEY
   Close mobile menu / FAQ
========================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;


    // Close mobile menu
    if (navMenu && menuBtn) {

        navMenu.classList.remove("active");

        menuBtn.textContent = "☰";
    }


    // Close FAQ
    faqQuestions.forEach(question => {

        question.classList.remove("active");

        const answer =
            question.nextElementSibling;

        if (answer) {
            answer.style.maxHeight = null;
        }

    });

});


/* =========================
   WINDOW RESIZE
========================= */

window.addEventListener("resize", () => {

    // Automatically close mobile menu
    // when returning to desktop
    if (
        window.innerWidth > 800 &&
        navMenu &&
        menuBtn
    ) {

        navMenu.classList.remove("active");

        menuBtn.textContent = "☰";
    }

});