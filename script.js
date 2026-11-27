
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
        // Icônes au trait (lune en mode clair, soleil en mode sombre)
        themeIcon.innerHTML = isLight
            ? '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>'
            : '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
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
    "Passionné d'informatique",
    "Cap sur la cybersécurité"
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

    // L'intro se joue à chaque visite (elle prolonge l'animation de hacking du clic)
    if (reducedMotion) {
        intro.remove();
        return;
    }

    createMatrix();

    // Déroulement de l'animation
    const delays = [180, 420, 660, 900, 1140];

    delays.forEach((delay, index) => {
        schedule(() => {
            if (finished) return;

            consoleLines[index].classList.add("visible");
            progress.style.width = `${(index + 1) * 20}%`;

            if (index === consoleLines.length - 1) {
                loading.textContent = "CONNEXION SÉCURISÉE — REDIRECTION...";
                schedule(finishIntro, 550);
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


/* =====================================================
   MOUVEMENT — COMMUN À TOUTES LES PAGES
===================================================== */

(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Apparitions décalées : les éléments .reveal d'un même parent arrivent l'un après l'autre
    const groups = new Map();
    document.querySelectorAll(".reveal").forEach((el) => {
        const list = groups.get(el.parentElement) || [];
        list.push(el);
        groups.set(el.parentElement, list);
    });
    groups.forEach((list) => {
        list.forEach((el, i) => el.style.setProperty("--stagger", `${Math.min(i, 6) * 80}ms`));
    });

    // 2. Titres de page : découpe en mots
    if (motionOK) {
        document.querySelectorAll(".page-heading h1, .pg-hero__title").forEach((title) => {
            let w = 0;
            const wrapWord = (content) => {
                const outer = document.createElement("span");
                outer.className = "split-word";
                const inner = document.createElement("span");
                inner.style.setProperty("--w", w++);
                if (typeof content === "string") inner.textContent = content;
                else inner.appendChild(content);
                outer.appendChild(inner);
                return outer;
            };
            Array.from(title.childNodes).forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const frag = document.createDocumentFragment();
                    node.textContent.split(/(\s+)/).forEach((part) => {
                        if (!part) return;
                        frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(" ") : wrapWord(part));
                    });
                    title.replaceChild(frag, node);
                } else if (node.nodeName !== "BR") {
                    const placeholder = document.createComment("");
                    title.replaceChild(placeholder, node);
                    title.replaceChild(wrapWord(node), placeholder);
                }
            });
        });
    }

    // 3. Cartes : lumière qui suit la souris
    const cards = document.querySelectorAll([
        ".profile-card", ".objective-card", ".project-card", ".contact-card", ".contact-info",
        ".experience-main", ".experience-secondary", ".summary-card", ".timeline-content",
        ".news-card", ".explanation-card", ".skill-row", ".skills-tools", ".security-action",
        ".skills-note", ".profile-intro"
    ].join(","));
    cards.forEach((card) => {
        card.classList.add("spot");
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--y", `${event.clientY - rect.top}px`);
        });
    });

    // 4. Icônes : le trait se dessine à l'apparition
    document.querySelectorAll(".icon-box").forEach((box) => {
        box.querySelectorAll(".ui-icon *").forEach((shape) => shape.setAttribute("pathLength", "1"));
        if (motionOK) box.classList.add("icon-draw");
        const holder = box.closest(".reveal");
        if (!holder) box.classList.add("visible");
    });

    // 5. Barre de lecture (sauf accueil, qui tient sur un écran)
    if (!document.body.classList.contains("page-single") && !document.querySelector(".epreuves-page")) {
        const bar = document.createElement("div");
        bar.className = "read-progress";
        bar.setAttribute("aria-hidden", "true");
        document.body.appendChild(bar);
        let ticking = false;
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
            ticking = false;
        };
        window.addEventListener("scroll", () => {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
    }

    // 6. Clic sur « Veille technologique » : animation d'intrusion avant d'ouvrir la page
    const HACK_LINES = [
        "&gt; ssh semih@veille.sisr -p 2222",
        "&gt; scan des ports ............ <b>22 · 80 · 443</b>",
        "&gt; contournement du pare-feu ... <b>OK</b>",
        "&gt; déchiffrement AES-256 ...... <b>OK</b>",
        "&gt; <b>ACCÈS AUTORISÉ</b> — ouverture de la veille",
    ];
    const HACK_DURATION = 1300;

    document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href$="veille.html"]');
        if (!link || !motionOK) return;
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || link.target === "_blank") return;
        event.preventDefault();
        if (document.querySelector(".hack-transition")) return;

        const overlay = document.createElement("div");
        overlay.className = "hack-transition";
        overlay.setAttribute("role", "status");
        overlay.style.setProperty("--hack-dur", `${HACK_DURATION}ms`);
        overlay.innerHTML = `
            <div class="hack-transition__box">
                <p class="hack-transition__title">INTRUSION_</p>
                <div class="hack-transition__lines"></div>
                <div class="hack-transition__bar"><span></span></div>
            </div>`;
        document.body.classList.add("is-hacking");
        document.body.appendChild(overlay);

        const lines = overlay.querySelector(".hack-transition__lines");
        HACK_LINES.forEach((html, i) => {
            setTimeout(() => {
                const p = document.createElement("p");
                p.className = "hack-transition__line";
                p.innerHTML = html;
                lines.appendChild(p);
            }, 120 + i * 220);
        });

        setTimeout(() => { window.location.href = link.href; }, HACK_DURATION + 120);
    });

    // Retour arrière depuis la veille : on retire l'overlay resté en cache
    window.addEventListener("pageshow", (event) => {
        if (!event.persisted) return;
        document.querySelector(".hack-transition")?.remove();
        document.body.classList.remove("is-hacking");
    });
})();


