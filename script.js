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


// mobile nav-bar

function updateTataMobileDateTime() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const dateElement = document.getElementById('tataMobileDate');
    const timeElement = document.getElementById('tataMobileTime');

    if (dateElement) {
        dateElement.textContent = day + ', ' + date + ' ' + month + ' ' + year;
    }
    if (timeElement) {
        timeElement.textContent = hours + ':' + minutes + ':' + seconds;
    }
}

// Update immediately and then every second
updateTataMobileDateTime();
setInterval(updateTataMobileDateTime, 1000);


/* =========================
   SCROLL REVEAL ANIMATION ✅
========================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach((el) => {
        const revealTop = el.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

// Run once on load
revealOnScroll();

// Run on scroll
window.addEventListener("scroll", revealOnScroll);