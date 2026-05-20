// =======================
// MENU BURGER
// =======================
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("open");
    nav.classList.toggle("active");
    burger.setAttribute("aria-expanded", isOpen.toString());
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      nav.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// =======================
// SCROLL SPY
// =======================
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav a[href^='#']");

const updateActiveLink = () => {
  let current = sections[0]?.id || "";
  const offset = window.innerHeight * 0.35;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= offset) {
      current = section.id;
    }
  });

  links.forEach(link => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);
window.addEventListener("resize", updateActiveLink);
window.addEventListener("hashchange", updateActiveLink);


// =======================
// SCROLL REVEAL
// =======================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el =>
  observer.observe(el)
);

const projectButtons = document.querySelectorAll(".project-card .more-btn");
projectButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const isOpen = card.classList.toggle("details-active");
    button.textContent = isOpen ? "Voir moins" : "Voir plus";
    button.setAttribute("aria-expanded", isOpen.toString());
    if (isOpen) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});
