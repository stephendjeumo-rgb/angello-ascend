import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function MotionEffects() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let countObserver: IntersectionObserver | undefined;
    let journey: HTMLElement | null = null;
    let updateJourney: (() => void) | undefined;
    let revealTargets: HTMLElement[] = [];
    const timer = window.setTimeout(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    revealTargets = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, [data-reveal]"));
    revealTargets.forEach((target, index) => {
      target.classList.add("scroll-stage");
      target.style.setProperty("--reveal-order", String(index % 4));
    });

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12, rootMargin: "-4% 0px -8%" },
    );
    observer = revealObserver;
    revealTargets.forEach((target) => revealObserver.observe(target));

    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const counterObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const target = Number(element.dataset["count"] ?? 0);
        const suffix = element.dataset["suffix"] ?? "";
        const started = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObserver.unobserve(element);
      }),
      { threshold: 0.65 },
    );
    countObserver = counterObserver;
    counters.forEach((counter) => counterObserver.observe(counter));

    journey = document.querySelector<HTMLElement>("[data-journey]");
    updateJourney = () => {
      if (!journey) return;
      const rect = journey.getBoundingClientRect();
      const distance = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
      journey.style.setProperty("--journey-progress", String(progress));
    };
    updateJourney();
    window.addEventListener("scroll", updateJourney, { passive: true });
    }, 250);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      countObserver?.disconnect();
      if (updateJourney) window.removeEventListener("scroll", updateJourney);
      revealTargets.forEach((target) => {
        target.classList.remove("scroll-stage", "is-visible");
        target.style.removeProperty("--reveal-order");
      });
    };
  }, [pathname]);

  return null;
}