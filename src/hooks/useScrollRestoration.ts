import { useEffect } from "react";

const SCROLL_RESTORATION_LS_KEY = `scrollRestoration`;

export const useScrollRestoration = (props?: { enabled: boolean }) => {
  const { enabled } = props || {};

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const savedPosition = sessionStorage.getItem(SCROLL_RESTORATION_LS_KEY);

    if (savedPosition !== null) {
      requestAnimationFrame(() => {
        window.scrollTo(0, +savedPosition);
      });
    }
  }, [enabled]);

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        SCROLL_RESTORATION_LS_KEY,
        window.scrollY.toString(),
      );
    };

    window.addEventListener("scroll", saveScrollPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);
};