/* =====================================================
   ONGLETS — FORMATS ANIMÉS
   (Épreuves, Formation, Expérience, Projets, Compétences, Contact)
===================================================== */

(() => {
    if (!document.body.classList.contains("page-onglet")) return;

    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const onScroll = [];

    // 1. Grand numéro de l'en-tête : léger effet de profondeur
    const index = document.querySelector(".pg-hero__index");
    if (index && motionOK) {
        onScroll.push(() => {
            index.style.setProperty("--parallax", `${Math.min(window.scrollY, 600) * 0.25}px`);
        });
    }

    // 2. Épreuves : panneaux qui s'ouvrent au survol, au clic ou au clavier
    const panels = document.querySelectorAll("[data-panel]");
    const desktop = window.matchMedia("(min-width: 1001px)");
    const openPanel = (panel) => {
        panels.forEach((p) => p.classList.toggle("is-active", p === panel));
    };
    panels.forEach((panel) => {
        panel.addEventListener("mouseenter", () => desktop.matches && openPanel(panel));
        panel.addEventListener("focusin", () => openPanel(panel));
        panel.addEventListener("click", () => openPanel(panel));
        panel.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                if (event.target === panel) { event.preventDefault(); openPanel(panel); }
            }
        });
    });

    // 3. Formation : la frise se remplit avec le défilement
    const timeline = document.querySelector("[data-timeline]");
    if (timeline) {
        const fill = timeline.querySelector(".fm-timeline__line span");
        const items = timeline.querySelectorAll("[data-timeline-item]");
        onScroll.push(() => {
            const rect = timeline.getBoundingClientRect();
            const mark = window.innerHeight * 0.82;
            fill.style.setProperty("--fill", clamp((mark - rect.top) / rect.height, 0, 1).toFixed(3));
            items.forEach((item) => {
                item.classList.toggle("is-on", item.getBoundingClientRect().top < mark || !motionOK);
            });
        });
    }

    // 4. Expérience : la carte recouverte recule légèrement
    const stackCards = Array.from(document.querySelectorAll("[data-stack-card]"));
    if (stackCards.length && motionOK) {
        onScroll.push(() => {
            stackCards.forEach((card, i) => {
                const next = stackCards[i + 1];
                if (!next) return;
                const r = card.getBoundingClientRect();
                const n = next.getBoundingClientRect();
                const p = clamp((r.bottom - n.top) / r.height, 0, 1);
                card.style.setProperty("--shrink", (1 - p * 0.05).toFixed(4));
                card.style.setProperty("--dim", (1 - p * 0.35).toFixed(3));
            });
        });
    }

    // 5. Projets : les terminaux tapent leur commande quand ils apparaissent
    const terms = document.querySelectorAll(".pj-term");
    if (terms.length && "IntersectionObserver" in window) {
        const typeIn = (term) => {
            const cmd = term.querySelector("[data-type]");
            const text = cmd.dataset.type;
            if (!motionOK) { cmd.textContent += text; term.classList.add("is-typed"); return; }
            let i = 0;
            const step = () => {
                cmd.textContent = "$ " + text.slice(0, ++i);
                if (i < text.length) setTimeout(step, 45 + Math.random() * 40);
                else setTimeout(() => term.classList.add("is-typed"), 200);
            };
            step();
        };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { typeIn(entry.target); io.unobserve(entry.target); }
            });
        }, { threshold: 0.5 });
        terms.forEach((t) => io.observe(t));
    }

    // 6. Compétences : onglets accessibles avec pastille qui glisse
    const tabsRoot = document.querySelector("[data-tabs]");
    if (tabsRoot) {
        const tabs = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
        const indicator = tabsRoot.querySelector(".sk-tabs__indicator");
        const place = (tab) => {
            indicator.style.setProperty("--y", `${tab.offsetTop}px`);
            indicator.style.setProperty("--h", `${tab.offsetHeight}px`);
        };
        const select = (tab, focus) => {
            tabs.forEach((t) => {
                const on = t === tab;
                t.setAttribute("aria-selected", String(on));
                t.tabIndex = on ? 0 : -1;
                const pane = document.getElementById(t.getAttribute("aria-controls"));
                if (on) {
                    pane.hidden = false;
                    // relance l'animation d'entrée du panneau
                    pane.style.animation = "none";
                    void pane.offsetWidth;
                    pane.style.animation = "";
                } else {
                    pane.hidden = true;
                }
            });
            place(tab);
            if (focus) tab.focus();
        };
        tabs.forEach((tab, i) => {
            tab.addEventListener("click", () => select(tab));
            tab.addEventListener("keydown", (event) => {
                const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
                if (event.key in keys) {
                    event.preventDefault();
                    select(tabs[(i + keys[event.key] + tabs.length) % tabs.length], true);
                } else if (event.key === "Home") { event.preventDefault(); select(tabs[0], true); }
                else if (event.key === "End") { event.preventDefault(); select(tabs[tabs.length - 1], true); }
            });
        });
        const current = () => tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
        place(current());
        window.addEventListener("resize", () => place(current()));
        document.fonts?.ready.then(() => place(current()));
    }

    // 7. Contact : mot qui change, compteur, envoi sans quitter la page
    const rotator = document.querySelector("[data-rotate]");
    if (rotator && motionOK) {
        const words = Array.from(rotator.children);
        let k = 0;
        setInterval(() => {
            const out = words[k];
            k = (k + 1) % words.length;
            out.classList.remove("is-on");
            out.classList.add("is-out");
            words[k].classList.remove("is-out");
            words[k].classList.add("is-on");
            setTimeout(() => out.classList.remove("is-out"), 700);
        }, 2400);
    }

    const form = document.querySelector("[data-contact-form]");
    if (form) {
        const message = form.querySelector("#message");
        const count = form.querySelector("[data-count]");
        const feedback = form.querySelector(".ct-feedback");
        const button = form.querySelector(".ct-send");
        const label = button.querySelector(".uiverse-cta__text");

        message.addEventListener("input", () => { count.textContent = message.value.length; });

        form.addEventListener("submit", async (event) => {
            if (!window.fetch) return; // envoi classique
            event.preventDefault();
            feedback.classList.remove("is-error");
            feedback.textContent = "";
            form.classList.add("is-sending");
            button.disabled = true;
            label.textContent = "Envoi…";
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { Accept: "application/json" },
                });
                if (!response.ok) throw new Error("Réponse " + response.status);
                form.reset();
                count.textContent = "0";
                label.textContent = "Message envoyé ✓";
                feedback.textContent = "Merci, votre message est bien parti. Je vous réponds dès que possible.";
                setTimeout(() => {
                    label.textContent = "Envoyer le message";
                    button.disabled = false;
                    form.classList.remove("is-sending");
                }, 4000);
            } catch (error) {
                // En cas de souci réseau, on bascule sur l'envoi classique du formulaire
                feedback.classList.add("is-error");
                feedback.textContent = "Petit souci d'envoi, nouvel essai…";
                form.classList.remove("is-sending");
                HTMLFormElement.prototype.submit.call(form);
            }
        });
    }

    // Boucle de défilement unique, synchronisée sur l'affichage
    if (onScroll.length) {
        let ticking = false;
        const run = () => { onScroll.forEach((fn) => fn()); ticking = false; };
        window.addEventListener("scroll", () => {
            if (!ticking) { ticking = true; requestAnimationFrame(run); }
        }, { passive: true });
        window.addEventListener("resize", run);
        run();
    }
})();


