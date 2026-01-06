document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HERO SLIDER
    ========================= */
    const slides = document.querySelectorAll(".slide");
    let slideIndex = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[slideIndex].classList.remove("active");
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add("active");
        }, 4000);
    }

    /* =========================
       DOCTOR FLIP CARDS
    ========================= */
    document.querySelectorAll(".doctor-flip").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
    /* =========================
       APPOINTMENT MODAL
    ========================= */
    const modal = document.getElementById("appointmentModal");
    const closeBtn = document.getElementById("closeAppointment");
    const form = document.querySelector(".appointment-form");

    const openDesktop = document.getElementById("openAppointmentDesktop");
    const openMobile = document.getElementById("openAppointmentMobile");
    const doctorBtns = document.querySelectorAll(".open-appointment");

    function openModal() {
        if (!modal) return;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    // Desktop button
    if (openDesktop) {
        openDesktop.addEventListener("click", openModal);
    }

    // Mobile button
    if (openMobile) {
        openMobile.addEventListener("click", openModal);
    }

    // Doctor cards buttons
    doctorBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevents card flip
            openModal();
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Click outside modal
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Form submit (frontend demo)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Appointment booked successfully! (Frontend demo)");
            form.reset();
            closeModal();
        });
    }

});
/* ================= LIVE DATE & TIME ================= */

function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    const date = now.toLocaleDateString('en-IN', options);
    const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const el = document.getElementById("liveDateTime");
    if (el) {
        el.innerHTML = `🕒 ${date} | ${time}`;
    }
}

/* Update every second */
setInterval(updateDateTime, 1000);

/* Initial call */
updateDateTime();
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
// ================= FIX SCROLL OFFSET (FINAL) =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length <= 1) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        let offset = 0;

        // Desktop header height
        const topBar = document.querySelector(".top-bar");
        const navBar = document.querySelector(".main-nav");

        if (window.innerWidth > 768) {
            offset =
                (topBar ? topBar.offsetHeight : 0) +
                (navBar ? navBar.offsetHeight : 0) +
                10;
        }

        // Mobile header height
        if (window.innerWidth <= 768) {
            const mobileHeader = document.querySelector(".mobile-header");
            offset = mobileHeader ? mobileHeader.offsetHeight + 10 : 70;
        }

        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to cards
document.querySelectorAll('.value-card, .feature-card, .stat-card, .award-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active class to current nav item
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
    }
});

console.log('About page loaded successfully!');