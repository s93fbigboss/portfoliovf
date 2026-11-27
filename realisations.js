/* =====================================================
   SEMIH.DEV — MES RÉALISATIONS (source unique)

   Cette liste alimente À LA FOIS :
   - les dossiers de la page Projets ;
   - les lignes du tableau de synthèse E5 (onglet Épreuve).
   Le portfolio et le tableau restent donc toujours d'accord.

   ─────────────────────────────────────────────────────
   AJOUTER UNE RÉALISATION
   1. Copie un bloc { ... } ci-dessous et colle-le dans la liste.
   2. Remplis les champs :
      titre        nom court affiché sur le dossier
      resume       1 à 2 phrases : ce que tu as fait
      contexte     "formation"  (TP, projets d'école, projets perso)
                   "entreprise" (missions chez Orange)
      periode      ex. "11/2026" ou "Depuis sept. 2025"
      competences  cases cochées dans le tableau : ["C1", "C4", ...]
                   C1 Gérer le patrimoine informatique
                   C2 Répondre aux incidents et aux demandes d'assistance et d'évolution
                   C3 Développer la présence en ligne de l'organisation
                   C4 Travailler en mode projet
                   C5 Mettre à disposition des utilisateurs un service informatique
                   C6 Organiser son développement professionnel
      e6           true si la réalisation sert pour une fiche E6
      statut       "realise", "en-cours" ou "a-venir"
      tags         mots-clés techniques
      documents    fichiers rangés dans le dossier :
                   { nom: "Compte rendu", fichier: "documents/mon-tp.pdf", meta: "PDF" }
                   sans "fichier" → affiché « à venir », non cliquable
   3. Mets tes PDF dans le dossier documents/ du dépôt.

   REMPLIR UNE CASE VIDE
   Les entrées { vide: true } sont des emplacements libres : remplace
   simplement le bloc par ta nouvelle réalisation.
===================================================== */

window.REALISATIONS = [

    /* ---------- EN COURS DE FORMATION ---------- */

    {
        titre: "Architecture réseau redondante",
        resume: "Infrastructure simulée sous Cisco Packet Tracer : VLAN 10 et 20, liaisons trunk, routage inter-VLAN et redondance des passerelles avec HSRP.",
        contexte: "formation",
        periode: "2025 – 2026",
        competences: ["C1", "C4", "C5"],
        e6: true,
        statut: "realise",
        tags: ["Cisco 3560", "Cisco 2960", "VLAN", "HSRP"],
        documents: [
            { nom: "Schéma Packet Tracer", fichier: "packet-tracer.webp", meta: "Image", image: "packet-tracer.webp" },
            { nom: "Document technique", meta: "PDF" },
        ],
    },
    {
        titre: "Installation de Linux Debian",
        resume: "Installation du système, prise en main du terminal et des commandes Linux de base.",
        contexte: "formation",
        periode: "2025 – 2026",
        competences: ["C5", "C6"],
        statut: "realise",
        tags: ["Debian", "Linux", "Terminal"],
        documents: [{ nom: "Compte rendu de TP", meta: "PDF" }],
    },
    {
        titre: "Machines virtuelles VMware",
        resume: "Création et configuration de machines virtuelles avec VMware Workstation pour monter mes environnements de TP.",
        contexte: "formation",
        periode: "2025 – 2026",
        competences: ["C5", "C6"],
        statut: "realise",
        tags: ["VMware", "Virtualisation"],
        documents: [{ nom: "Compte rendu de TP", meta: "PDF" }],
    },
    {
        titre: "Services DNS et DHCP",
        resume: "Étude de la résolution de noms et de l'attribution automatique des paramètres réseau aux équipements.",
        contexte: "formation",
        periode: "2025 – 2026",
        competences: ["C2", "C5"],
        statut: "en-cours",
        tags: ["DNS", "DHCP"],
        documents: [{ nom: "Compte rendu de TP", meta: "PDF" }],
    },
    {
        titre: "Portfolio professionnel",
        resume: "Conception et mise en ligne de ce portfolio sur GitHub Pages : HTML, CSS, JavaScript, animations et mise à jour automatique de la veille.",
        contexte: "formation",
        periode: "2025 – 2026",
        competences: ["C3", "C6"],
        statut: "realise",
        tags: ["HTML", "CSS", "JavaScript", "GitHub"],
        documents: [{ nom: "Dépôt GitHub", fichier: "https://github.com/s93fbigboss/portfoliovf", meta: "Lien" }],
    },
    {
        titre: "Veille : les failles des sites internet",
        resume: "Veille technologique sur les vulnérabilités du web, avec PHP2Shell comme cas d'étude et des actualités mises à jour chaque semaine.",
        contexte: "formation",
        periode: "2026",
        competences: ["C6"],
        statut: "en-cours",
        tags: ["Veille", "PHP", "CVE"],
        documents: [{ nom: "Page de veille", fichier: "veille.html", meta: "Page" }],
    },
    {
        titre: "NAS personnel",
        resume: "Construire et configurer un serveur de stockage réseau à la maison : partage de fichiers et administration système.",
        contexte: "formation",
        periode: "À venir",
        competences: ["C1", "C5"],
        statut: "a-venir",
        tags: ["NAS", "Linux", "Stockage réseau"],
        documents: [{ nom: "Dossier de projet", meta: "PDF" }],
    },

    /* ---------- EN MILIEU PROFESSIONNEL : ORANGE (OI) ---------- */

    {
        titre: "Pilotage d'activité",
        resume: "Pilote d'activité chez Orange, côté OI : suivi et coordination des activités.",
        contexte: "entreprise",
        periode: "Depuis sept. 2025",
        competences: ["C2", "C4"],
        statut: "en-cours",
        tags: ["Orange", "Coordination", "Suivi"],
        documents: [{ nom: "Fiche mission", meta: "PDF" }],
    },
    {
        titre: "Fibre optique et supervision",
        resume: "Découverte des environnements liés à la fibre optique et observation des activités de supervision.",
        contexte: "entreprise",
        periode: "Depuis sept. 2025",
        competences: ["C1"],
        statut: "en-cours",
        tags: ["Fibre optique", "Supervision"],
        documents: [{ nom: "Fiche mission", meta: "PDF" }],
    },
    {
        titre: "Support réseau",
        resume: "Découverte des activités liées au support réseau.",
        contexte: "entreprise",
        periode: "Depuis sept. 2025",
        competences: ["C2"],
        statut: "en-cours",
        tags: ["Support", "Réseau"],
        documents: [{ nom: "Fiche mission", meta: "PDF" }],
    },
    {
        titre: "Infrastructure réseau chez Orange",
        resume: "Concevoir et mettre en place une architecture réseau intégrant différents services d'infrastructure.",
        contexte: "entreprise",
        periode: "À venir",
        competences: ["C4", "C5"],
        e6: true,
        statut: "a-venir",
        tags: ["DHCP", "DNS", "Firewall"],
        documents: [{ nom: "Dossier de projet", meta: "PDF" }],
    },

    /* ---------- CASES LIBRES POUR LES PROCHAINS PROJETS ---------- */

    { vide: true, contexte: "formation" },
    { vide: true, contexte: "formation" },
    { vide: true, contexte: "entreprise" },
];
