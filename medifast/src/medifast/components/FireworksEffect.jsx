// components/FireworksEffect.jsx
import { useEffect } from "react";
import confetti from "canvas-confetti";

export const FireworksEffect = () => {
  useEffect(() => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      confetti({
        ...defaults,
        particleCount: 20,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.4 + 0.1, // solo en parte superior
        },
      });
    }, 500); // cada medio segundo

    return () => clearInterval(interval); // limpieza al desmontar
  }, []);

  return null;
};
