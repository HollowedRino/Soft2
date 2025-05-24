import { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

export const FireworksBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      speed: 2,
      acceleration: 1.05,
      friction: 0.95,
      gravity: 1.5,
      particles: 50,
      trace: 3,
      explosion: 5,
      autoresize: true,
    };

    const fireworks = new Fireworks(containerRef.current, options);
    fireworks.start();

    return () => fireworks.stop();
  }, []);

  return (
    <div
        ref={containerRef}
        style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0, // Cambia de -1 a 0 para probar
        pointerEvents: "none",
        background: "transparent", // Asegura que no tape el contenido
        }}
    />
  );
};