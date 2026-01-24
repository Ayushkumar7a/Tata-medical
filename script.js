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
    if (openDesktop) openDesktop.addEventListener("click", openModal);

    // Mobile button
    if (openMobile) openMobile.addEventListener("click", openModal);

    // Doctor cards buttons
    doctorBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal();
        });
    });

    // Close button
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

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
            alert("✅ Appointment booked successfully! (Frontend demo)");
            form.reset();
            closeModal();
        });
    }


    /* ===============================
       ✅ LIVE DATE & TIME (DESKTOP + MOBILE)
    ================================ */
    function updateDesktopDateTime() {
        const el = document.getElementById("liveDateTime");
        if (!el) return;

        const now = new Date();

        const date = now.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const time = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        el.innerHTML = `🕒 ${date} | ${time}`;
    }

    function updateMobileDateTime() {
        const dateEl = document.getElementById("tataMobileDate");
        const timeEl = document.getElementById("tataMobileTime");
        if (!dateEl || !timeEl) return;

        const now = new Date();

        dateEl.textContent = now.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        timeEl.textContent = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }

    // Run once + update every second
    updateDesktopDateTime();
    updateMobileDateTime();

    setInterval(() => {
        updateDesktopDateTime();
        updateMobileDateTime();
    }, 1000);


    /* =========================
       FIX SCROLL OFFSET (FINAL)
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
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
            } else {
                // Mobile header height
                const mobileHeader = document.querySelector(".tata-mobile-header") || document.querySelector(".mobile-header");
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

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);


    /* =========================
       APPOINTMENT POPUP CONTROL
    ========================= */
    const openPopupBtns = document.querySelectorAll(".open-appointment-popup");
    const popup = document.querySelector(".appointment-popup");
    const popupCloseBtn = document.querySelector(".popup-close");

    if (openPopupBtns.length > 0 && popup) {
        openPopupBtns.forEach((btn) => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                popup.classList.add("active");
            });
        });
    }

    if (popupCloseBtn && popup) {
        popupCloseBtn.addEventListener("click", function() {
            popup.classList.remove("active");
        });
    }

    if (popup) {
        popup.addEventListener("click", function(e) {
            if (e.target === popup) {
                popup.classList.remove("active");
            }
        });

        const popupForm = popup.querySelector(".popup-form");
        if (popupForm) {
            popupForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert("✅ Appointment Booked Successfully!");
                popupForm.reset();
                popup.classList.remove("active");
            });
        }
    }


    /* =========================
       ✅ Navbar floating -> full width on scroll
    ========================= */
    window.addEventListener("scroll", () => {
        const nav = document.querySelector(".main-nav");
        if (!nav) return;

        if (window.scrollY > 40) nav.classList.add("nav-scrolled");
        else nav.classList.remove("nav-scrolled");
    });


    /* =========================
       ✅ Premium navbar scroll effect
    ========================= */
    window.addEventListener("scroll", () => {
        const nav = document.querySelector(".premium-nav");
        if (!nav) return;

        if (window.scrollY > 20) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
    });

});



// ✅ COUNTER ANIMATION ON SCROLL (Runs only once)
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");

    if (!counters.length) return;

    const speed = 120; // smaller = faster

    const startCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        let count = 0;

        const update = () => {
            const increment = target / speed;
            count += increment;

            if (count < target) {
                counter.innerText = Math.floor(count) + suffix;
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + suffix;
            }
        };

        update();
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    obs.unobserve(entry.target); // ✅ run once
                }
            });
        }, { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
});

document.addEventListener("DOMContentLoaded", () => {

    const galleryLinks = document.querySelectorAll(".gallery-item a"); // ✅ a tag
    const preview = document.getElementById("galleryPreview");
    const previewImg = document.getElementById("galleryPreviewImg");
    const closeBtn = document.getElementById("galleryCloseBtn");

    if (!galleryLinks.length || !preview || !previewImg || !closeBtn) return;

    galleryLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // ✅ browser image open nahi karega
            const img = link.querySelector("img");
            previewImg.src = img.src;
            preview.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        preview.classList.remove("active");
    });

    preview.addEventListener("click", (e) => {
        if (e.target === preview) preview.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") preview.classList.remove("active");
    });

});