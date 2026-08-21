# Les Délices de Olivera — boutique en ligne

Crêpes sucrées artisanales : nature lait, chocolat, Nutella, Céréalac.
Daloa, Côte d’Ivoire · 07 10 05 69 94 · paiement avant la livraison.

## Ce que contient le dossier

- `src/` — le site (pages, commandes, avis, photos dans `public/images`)
- `src/db/seed.ts` — **le menu et les prix** (à modifier ici, puis republier)
- `package.json` — la liste des briques du site

## Publier le site (une seule fois, ~30 min)

1. **GitHub** (coffre des fichiers) — `github.com`, compte gratuit
   - Nouveau repository `les-delices-olivera`
   - « Add file » → « Upload files » → glisse **le contenu** du dossier (pas le dossier lui-même) → Commit
2. **Neon** (caisse : commandes + avis) — `neon.tech`, gratuit
   - « Create a new project » → copie la **Connection string** (long texte `postgresql://…`)
3. **Vercel** (vitrine : le lien internet) — `vercel.com`, gratuit
   - « Sign up with GitHub » → « Add New → Project » → choisis le repository
   - Avant « Deploy » : **Environment Variables** → nom `DATABASE_URL` → colle la clé Neon
   - « Deploy » → attend 1–2 min → le lien `…vercel.app` est permanent

Le site crée lui-même ses tables et son menu à la première visite.
Plus rien à faire.

## Au quotidien

- **Suivre les commandes** : page `/commandes?code=olivera` (changement de code : variable
  `NEXT_PUBLIC_ADMIN_CODE` sur Vercel)
- **Changer un prix / une photo** : modifier `src/db/seed.ts` (ou `public/images`), Commit sur
  GitHub → Vercel republie tout seul
- **Ajouter une variable** (ex. nouveau numéro) : Vercel → Settings → Environment Variables

## En local (avancé)

```bash
npm install
# crée un .env avec DATABASE_URL
npm run dev
```
