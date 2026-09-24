"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let interacted = false;
    const stop = () => {
      interacted = true;
    };
    const jump = () => {
      if (interacted) return;
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchmove", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("load", jump);
    jump();
    const timers = [400, 1200, 2500].map((ms) => setTimeout(jump, ms));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("load", jump);
    };
  }, []);

  return null;
}
