
/* =========================================
   SEMIH.DEV — JAVASCRIPT
========================================= */


/* =========================================
   BOUTON JOUR / NUIT
========================================= */

const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    if (themeIcon) {
        themeIcon.textContent = isLight ? "☾" : "☀";
    }

    if (themeButton) {
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Activer le thème sombre" : "Activer le thème clair"
        );

        themeButton.setAttribute(
            "title",
            isLight ? "Passer en mode nuit" : "Passer en mode jour"
        );
    }

    if (themeColor) {
        themeColor.setAttribute(
            "content",
            isLight ? "#F3F2ED" : "#0B0B0E"
        );
    }
}

// Récupération du thème enregistré
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

updateThemeButton();

// Changement de thème
if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton();
    });
}


/* =========================================
   ANIMATION D'ÉCRITURE — ACCUEIL
========================================= */

const typingText = document.getElementById("typing-text");

const typingWords = [
    "Étudiant en BTS SIO SISR",
    "Pilote d'activité chez Orange",
    "Passionné d'informatique"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
    if (!typingText) return;

    const currentWord = typingWords[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        delay = 1800;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        delay = 400;
    }

    setTimeout(typeWriter, delay);
}

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (typingText) {
    if (!reduceMotion) {
        typeWriter();
    } else {
        typingText.textContent = typingWords[0];
    }
}


/* =========================================
   ANIMATIONS AU DÉFILEMENT
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================================
   NAVIGATION ACTIVE
========================================= */

// Pages séparées
const currentPage = window.location.pathname
    .split("/")
    .pop() || "index.html";

const pageLinks = document.querySelectorAll(".nav-links a");

pageLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

// Anciennes sections avec ancres
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length > 0) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    pageLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === "#" + sectionId;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* =========================================
   ANNÉE AUTOMATIQUE
========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   INTRO HACKING — PAGE VEILLE TECHNOLOGIQUE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("hacking-intro");

    // Ne rien faire sur les autres pages
    if (!intro) return;

    const consoleLines = intro.querySelectorAll(".terminal-console p");
    const progress = document.getElementById("terminal-progress-fill");
    const loading = document.getElementById("terminal-loading");
    const skipButton = document.getElementById("skip-intro");
    const matrixLayer = document.getElementById("matrix-layer");

    const alreadySeen = sessionStorage.getItem("veilleIntroSeen");
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let finished = false;
    const timers = [];

    function schedule(callback, delay) {
        const timer = setTimeout(callback, delay);
        timers.push(timer);
    }

    function finishIntro() {
        if (finished) return;
        finished = true;

        timers.forEach(clearTimeout);

        sessionStorage.setItem("veilleIntroSeen", "true");

        intro.classList.add("intro-hidden");

        setTimeout(() => {
            intro.remove();
        }, 700);
    }

    // Génération des caractères verts
    function createMatrix() {
        const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
        const columnCount = window.innerWidth < 600 ? 16 : 35;

        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement("span");

            column.className = "matrix-character";
            column.textContent = Array.from(
                { length: 18 },
                () => characters[Math.floor(Math.random() * characters.length)]
            ).join("\n");

            column.style.left = `${(i / columnCount) * 100}%`;
            column.style.animationDuration = `${4 + Math.random() * 7}s`;
            column.style.animationDelay = `${Math.random() * 5}s`;

            matrixLayer.appendChild(column);
        }
    }

    // Déjà affichée pendant cette session
    if (alreadySeen || reducedMotion) {
        intro.remove();
        return;
    }

    createMatrix();

    // Déroulement de l'animation
    const delays = [450, 950, 1450, 1950, 2450];

    delays.forEach((delay, index) => {
        schedule(() => {
            if (finished) return;

            consoleLines[index].classList.add("visible");
            progress.style.width = `${(index + 1) * 20}%`;

            if (index === consoleLines.length - 1) {
                loading.textContent = "CONNEXION SÉCURISÉE — REDIRECTION...";
                schedule(finishIntro, 850);
            }
        }, delay);
    });

    // Bouton pour passer l'introduction
    skipButton.addEventListener("click", finishIntro);
});


/* =====================================================
   ANIMATIONS — PAGE DÉMONSTRATION DES ÉPREUVES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".epreuves-page");
    if (!page) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Barre de progression de lecture
    const progressBar = document.createElement("div");
    progressBar.className = "epreuves-scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.appendChild(progressBar);

    let ticking = false;

    function updateReadingProgress() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0
            ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
            : 0;

        progressBar.style.width = `${progress}%`;
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateReadingProgress);
            ticking = true;
        }
    }, { passive: true });

    updateReadingProgress();

    // Apparition progressive des trois axes
    const cards = page.querySelectorAll("[data-epreuve-card]");

    if (!reduceMotion && "IntersectionObserver" in window) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("epreuve-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16, rootMargin: "0px 0px -35px 0px" });

        cards.forEach((card, index) => {
            card.classList.add("epreuve-animate");
            card.style.transitionDelay = `${index * 120}ms`;

            const cleanRevealStyles = (event) => {
                if (event.target !== card || event.propertyName !== "opacity") return;

                card.classList.remove("epreuve-animate");
                card.style.removeProperty("transition-delay");
                card.removeEventListener("transitionend", cleanRevealStyles);
            };

            card.addEventListener("transitionend", cleanRevealStyles);
            cardObserver.observe(card);
        });
    } else {
        cards.forEach((card) => card.classList.add("epreuve-visible"));
    }

    // Inclinaison légère au survol, uniquement avec une souris
    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        cards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1100px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.2).toFixed(2)}deg) translateY(-3px)`;
            });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });
    }
});


/* =====================================================
   ACCUEIL — LOGO EN VERRE LIQUIDE + ENTRÉE DU TITRE
===================================================== */