/* =====================================================
   VEILLE — TITRES DÉCHIFFRÉS + COMPTEURS
===================================================== */

(() => {
    if (!document.body.classList.contains("page-veille")) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK || !("IntersectionObserver" in window)) return;

    // 1. Les titres de section se « déchiffrent » quand ils apparaissent
    const GLYPHS = "01ABCDEF#$%&*<>/\\=+";
    const decrypt = (el) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) if (walker.currentNode.textContent.trim()) nodes.push(walker.currentNode);
        nodes.forEach((node) => {
            const target = node.textContent;
            let frame = 0;
            const total = 18;
            const tick = () => {
                const done = Math.floor((frame / total) * target.length);
                node.textContent = target.split("").map((ch, i) => {
                    if (i < done || ch === " " || ch === "\n") return ch;
                    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                }).join("");
                if (++frame <= total) requestAnimationFrame(() => setTimeout(tick, 28));
                else node.textContent = target;
            };
            tick();
        });
    };
    const titles = document.querySelectorAll(".veille-section-heading h2, [data-decrypt]");
    const tio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) { decrypt(e.target); tio.unobserve(e.target); }
        });
    }, { threshold: 0.6 });
    // le titre principal attend la fin de l'intro terminal
    setTimeout(() => titles.forEach((t) => tio.observe(t)), 1800);

    // 2. Les scores et chiffres clés comptent jusqu'à leur valeur
    const counters = document.querySelectorAll(".article-facts strong, [data-count-to]");
    const cio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            cio.unobserve(e.target);
            const raw = (e.target.dataset.countTo || e.target.textContent).trim();
            const value = parseFloat(raw.replace(",", "."));
            if (Number.isNaN(value)) return;
            const decimals = raw.includes(".") ? 1 : 0;
            const start = performance.now();
            const run = (now) => {
                const t = Math.min(1, (now - start) / 1100);
                const eased = 1 - Math.pow(1 - t, 4);
                e.target.textContent = (value * eased).toFixed(decimals);
                if (t < 1) requestAnimationFrame(run);
                else e.target.textContent = raw;
            };
            requestAnimationFrame(run);
        });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
})();



