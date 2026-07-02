/* =========================================================
   script.js
   Interactivity for the product website:
   - mobile nav (hamburger + smooth scroll close)
   - phone screen tab switcher (Home Page / Calendar / Notification)
   - contact form validation + success state
   - back-to-top button + toast notice

   This is a viewing/demo site — all content and images are
   edited directly in index.html / css / assets, not on the
   live page.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- AOS (scroll animation framework) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: function () {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
    });
  }

  /* ---------- toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2600);
  }

  /* ---------- mobile nav ---------- */
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");
  function closeNav() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
  hamburger.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  document.querySelectorAll(".nav-link, .btn-nav-cta").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });
  document.addEventListener("click", function (e) {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      closeNav();
    }
  });

  /* ---------- hero phone: tab switcher ---------- */
  // EDIT: add/remove paths here — each one becomes a swipeable screenshot
  var screens = {
    home: { label: "HOME PAGE", images: [
      "assets/screenshots/home.png",
      "assets/screenshots/admin.png"
    ] },
    event: { label: "EVENTS", images: [
      "assets/screenshots/event.png",
      "assets/screenshots/event-2.png",
      "assets/screenshots/attandance.png",
      "assets/screenshots/avents.png"
    ] },
    gamified: { label: "GAMIFIED", images: [
      "assets/screenshots/gamified.png",
      "assets/screenshots/gamified-2.png",
      "assets/screenshots/gamified-3.png",
      "assets/screenshots/challenge.png",
      "assets/screenshots/challenge-2.png",
      "assets/screenshots/challenge-3.png"
    ] },
    user: { label: "USER MANAGEMENT", images: [
      "assets/screenshots/user.png",
      "assets/screenshots/user-2.png",
      "assets/screenshots/user-3.png"
    ] },
    progress: { label: "PROGRESS TRACKING", images: [
      "assets/screenshots/lesson.png",
      "assets/screenshots/statistics.png",
      "assets/screenshots/calendar.png"
    ] }
  };
  var phoneScroll = document.getElementById("phoneScroll");
  var scrollDots = document.getElementById("scrollDots");
  var phoneCaption = document.getElementById("phoneCaption");
  var tabs = document.querySelectorAll(".app-tab");

  function setScreen(key) {
    var data = screens[key];
    phoneCaption.textContent = data.label;
    tabs.forEach(function (t) { t.classList.toggle("active", t.dataset.screen === key); });

    phoneScroll.innerHTML = "";
    scrollDots.innerHTML = "";
    data.images.forEach(function (src, i) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = data.label + " screenshot " + (i + 1);
      phoneScroll.appendChild(img);

      var dot = document.createElement("span");
      dot.className = "scroll-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", function () {
        phoneScroll.scrollTo({ left: i * phoneScroll.clientWidth, behavior: "smooth" });
      });
      scrollDots.appendChild(dot);
    });
    phoneScroll.scrollLeft = 0;
  }

  phoneScroll.addEventListener("scroll", function () {
    var index = Math.round(this.scrollLeft / this.clientWidth);
    scrollDots.querySelectorAll(".scroll-dot").forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
    });
  });

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { setScreen(tab.dataset.screen); });
  });

  setScreen("home"); // draw the first tab on page load

  // desktop mouse-wheel → horizontal scroll
  phoneScroll.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      phoneScroll.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  /* ---------- back to top ---------- */
  var toTop = document.getElementById("toTop");
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 200);
  });
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
