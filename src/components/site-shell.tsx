import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Facebook, Heart, Linkedin, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/angello-logo.png.asset.json";

const whatsappUrl = "https://wa.me/237678509942?text=Bonjour%20ANGELLO%20School%2C%20je%20souhaite%20obtenir%20des%20informations.%20Merci.";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const links = [["/", "Accueil"], ["/a-propos", "À Propos"], ["/vie-scolaire", "Vie Scolaire"]] as const;
  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:flex lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="ANGELLO School, accueil">
          <img src={logoAsset.url} alt="Logo ANGELLO School" className="h-14 w-14 shrink-0 object-contain" width="64" height="64" />
          <span className="min-w-0"><strong className="block truncate font-display text-lg text-primary">ANGELLO School</strong><span className="hidden text-[10px] font-semibold uppercase text-muted-foreground sm:block">Groupe Scolaire Bilingue</span></span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {links.map(([to,label]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="text-sm font-medium text-foreground transition-colors hover:text-primary" activeProps={{className:"text-primary"}}>{label}</Link>)}
          <a href="mailto:contact@angello-school.com" className="text-sm font-medium hover:text-primary">Contact</a>
        </nav>
        <div className="hidden gap-2 lg:flex">
          <Button asChild variant="outline"><a href="/brochure-angello-school.pdf" download>Brochure</a></Button>
          <Button asChild><Link to="/preinscription">Préinscrire mon enfant</Link></Button>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={() => setOpen(v => !v)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>{open ? <X/> : <Menu/>}</Button>
      </div>
      {open && <nav className="border-t bg-background px-4 py-5 lg:hidden" aria-label="Navigation mobile"><div className="mx-auto flex max-w-7xl flex-col gap-1">{links.map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-muted">{label}</Link>)}<a className="rounded-lg px-3 py-3 font-medium hover:bg-muted" href="mailto:contact@angello-school.com">Contact</a><Button asChild className="mt-2"><Link to="/preinscription" onClick={() => setOpen(false)}>Préinscrire mon enfant</Link></Button></div></nav>}
    </header>
    <main>{children}</main>
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div><div className="flex items-center gap-3"><img src={logoAsset.url} alt="" className="h-16 w-16 rounded-lg bg-background object-contain p-1"/><h2 className="text-xl">ANGELLO School</h2></div><p className="mt-4 text-sm leading-6 text-primary-foreground/75">Une école bilingue qui forme des enfants curieux, confiants et ouverts sur le monde.</p><div className="mt-5 flex gap-3"><Facebook/><Linkedin/><a href={whatsappUrl} aria-label="WhatsApp"><MessageCircle/></a></div></div>
        <div><h3 className="text-lg">Liens rapides</h3><div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/75"><Link to="/a-propos">À Propos</Link><Link to="/vie-scolaire">Vie Scolaire</Link><Link to="/preinscription">Préinscription</Link><a href="mailto:contact@angello-school.com">Contact</a></div></div>
        <div><h3 className="text-lg">Nous contacter</h3><div className="mt-4 space-y-3 text-sm text-primary-foreground/75"><p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary"/>Japoma, Douala, Cameroun</p><a className="flex gap-2" href="tel:+237678509942"><Phone className="h-4 w-4 text-secondary"/>+237 678 50 99 42</a><a className="flex gap-2 break-all" href="mailto:contact@angello-school.com"><Mail className="h-4 w-4 shrink-0 text-secondary"/>contact@angello-school.com</a></div></div>
        <div><h3 className="text-lg">Horaires</h3><p className="mt-4 text-sm text-primary-foreground/75">Lundi – Vendredi<br/><strong className="text-primary-foreground">7h00 – 17h00</strong></p></div>
      </div>
      <div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between lg:px-8"><p>© 2026 ANGELLO School. Tous droits réservés. · Mentions légales · Politique de confidentialité</p><p className="flex items-center gap-1">Conçu avec passion <Heart className="h-3 w-3 text-secondary"/> by le Ds</p></div></div>
    </footer>
    <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contacter ANGELLO School sur WhatsApp" className="whatsapp-pulse fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg"><MessageCircle className="h-7 w-7"/></a>
  </div>;
}

export const SectionHeading = ({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) => <div className="mx-auto mb-10 max-w-2xl text-center"><p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-secondary" : "text-primary"}`}>{eyebrow}</p><h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${light ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>{text && <p className={`mt-4 leading-7 ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{text}</p>}</div>;

export const PageHero = ({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) => <section className="relative isolate min-h-[440px] overflow-hidden bg-primary"><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45"/><div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/20"/><div className="relative mx-auto flex min-h-[440px] max-w-7xl items-end px-5 py-16 sm:px-6 lg:px-8"><div className="max-w-2xl text-primary-foreground"><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p><h1 className="mt-4 text-4xl font-bold sm:text-6xl">{title}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/80">{text}</p></div></div></section>;