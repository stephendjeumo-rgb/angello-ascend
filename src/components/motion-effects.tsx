import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function MotionEffects() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, [data-reveal]"));
    revealTargets.forEach((target, index) => {
      target.classList.add("scroll-stage");
      target.style.setProperty("--reveal-order", String(index % 4));
    });

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12, rootMargin: "-4% 0px -8%" },
    );
    revealTargets.forEach((target) => observer.observe(target));

    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const countObserver = new IntersectionObserver(
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
        countObserver.unobserve(element);
      }),
      { threshold: 0.65 },
    );
    counters.forEach((counter) => countObserver.observe(counter));

    const journey = document.querySelector<HTMLElement>("[data-journey]");
    const updateJourney = () => {
      if (!journey) return;
      const rect = journey.getBoundingClientRect();
      const distance = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
      journey.style.setProperty("--journey-progress", String(progress));
    };
    updateJourney();
    window.addEventListener("scroll", updateJourney, { passive: true });

    return () => {
      observer.disconnect();
      countObserver.disconnect();
      window.removeEventListener("scroll", updateJourney);
    };
  }, [pathname]);

  return null;
}