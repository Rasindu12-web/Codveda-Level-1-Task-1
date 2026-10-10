
/* =====================================
   INNOVATECH - INTERACTIVE FEATURES
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector("#header");
  const menuToggle = document.querySelector("#menuToggle");
  const navLinks = document.querySelector("#navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const backTop = document.querySelector("#backTop");

  // MOBILE MENU
  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {
    const opened = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute(
      "aria-label",
      opened ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = opened ? "✕" : "☰";
  });

  navItems.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  // HEADER AND BACK TO TOP
  function handleScroll() {
    const scrollY = window.scrollY;

    header.classList.toggle("scrolled", scrollY > 40);
    backTop.classList.toggle("show", scrollY > 500);
  }

  window.addEventListener("scroll", handleScroll, {passive:true});
  handleScroll();

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top:0,
      behavior:reduceMotion.matches ? "auto" : "smooth"
    });
  });

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold:0.08
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // ACTIVE NAVIGATION
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNav() {
    let current = "home";
    const position = window.scrollY + 150;

    sections.forEach(section => {
      if (position >= section.offsetTop) {
        current = section.id;
      }
    });

    navItems.forEach(link => {
      const active = link.getAttribute("href") === "#" + current;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener(
    "scroll",
    updateActiveNav,
    {passive:true}
  );

  updateActiveNav();

  // COPYRIGHT YEAR
  document.querySelector("#year").textContent =
    new Date().getFullYear();

  console.log("InnovaTech Premium Website Ready!");
});
