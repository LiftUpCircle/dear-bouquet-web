"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  petalType: number;
  size: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate random petals
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 15; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          petalType: Math.floor(Math.random() * 5) + 1,
          size: Math.random() * 20 + 20, // 20-40px
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petals.map((petal) => (
        <img
          key={petal.id}
          src={`/assets/Petals/petal${petal.petalType}.png`}
          alt=""
          className={`petal petal-${petal.petalType}`}
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,
            height: "auto",
          }}
        />
      ))}
    </div>
  );
}
