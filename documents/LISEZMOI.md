# Documents du portfolio

Range ici les PDF de tes réalisations (comptes rendus de TP, documents techniques, fiches E6, attestations…).

Ensuite, dans `realisations.js`, ajoute le fichier dans la réalisation concernée :

```js
documents: [
    { nom: "Compte rendu de TP", fichier: "documents/tp-debian.pdf", meta: "PDF" },
],
```

Le document apparaît alors dans le dossier en verre de la page Projets et devient cliquable.

Conseils :
- noms de fichiers sans espaces ni accents (`tp-debian.pdf`, pas `TP Débian final (2).pdf`) ;
- un PDF par réalisation, avec captures d'écran et étapes de configuration.
