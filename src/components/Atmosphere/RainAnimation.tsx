const rainDrops = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: `${(index % 9) * 0.16}s`,
  duration: `${0.9 + (index % 4) * 0.18}s`,
}));

export default function RainAnimation() {
  return (
    <div className="atmos-animation atmos-rain-animation" aria-hidden="true">
      {rainDrops.map((drop) => (
        <span
          key={drop.id}
          className="atmos-raindrop"
          style={{
            left: drop.left,
            animationDelay: drop.delay,
            animationDuration: drop.duration,
          }}
        />
      ))}
    </div>
  );
}
