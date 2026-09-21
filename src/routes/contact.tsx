import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, MessageCircle, Phone, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactMap } from "@/components/contact-map";
import { PageHero, SectionHeading } from "@/components/site-shell";
import hero from "@/assets/angello-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — ANGELLO School" },
    { name: "description", content: "Contactez ANGELLO School par WhatsApp, téléphone, e-mail ou rendez-vous à Japoma, Douala." },
    { property: "og:title", content: "Contacter ANGELLO School" },
    { property: "og:description", content: "Toutes les coordonnées d’ANGELLO School et sa localisation à Japoma." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/contact" }] }),
  component: ContactPage,
});

const whatsapp = "https://wa.me/237678509942?text=Bonjour%20ANGELLO%20School%2C%20je%20souhaite%20obtenir%20des%20informations.%20Merci.";

function ContactPage() {
  const contacts = [
    [MessageCircle, "WhatsApp", "+237 678 50 99 42", whatsapp, "Écrire maintenant"],
    [Phone, "Téléphone", "+237 678 50 99 42", "tel:+237678509942", "Appeler l’école"],
    [Mail, "E-mail", "contact@angello-school.com", "mailto:contact@angello-school.com?subject=Demande%20d'informations%20—%20ANGELLO%20School", "Envoyer un e-mail"],
  ] as const;

  return <>
    <PageHero eyebrow="Nous contacter" title="Parlons de l’avenir de votre enfant" text="Notre équipe vous répond et vous accueille à Japoma pour découvrir l’école." image={hero}/>
    <section className="px-5 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Contact direct" title="Choisissez le moyen qui vous convient" text="Un clic suffit pour joindre directement l’équipe ANGELLO School."/><div className="grid gap-5 md:grid-cols-3">{contacts.map(([Icon,title,value,href,label])=><article key={title} className="group rounded-xl border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl"><div className="grid h-12 w-12 place-items-center rounded-lg bg-gold-soft text-primary"><Icon/></div><h2 className="mt-5 text-2xl">{title}</h2><p className="mt-2 break-words text-sm text-muted-foreground">{value}</p><Button asChild className="mt-6 w-full"><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{label}</a></Button></article>)}</div></div></section>
    <section className="bg-muted px-5 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sur place</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Rencontrez-nous à l’établissement</h2><p className="mt-5 leading-7 text-muted-foreground">Vous pouvez vous présenter au secrétariat pour les renseignements et dossiers d’inscription, ou solliciter un échange avec la direction.</p><div className="mt-7 space-y-4"><div className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-secondary"/><div><strong>ANGELLO School</strong><p className="text-sm text-muted-foreground">Japoma, Douala, Cameroun</p></div></div><div className="flex gap-3"><School className="mt-1 h-5 w-5 shrink-0 text-secondary"/><div><strong>Secrétariat & direction</strong><p className="text-sm text-muted-foreground">Du lundi au vendredi, de 7h00 à 17h00</p></div></div></div><Button asChild variant="outline" size="lg" className="mt-8"><a href="https://www.google.com/maps/search/?api=1&query=place_id:ChIJGWd--Q8NYRARBe6RdVUdGgA" target="_blank" rel="noreferrer"><MapPin/>Ouvrir l’itinéraire</a></Button></div><div className="overflow-hidden rounded-xl border bg-card shadow-xl"><ContactMap/></div></div></section>
    <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-6"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Réseaux sociaux</p><h2 className="mt-3 text-3xl font-bold">Suivez la vie d’Angello</h2><p className="mt-3 text-primary-foreground/70">Actualités, événements et moments de vie de notre communauté scolaire.</p></div><div className="flex flex-wrap gap-3"><Button asChild variant="light" size="lg"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><Facebook/>Facebook</a></Button><Button asChild variant="light" size="lg"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn</a></Button><Button asChild variant="gold" size="lg"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></Button></div></div></section>
  </>;
}