/* Minimal progressive enhancement. The site is fully functional without it. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- Colour theme toggle ---------------------------------------------- */
  var toggle = document.querySelector(".theme-toggle");
  function effectiveTheme() {
    // Light is the default; dark is opt-in via the toggle (and remembered).
    return root.getAttribute("data-theme") || "light";
  }
  function syncPressed() {
    if (toggle) toggle.setAttribute("aria-pressed", effectiveTheme() === "dark" ? "true" : "false");
  }
  if (toggle) {
    syncPressed();
    toggle.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncPressed();
    });
  }

  /* ---- Mobile navigation ------------------------------------------------- */
  var navBtn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-primary");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        navBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Print CV (all data-print buttons: header + hero) ------------------ */
  document.querySelectorAll("[data-print]").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });

  /* ---- Scroll reveal ----------------------------------------------------- */
  if (root.classList.contains("anim") && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }
}());
