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
      var mc = document.querySelector('meta[name="theme-color"]');
      if (mc) mc.setAttribute("content", next === "dark" ? mc.getAttribute("data-dark") : mc.getAttribute("data-light"));
      syncPressed();
    });
  }

  /* ---- Mobile navigation ------------------------------------------------- */
  var navBtn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-primary");
  if (navBtn && nav) {
    function closeNav(focusToggle) {
      nav.classList.remove("open");
      navBtn.setAttribute("aria-expanded", "false");
      if (focusToggle) navBtn.focus();
    }
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) closeNav(true);
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

  /* ---- Progressive disclosure ("show all" toggles) ---------------------- */
  document.querySelectorAll("[data-more]").forEach(function (btn) {
    var wrap = document.getElementById(btn.getAttribute("data-more"));
    if (!wrap) return;
    btn.addEventListener("click", function () {
      var collapsed = wrap.classList.toggle("is-collapsed");
      btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    });
  });

  /* ---- Active-section mark (drives the red square in the nav) ------------- */
  var spyNav = document.getElementById("nav-primary");
  if (spyNav && "IntersectionObserver" in window) {
    var spyMap = {};
    spyNav.querySelectorAll('a[href*="#"]').forEach(function (a) {
      var id = a.getAttribute("href").split("#")[1];
      if (id && document.getElementById(id)) spyMap[id] = a;
    });
    var spyIds = Object.keys(spyMap);
    if (spyIds.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var cur = en.target.id;
          spyIds.forEach(function (id) {
            if (id === cur) spyMap[id].setAttribute("aria-current", "true");
            else spyMap[id].removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      spyIds.forEach(function (id) { spy.observe(document.getElementById(id)); });
    }
  }
}());
