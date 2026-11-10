const loader = document.querySelector(".loader");
const loaderNumber = document.querySelector(".loader-number");

let pageLoaded = document.readyState === "complete";
let introStarted = false;

window.addEventListener("load", () => {
  pageLoaded = true;
}, { once: true });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function animateProgress(from, to, duration) {
  const steps = to - from;
  const delay = duration / steps;

  for (let i = from + 1; i <= to; i++) {
    loaderNumber.textContent = i + "%";
    await sleep(delay);
  }
}

async function startIntro() {
  if (introStarted) return;

  introStarted = true;

  await animateProgress(0, 30, 1300);
  await sleep(800);

  await animateProgress(30, 65, 1700);
  await sleep(1100);

  await animateProgress(65, 90, 1300);

  while (!pageLoaded) {
    await sleep(150);
  }

  await animateProgress(90, 100, 800);
  await sleep(450);

  loader.classList.add("show-greeting");

  await sleep(3900);

  loader.classList.add("hide");

  await sleep(1100);

  loader.style.display = "none";
}

startIntro();

const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

const hasFinePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (hasFinePointer && cursor && dot) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a,button,.skill-row,.project-card").forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });
}

const creative = document.querySelector(".creative");

if (creative && hasFinePointer) {
  creative.addEventListener("mousemove", event => {
    const rect = creative.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const shiftX = (x - 0.5) * 18;
    const shiftY = (y - 0.5) * 15;

    creative.style.transform =
      `scaleY(1.08) translate(${shiftX}px,${shiftY}px) skewX(${(x - 0.5) * 5}deg)`;

    creative.style.textShadow =
      `${(x - 0.5) * 9}px ${Math.sin(x * 8) * 5}px 0 rgba(160,135,90,.22),
       ${Math.sin(y * 9) * -7}px ${(y - 0.5) * 7}px 0 rgba(0,0,0,.12)`;
  });

  creative.addEventListener("mouseleave", () => {
    creative.style.transform = "scaleY(1.08)";
    creative.style.textShadow = "none";
  });
}

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".navigation nav");

function closeMenu() {
  if (!menuBtn || !nav) return;

  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 560) closeMenu();
  });
}

const revealElements = document.querySelectorAll(
  ".portrait-card,.about-content,.skill-row,.project-card,.journal-item"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity .8s ease, transform .8s ease";

    revealObserver.observe(element);
  });

  const revealStyle = document.createElement("style");
  revealStyle.textContent = `
    .visible{opacity:1!important;transform:translateY(0)!important}
  `;

  document.head.appendChild(revealStyle);
}

if (hasFinePointer && !prefersReducedMotion) {
  document.querySelectorAll(".project-card").forEach(card => {
    const visual = card.querySelector(".project-visual");

    if (!visual) return;

    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      visual.style.transform =
        `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) scale(.99)`;
    });

    card.addEventListener("mouseleave", () => {
      visual.style.transform = "";
    });
  });
}

if (hasFinePointer) {
  document.querySelectorAll(".skill-row").forEach(row => {
    row.addEventListener("mousemove", event => {
      const rect = row.getBoundingClientRect();
      const x = event.clientX - rect.left;

      row.style.background =
        `radial-gradient(circle at ${x}px 50%,#29251c 0%,#151515 45%,transparent 85%)`;
    });

    row.addEventListener("mouseleave", () => {
      row.style.background = "";
    });
  });
                                                            }
