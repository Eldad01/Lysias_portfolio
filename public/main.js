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

// =======================
// PROJECT CARDS TOGGLE
// =======================
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

// =======================
// SCROLL-TO-TOP BUTTON
// =======================
const scrollTopBtn = document.querySelector(".scroll-top");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// PARALLAX EFFECT (Subtle)
// =======================
const parallaxElements = document.querySelectorAll(".hero-image img");
if (parallaxElements.length > 0) {
  window.addEventListener("scroll", () => {
    parallaxElements.forEach(el => {
      const scrollPosition = window.scrollY;
      const elementPosition = el.offsetTop;
      const distance = elementPosition - scrollPosition;
      
      if (distance > -500 && distance < window.innerHeight) {
        el.style.transform = `translateY(${distance * 0.05}px)`;
      }
    });
  });
}

// =======================
// CARD HOVER 3D EFFECT
// =======================
const cards = document.querySelectorAll(".about-card, .project-card, .soft-skill-card");
cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) * 0.02;
    const rotateY = (centerX - x) * 0.02;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// =======================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// =======================
// SKILL BARS ANIMATION ON SCROLL
// =======================
const skillBars = document.querySelectorAll(".skill-bar div");
let skillsAnimated = false;

const animateSkills = () => {
  if (skillsAnimated) return;
  
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;
  
  const sectionRect = skillsSection.getBoundingClientRect();
  
  if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
    skillBars.forEach(bar => {
      bar.style.animation = `slideRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    });
    skillsAnimated = true;
  }
};

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

