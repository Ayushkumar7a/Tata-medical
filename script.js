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