import Image from "next/image";

interface FlowerDecorationProps {
  position: "left" | "right";
  className?: string;
}

export default function FlowerDecoration({
  position,
  className = "",
}: FlowerDecorationProps) {
  const flowers =
    position === "left"
      ? ["RoseLeft", "JasmineLeft", "LilyLeft"]
      : ["Rose", "Jasmine", "Tulip"];

  return (
    <div
      className={`hidden lg:flex flex-col gap-4 flower-decoration ${className}`}
      style={{
        animationDelay: position === "left" ? "0s" : "2s",
      }}
    >
      {flowers.map((flower, index) => (
        <Image
          key={flower}
          src={`/assets/Flowers/${flower}.png`}
          alt={flower}
          width={80}
          height={120}
          className="opacity-80"
          style={{
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