/* =====================================================
   EXPÉRIENCE — ACCORDÉON + CHIFFRES QUI DÉFILENT
===================================================== */

(() => {
    // Accordéon : une ligne ouverte à la fois par groupe
    document.querySelectorAll("[data-acc]").forEach((item) => {
        const btn = item.querySelector(".acc-item__btn");
        btn.addEventListener("click", () => {
            const open = !item.classList.contains("is-open");
            item.parentElement.querySelectorAll("[data-acc]").forEach((other) => {
                other.classList.remove("is-open");
                other.querySelector(".acc-item__btn").setAttribute("aria-expanded", "false");
            });
            if (open) {
                item.classList.add("is-open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    // Chiffres clés (Orange) : comptage jusqu'à la valeur
    const stats = document.querySelectorAll("[data-stat]");
    if (!stats.length || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (n, el) => {
        const v = Math.round(n);
        const txt = el.dataset.format === "fr" ? v.toLocaleString("fr-FR") : String(v);
        return txt + (el.dataset.suffix || "");
    };
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            const target = Number(e.target.dataset.stat);
            const final = e.target.textContent;
            const t0 = performance.now();
            const run = (now) => {
                const t = Math.min(1, (now - t0) / 1400);
                e.target.textContent = fmt(target * (1 - Math.pow(1 - t, 4)), e.target);
                if (t < 1) requestAnimationFrame(run);
                else e.target.textContent = final;
            };
            requestAnimationFrame(run);
        });
    }, { threshold: 0.6 });
    stats.forEach((s) => io.observe(s));
})();



/* =====================================================
   EN-TÊTE DES ONGLETS — LE NUMÉRO GÉANT SUIT LA SOURIS (ressort)
===================================================== */

(() => {
    const hero = document.querySelector("[data-hero]");
    const index = hero?.querySelector(".pg-hero__index");
    if (!index) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const step = () => {
        // amortissement façon ressort : on rattrape 10 % de l'écart à chaque image
        x += (tx - x) * 0.1;
        y += (ty - y) * 0.1;
        index.style.setProperty("--ix", `${x.toFixed(2)}px`);
        index.style.setProperty("--iy", `${y.toFixed(2)}px`);
        raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(step) : 0;
    };
    hero.addEventListener("pointermove", (event) => {
        const r = hero.getBoundingClientRect();
        const dx = event.clientX - (r.left + r.width / 2);
        const dy = event.clientY - (r.top + r.height / 2);
        tx = Math.max(-1, Math.min(1, dx / 400)) * 24;
        ty = Math.max(-1, Math.min(1, dy / 400)) * 12;
        if (!raf) raf = requestAnimationFrame(step);
    });
    hero.addEventListener("pointerleave", () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(step);
    });
})();


/* =====================================================
   PING — LA MASCOTTE DU SITE
   Une astuce par page, les yeux suivent la souris,
   clic = petit saut + astuce suivante, × = rangé pour la session.
===================================================== */

(() => {
    if (sessionStorage.getItem("ping-hidden") === "1") return;

    const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
    const TIPS = {
        index: ["Salut, moi c'est Ping ! Clique sur « Qui suis-je ? » pour commencer la visite.", "Clique sur le logo en verre pour rejouer son animation."],
        profil: ["Ici, tout sur Semih : son école, son entreprise et ce qui le motive.", "Les flèches en haut mènent à l'onglet suivant."],
        epreuves: ["Survole une compétence du tableau pour voir les réalisations qui la mobilisent.", "Chaque étape du déroulé renvoie vers l'onglet qui l'illustre."],
        formation: ["Fais défiler : la frise se remplit au fur et à mesure.", "Le lien vers le site de Schola Nova est juste en dessous."],
        experience: ["Clique sur une ligne pour l'ouvrir.", "Les chiffres d'Orange viennent du site officiel du groupe."],
        projets: ["Clique sur un dossier pour sortir ses documents !", "Les PDF arrivent au fur et à mesure des projets."],
        competences: ["Change de domaine avec les onglets, ou avec les flèches du clavier.", "Passe la souris sur un outil pour le mettre en avant."],
        veille: ["Accès autorisé. Les actus en bas de page sont mises à jour chaque jeudi à 8 h.", "Le cas d'étude principal, c'est PHP2Shell."],
        contact: ["Laisse un message, Semih répond dès que possible.", "Tu peux aussi passer par LinkedIn."],
    };
    const tips = TIPS[page] || TIPS.index;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const root = document.createElement("div");
    root.className = "ping";
    root.innerHTML = `
        <div class="ping__bubble" role="status" aria-live="polite">
            <strong>PING &gt;_</strong><span class="ping__text"></span>
            <button class="ping__close" type="button" aria-label="Ranger la mascotte">×</button>
        </div>
        <button class="ping__bot" type="button" aria-label="Ping, la mascotte : afficher une astuce">
            <svg viewBox="0 0 74 84" aria-hidden="true">
                <path class="p-wave" d="M29 4a11 11 0 0 1 16 0"/>
                <path class="p-wave p-wave--2" d="M25 0a17 17 0 0 1 24 0"/>
                <line class="p-ant" x1="37" y1="12" x2="37" y2="24"/>
                <circle class="p-dot" cx="37" cy="10" r="3.5"/>
                <rect class="p-body" x="6" y="24" width="62" height="48" rx="16"/>
                <rect class="p-screen" x="14" y="32" width="46" height="28" rx="9"/>
                <g class="p-eyes">
                    <circle class="p-eye" cx="28" cy="46" r="4.5"/>
                    <circle class="p-eye" cx="46" cy="46" r="4.5"/>
                </g>
                <ellipse class="p-cheek" cx="20" cy="54" rx="3" ry="1.6"/>
                <ellipse class="p-cheek" cx="54" cy="54" rx="3" ry="1.6"/>
                <rect class="p-port" x="24" y="64" width="6" height="3" rx="1"/>
                <rect class="p-port" x="34" y="64" width="6" height="3" rx="1"/>
                <rect class="p-port" x="44" y="64" width="6" height="3" rx="1"/>
                <line class="p-leg" x1="24" y1="72" x2="24" y2="80"/>
                <line class="p-leg" x1="50" y1="72" x2="50" y2="80"/>
            </svg>
        </button>`;
    document.body.appendChild(root);

    const bot = root.querySelector(".ping__bot");
    const text = root.querySelector(".ping__text");
    const eyes = root.querySelectorAll(".p-eye");
    let tip = 0;
    let hideTimer = 0;

    const say = (i) => {
        text.textContent = tips[i % tips.length];
        root.classList.add("is-talking");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => root.classList.remove("is-talking"), 7000);
    };

    // Première astuce un peu après l'arrivée sur la page
    setTimeout(() => say(0), page === "veille" ? 2600 : 1800);

    bot.addEventListener("click", () => {
        tip += 1;
        say(tip);
        if (!motionOK) return;
        bot.classList.remove("is-jump");
        void bot.offsetWidth;
        bot.classList.add("is-jump");
    });
    bot.addEventListener("animationend", () => bot.classList.remove("is-jump"));

    root.querySelector(".ping__close").addEventListener("click", () => {
        sessionStorage.setItem("ping-hidden", "1");
        root.hidden = true;
    });

    if (!motionOK) return;

    // Clignement des yeux de temps en temps
    const blink = () => {
        bot.classList.add("is-blink");
        setTimeout(() => bot.classList.remove("is-blink"), 140);
        setTimeout(blink, 2500 + Math.random() * 3500);
    };
    setTimeout(blink, 2000);

    // Les yeux suivent la souris
    let raf = 0;
    window.addEventListener("pointermove", (event) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            raf = 0;
            const r = bot.getBoundingClientRect();
            const dx = event.clientX - (r.left + r.width / 2);
            const dy = event.clientY - (r.top + r.height * 0.55);
            const d = Math.hypot(dx, dy) || 1;
            const k = Math.min(1, d / 300) * 2.6;
            eyes.forEach((e) => { e.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`; });
        });
    }, { passive: true });
})();


/* =====================================================
   RÉALISATIONS — TABLEAU DE SYNTHÈSE + DOSSIERS DE PROJETS
   Tout vient de realisations.js (une seule liste pour les deux pages).
===================================================== */

(() => {
    const DATA = window.REALISATIONS;
    if (!Array.isArray(DATA)) return;

    const COMPS = ["C1", "C2", "C3", "C4", "C5", "C6"];
    const STATUT = {
        "realise": { label: "Réalisé", cls: "done" },
        "en-cours": { label: "En cours", cls: "live" },
        "a-venir": { label: "À venir", cls: "wait" },
    };
    const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- 1. Tableau de synthèse (onglet Épreuve) ---------- */
    const table = document.querySelector("[data-synthese]");
    if (table) {
        const body = table.querySelector("tbody");
        const groups = [
            ["formation", "Réalisations en cours de formation"],
            ["entreprise", "Réalisations en milieu professionnel — Orange (OI)"],
        ];
        let r = 0;
        body.innerHTML = groups.map(([ctx, title]) => {
            const rows = DATA.filter((d) => d.contexte === ctx).map((d) => {
                const cells = COMPS.map((c, i) => {
                    const on = !d.vide && (d.competences || []).includes(c);
                    return `<td class="ts-mark" data-col="${i}">${on
                        ? `<span class="ts-check" aria-label="${c} mobilisée">✓</span>`
                        : '<span class="ts-empty" aria-hidden="true"></span>'}</td>`;
                }).join("");
                const label = d.vide
                    ? '<span class="ts-free">Case libre — prochaine réalisation</span>'
                    : `${esc(d.titre)}${d.e6 ? ' <span class="ts-e6">E6</span>' : ""}<span class="ts-sub">${esc(d.resume)}</span>`;
                return `<tr class="ts-row${d.vide ? " ts-row--free" : ""}" style="--r: ${r++}">
                    <th scope="row" class="ts-real">${label}</th>
                    <td class="ts-period">${d.vide ? "" : esc(d.periode)}</td>${cells}</tr>`;
            }).join("");
            return `<tr class="ts-group"><th colspan="${2 + COMPS.length}" scope="colgroup">${title}</th></tr>${rows}`;
        }).join("");

        // Surbrillance de la colonne survolée (délégation : marche aussi pour les lignes générées)
        const legend = document.querySelectorAll(".ts-legend__item");
        const highlight = (col) => {
            table.querySelectorAll("[data-col]").forEach((el) => el.classList.toggle("is-col", el.dataset.col === col));
            legend.forEach((el) => el.classList.toggle("is-col", el.dataset.col === col));
        };
        table.addEventListener("mouseover", (e) => {
            const cell = e.target.closest("[data-col]");
            highlight(cell ? cell.dataset.col : null);
        });
        table.addEventListener("mouseleave", () => highlight(null));
        legend.forEach((el) => {
            el.addEventListener("mouseenter", () => highlight(el.dataset.col));
            el.addEventListener("mouseleave", () => highlight(null));
        });

        document.querySelector("[data-print-table]")?.addEventListener("click", () => window.print());
    }

    /* ---------- 2. Dossiers de projets (page Projets) ---------- */
    const desk = document.querySelector("[data-realisations]");
    if (desk) {
        const LIME = { style: "marble", colors: ["#07080a", "#15171b", "#2b3a12", "#6f9a12", "#d4ff3a", "#f2f1ec"], scale: 0.7, warp: 3.3, angle: -0.4, gloss: 0.5, veins: 0.45 };
        const STREAK = { style: "streak", colors: ["#f2f1ec", "#dfe9b0", "#a8e000", "#1a1c12", "#2a2c33", "#8a8f99", "#e6e6e0"], scale: 0.7, warp: 1.5, angle: -0.6, gloss: 0.2, veins: 0 };
        const ARTS = [LIME, "verdant", STREAK];
        const PLACES = ["bottom-left", "top-left", "top-right"];
        const tone = () => (document.body.classList.contains("light-theme") ? "light" : "dark");
        const width = () => Math.min(320, Math.max(260, window.innerWidth - 80));
        const folders = [];

        DATA.forEach((d, i) => {
            const item = document.createElement("article");
            item.className = "pj-item" + (d.vide ? " pj-item--free" : "");
            item.dataset.ctx = d.contexte;
            item.dataset.e6 = d.e6 ? "1" : "0";

            if (d.vide) {
                item.innerHTML = `
                    <div class="pj-free" aria-hidden="true"><span>+</span></div>
                    <div class="pj-item__cap">
                        <p class="pj-item__kicker">${d.contexte === "entreprise" ? "Orange" : "Formation"} · Case libre</p>
                        <h3>Prochaine réalisation</h3>
                        <p>Emplacement réservé pour un futur projet. Il apparaîtra aussi dans le tableau de synthèse.</p>
                    </div>`;
                desk.appendChild(item);
                return;
            }

            const st = STATUT[d.statut] || STATUT["en-cours"];
            const comps = (d.competences || []).map((c) => `<span class="pj-comp" title="Compétence ${c}">${c}</span>`).join("");
            const tags = (d.tags || []).map((t) => `<span>${esc(t)}</span>`).join("");
            const num = String(i + 1).padStart(2, "0");
            item.innerHTML = `
                <div class="pj-folder"></div>
                <div class="pj-item__cap">
                    <p class="pj-item__kicker">${num} · ${d.contexte === "entreprise" ? "Orange (OI)" : "Formation"}${d.e6 ? ' <span class="pj-e6">E6</span>' : ""}</p>
                    <h3>${esc(d.titre)}</h3>
                    <p>${esc(d.resume)}</p>
                    <div class="pg-tags">${tags}</div>
                    <div class="pj-item__foot">
                        <span class="pg-badge pg-badge--${st.cls}">${st.label}</span>
                        <span class="pj-comps" aria-label="Compétences mobilisées">${comps}</span>
                    </div>
                </div>`;
            desk.appendChild(item);

            if (!window.GlassFolder) return;
            const files = (d.documents || []).map((doc) => ({
                name: doc.nom,
                meta: doc.fichier ? doc.meta : `${doc.meta || "PDF"} · à venir`,
                href: doc.fichier,
                image: doc.image,
            }));
            folders.push(window.GlassFolder.mount(item.querySelector(".pj-folder"), {
                label: d.titre.length > 22 ? d.titre.slice(0, 21) + "…" : d.titre,
                meta: `${num} · ${st.label}`,
                art: ARTS[i % ARTS.length],
                seed: 3 + i * 4,
                labelPlacement: PLACES[i % PLACES.length],
                files,
                tone: tone(),
                width: width(),
                appearDelay: (i % 3) * 140,
            }));
        });

        new MutationObserver(() => folders.forEach((f) => f.setTone(tone())))
            .observe(document.body, { attributes: true, attributeFilter: ["class"] });

        // Filtres : Tout / Formation / Entreprise / E6
        const chips = document.querySelectorAll("[data-filter]");
        chips.forEach((chip) => chip.addEventListener("click", () => {
            const f = chip.dataset.filter;
            chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
            desk.querySelectorAll(".pj-item").forEach((item, k) => {
                const show = f === "all" || (f === "e6" ? item.dataset.e6 === "1" : item.dataset.ctx === f);
                if (show && item.hidden) {
                    item.hidden = false;
                    if (motionOK) {
                        item.style.animation = "none";
                        void item.offsetWidth;
                        item.style.animation = `pj-in 500ms cubic-bezier(.16,1,.3,1) ${k % 6 * 40}ms both`;
                    }
                } else if (!show) {
                    item.hidden = true;
                }
            });
        }));
    }
})();
