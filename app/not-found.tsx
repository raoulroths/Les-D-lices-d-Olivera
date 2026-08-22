import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-script text-5xl text-magenta">Oups</p>
      <h1 className="mt-2 font-display text-5xl">Cette page s’est enfuie</h1>
      <p className="mt-4 text-cocoa">
        Peut-être qu’une crêpe au Nutella saura vous consoler.
      </p>
      <Link href="/boutique" className="btn-primary mt-8 inline-flex">
        Retour à la boutique
      </Link>
    </div>
  );
}
