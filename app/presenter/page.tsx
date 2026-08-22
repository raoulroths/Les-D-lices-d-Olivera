import Link from "next/link";
import { CopyMessage } from "@/components/copy-message";
import { ShareBar } from "@/components/share-bar";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/format";
import { PITCH_MESSAGES, WHATSAPP_ORDER, whatsappShareUrl } from "@/lib/share";

export const metadata = {
  title: "Présenter & partager",
  description:
    "Comment présenter Les Délices de Olivera à l’entreprise et partager la boutique WhatsApp, Facebook, statut.",
};

const demo = [
  { href: "/", t: "1. Accueil", d: "Montrez le visuel, le logo, le numéro, les 4 saveurs." },
  { href: "/boutique", t: "2. Boutique", d: "Filtrez Nutella puis Céréalac — les prix du menu officiel." },
  { href: "/produits/pack-7-crepes-nutella", t: "3. Fiche produit", d: "Photos, avis, bouton Ajouter au panier." },
  { href: "/evenements", t: "4. Événements", d: "Plateaux 20 et 40 crêpes pour fêtes et entreprises." },
  { href: "/checkout", t: "5. Commande", d: "Livraison à Daloa · paiement avant la livraison (Orange Money, MoMo, Wave)." },
];

export default function PresenterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-magenta">Kit commercial</p>
      <h1 className="mt-2 font-display text-5xl text-plum sm:text-6xl">
        Comment présenter la boutique — et la partager.
      </h1>
      <p className="mt-4 max-w-2xl text-cocoa">
        Deux minutes face à Olivera, puis des messages tout prêts pour WhatsApp, Facebook et les
        statuts. Copiez, envoyez, c’est en ligne.
      </p>

      <div className="mt-6">
        <ShareBar
          title="Les Délices de Olivera"
          text="Boutique en ligne — crêpes nature, chocolat, Nutella, Céréalac."
        />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-4xl">Face à l’entreprise — 90 secondes</h2>
        <ol className="mt-6 space-y-4 text-cocoa">
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">Ouvrez l’accueil.</strong> « Voici votre enseigne en
            ligne, aux couleurs du flyer : violet, rose, crêpes. Le numéro {PHONE_DISPLAY} est
            partout. »
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">Montrez le menu.</strong> « Ce ne sont pas des prix
            inventés : 5 nature 1 000 F, 10 chocolat 2 000 F, 7 Nutella 2 000 F, 10 Céréalac
            2 500 F — comme sur votre affiche. »
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">Ajoutez au panier.</strong> « Le client choisit, vous
            recevez la commande, vous rappelez pour confirmer. Paiement à la livraison — comme
            aujourd’hui. »
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">Parlez événements.</strong> « Pour une entreprise, une
            école, un mariage : plateau 20 ou 40 crêpes, déjà mis en page. »
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">Proposez le partage.</strong> « Dès demain, un statut
            WhatsApp avec le lien remplace le flyer en photo floue. »
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-4xl">Parcours de démo</h2>
        <p className="mt-2 text-sm text-cocoa">Cliquez dans l’ordre pendant la réunion.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {demo.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="rounded-[1.4rem] bg-plum p-5 text-cream transition hover:bg-magenta"
            >
              <p className="font-display text-2xl">{step.t}</p>
              <p className="mt-1 text-sm text-cream/75">{step.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-4xl">Messages prêts à envoyer</h2>
        <p className="mt-2 text-sm text-cocoa">
          Copiez, collez dans WhatsApp. Ajoutez le lien de cette boutique à la fin.
        </p>
        <div className="mt-6 grid gap-5">
          <CopyMessage
            label="À envoyer à Olivera (l’entreprise)"
            text={PITCH_MESSAGES.entreprise}
          />
          <CopyMessage
            label="À envoyer aux clients (groupe / contact)"
            text={PITCH_MESSAGES.client}
          />
          <CopyMessage label="Statut WhatsApp" text={PITCH_MESSAGES.statut} />
          <CopyMessage label="Légende Instagram / Facebook" text={PITCH_MESSAGES.instagram} />
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        <article className="rounded-[1.4rem] bg-white p-5 ring-1 ring-plum/10">
          <p className="text-xs uppercase tracking-[0.18em] text-magenta">WhatsApp</p>
          <h3 className="mt-2 font-display text-2xl">Le plus important</h3>
          <p className="mt-2 text-sm text-cocoa">
            Envoyez le lien dans le statut, les groupes famille, les clients habitués. Bouton
            vert en bas à droite = commande directe.
          </p>
          <a
            href={whatsappShareUrl(PITCH_MESSAGES.client)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-4"
          >
            Partager sur WhatsApp
          </a>
        </article>
        <article className="rounded-[1.4rem] bg-white p-5 ring-1 ring-plum/10">
          <p className="text-xs uppercase tracking-[0.18em] text-magenta">Téléphone</p>
          <h3 className="mt-2 font-display text-2xl">Toujours le {PHONE_DISPLAY}</h3>
          <p className="mt-2 text-sm text-cocoa">
            Ceux qui n’aiment pas internet appellent. La boutique ne remplace pas le numéro, elle
            le met en avant.
          </p>
          <a href={`tel:${PHONE_TEL}`} className="btn-gold mt-4">
            Appeler
          </a>
        </article>
        <article className="rounded-[1.4rem] bg-white p-5 ring-1 ring-plum/10">
          <p className="text-xs uppercase tracking-[0.18em] text-magenta">Entreprise cliente</p>
          <h3 className="mt-2 font-display text-2xl">Goûter d’équipe</h3>
          <p className="mt-2 text-sm text-cocoa">
            Envoyez la page Événements à un RH ou un bureau : ils voient les plateaux, les prix,
            ils commandent.
          </p>
          <Link href="/evenements" className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-plum underline">
            Ouvrir /evenements
          </Link>
        </article>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-4xl">Remettre le site à Olivera (la dame, Daloa)</h2>
        <p className="mt-2 max-w-2xl text-sm text-cocoa">
          Ce n’est pas une application à télécharger : c’est un <strong>site web</strong> qui
          s’ouvre dans le navigateur d’un téléphone. Elle n’aura besoin d’<strong>aucun compte</strong>.
        </p>
        <ol className="mt-6 space-y-4 text-cocoa">
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">1. Publier le site (une fois).</strong> Ouvrez Vercel
            (gratuit), importez le projet, branchez une base Postgres gratuite (Neon, par exemple)
            dans la variable DATABASE_URL. Vous obtenez un lien permanent du type
            <code className="mx-1 rounded bg-cream px-1.5 py-0.5 text-xs">https://les-delices-olivera.vercel.app</code>
            Optionnel : acheter un domaine (ex. lesdelicesdeolivera.com) et le relier dans Vercel.
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">2. Lui envoyer le lien sur WhatsApp.</strong> Message
            type : <em>« Ceci est le site de la boutique. Ouvre le lien sur ton téléphone, tu
            vois le menu, les prix, tu commandes. Rien à installer, aucun compte à créer. »</em>{" "}
            Les client·es font exactement la même chose.
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">3. Lui donner les fichiers du projet.</strong> Un
            zip de la boutique + la base de données (et la variable DATABASE_URL). C’est son
            patrimoine : sans ces fichiers, elle ne peut pas le modifier ni le re-déployer.
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">4. Suivre les commandes depuis son iPhone.</strong> Elle
            met <code className="rounded bg-cream px-1.5 py-0.5 text-xs">/commandes?code=olivera</code>{" "}
            en favori dans Safari. Toutes les commandes clientes y apparaissent, avec le numéro à
            rappeler. Le code « olivera » est changeable.
          </li>
          <li className="rounded-[1.3rem] bg-white p-5 ring-1 ring-plum/10">
            <strong className="text-plum">5. Expliquer les changements futurs.</strong> Menu,
            prix, photos : on modifie le site puis on re-publie (Vercel, 2 minutes). Le plus
            simple : elle vous appelle, vous mettez à jour, vous re-déployez.
          </li>
        </ol>
      </section>

      <section className="mt-14 rounded-[2rem] bg-plum-deep px-6 py-10 text-cream sm:px-10">
        <p className="font-script text-5xl text-magenta-soft">Phrase de clôture</p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/85">
          « Vous avez déjà les crêpes et le numéro. Là, vos clients ont aussi un menu photo, un
          panier, et un lien à transférer. Vous ne changez pas votre façon de travailler — vous
          vendez plus facilement. »
        </p>
        <a href={WHATSAPP_ORDER} target="_blank" rel="noreferrer" className="btn-gold mt-8">
          Tester une commande WhatsApp
        </a>
      </section>
    </div>
  );
}