(() => {
    const hero = document.querySelector(".glass-hero");
    if (!hero) return;

    const stage = hero.querySelector("[data-glass-stage]");
    const yearEl = document.getElementById("hero-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 1. Découpe du titre en lettres (chacune animée avec un petit décalage)
    let index = 0;
    hero.querySelectorAll("[data-split]").forEach((line) => {
        const parts = Array.from(line.childNodes);
        line.textContent = "";
        parts.forEach((node) => {
            const target = node.nodeType === Node.TEXT_NODE ? line : node;
            const text = node.textContent;
            if (node.nodeType !== Node.TEXT_NODE) {
                node.textContent = "";
                line.appendChild(node);
            }
            Array.from(text).forEach((char) => {
                const wrap = document.createElement("span");
                wrap.className = "glass-hero__char";
                const inner = document.createElement("span");
                inner.textContent = char;
                inner.style.setProperty("--i", index++);
                wrap.appendChild(inner);
                target.appendChild(wrap);
            });
        });
    });

    // 2. Lancement de la chorégraphie
    let live = false;
    function goLive() {
        if (live) return;
        live = true;
        hero.classList.add("is-live");
        // Quand toutes les lettres sont en place, le survol reprend la main
        setTimeout(() => hero.classList.add("is-done"), 350 + index * 45 + 950);
    }
    // Sécurité : le texte apparaît même si le WebGL tarde
    setTimeout(goLive, 1200);

    // 3. Logo « S. » en verre liquide, aux couleurs du thème
    const css = (name) => getComputedStyle(document.body).getPropertyValue(name).trim();

    function logoSvg(isLight) {
        const ink = isLight ? "#141414" : "#F2F1EC";
        const dot = isLight ? "#5C8000" : "#D4FF3A";
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path fill="${ink}" d="M8 8H72V28H28V40H72V92H8V72H52V60H8Z"/>
            <rect fill="${dot}" x="78" y="72" width="20" height="20"/>
        </svg>`;
    }

    function themeOptions() {
        const isLight = document.body.classList.contains("light-theme");
        const bg = css("--bg") || (isLight ? "#F3F2ED" : "#0B0B0E");
        return {
            logo: logoSvg(isLight),
            look: isLight ? "light" : "dark",
            background: bg,
            plateColor: isLight ? "#FFFFFF" : "#15151B",
            originalColors: true,
            iconPlate: !isLight,
            tileSize: 300,
            logoScale: 0.6,
            finalScale: isLight ? 0.85 : 1,
            hold: 3.5,
        };
    }

    if (stage && window.GlassReveal) {
        const reveal = window.GlassReveal.mount(stage, {
            ...themeOptions(),
            onStart: goLive,
        });

        // Changement de thème : on repeint le verre sans recréer le canvas
        new MutationObserver(() => reveal.update(themeOptions()))
            .observe(document.body, { attributes: true, attributeFilter: ["class"] });
    } else {
        goLive();
    }

    // 4. Halo qui suit la souris
    if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
        let frame = 0;
        hero.addEventListener("pointermove", (event) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();
                hero.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                hero.style.setProperty("--my", `${event.clientY - rect.top}px`);
                frame = 0;
            });
        });
    }
})();


/* =====================================================
   MENU MOBILE (toutes les pages)
===================================================== */

(() => {
    const links = document.querySelector(".nav-links");
    const actions = document.querySelector(".nav-actions");
    if (!links || !actions) return;

    const bar = links.closest(".navbar") || links.parentElement;
    links.id = links.id || "menu-principal";

    const burger = document.createElement("button");
    burger.type = "button";
    burger.className = "nav-burger";
    burger.setAttribute("aria-label", "Ouvrir le menu");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-controls", links.id);
    burger.innerHTML = "<span></span><span></span><span></span>";
    actions.appendChild(burger);

    function setOpen(open) {
        bar.classList.toggle("nav-open", open);
        document.body.classList.toggle("menu-open", open);
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }

    burger.addEventListener("click", () => setOpen(!bar.classList.contains("nav-open")));
    links.addEventListener("click", (event) => {
        if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });
    window.matchMedia("(min-width: 1181px)").addEventListener("change", (event) => {
        if (event.matches) setOpen(false);
    });
})();
