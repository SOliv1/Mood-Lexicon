const stars = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${(index * 19) % 100}%`,
  top: `${8 + ((index * 23) % 76)}%`,
  delay: `${(index % 6) * 0.4}s`,
}));

export default function NightSky() {
  return (
    <div className="atmos-animation atmos-night-sky" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="atmos-star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
