const snowflakes = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 31) % 100}%`,
  delay: `${(index % 8) * 0.32}s`,
  duration: `${4.2 + (index % 5) * 0.45}s`,
}));

export default function SnowAnimation() {
  return (
    <div className="atmos-animation atmos-snow-animation" aria-hidden="true">
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="atmos-snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
          }}
        />
      ))}
    </div>
  );
}
