# Portfolio — Seydina Ousmane Dramé

Site statique (HTML / CSS / JavaScript, sans framework).

- `index.html` — le portfolio
- `cv.html` — le CV (une page A4) ; `assets/cv.pdf` est généré à partir de ce fichier
- `assets/archive/cv-ancien.pdf` — l'ancien CV, conservé

## Voir le site en local

```bash
python -m http.server 5500
```

Puis ouvrir http://localhost:5500

## Régénérer le CV en PDF

Ouvrir http://localhost:5500/cv.html dans Chrome → bouton « Imprimer / Enregistrer en PDF »
(marges : aucune, cocher « Graphiques d'arrière-plan »), et remplacer `assets/cv.pdf`.

## À compléter

Remplacer `TON-PSEUDO` (GitHub) et `TON-PROFIL` (LinkedIn) dans `index.html` et `cv.html`.
