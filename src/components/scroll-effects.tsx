import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export function ScrollEffects() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("main section, main article, main .scroll-reveal"),
    );

    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}