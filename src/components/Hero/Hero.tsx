const seasonalBackgrounds = {
  winter: "/images/winter.jpg",
  summer: "/images/summer.jpg",
  spring: "/images/spring.jpg",
  autumn: "/images/autumn.jpg"
};

export default function Hero() {
  function setCurrentMood(mood: any): void {
    console.log("Current mood set to:", mood);
  }

  function nextMood(): any {
    const moods = ["happy", "calm", "energetic", "thoughtful"];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${seasonalBackgrounds.winter})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        mixBlendMode: "soft-light"
      }}
    >
      <h1>Inspirational Homepage</h1>
      <p>Your daily moment of clarity and calm.<br /></p>
        <button onClick={() => setCurrentMood(nextMood())}>
          Change Mood Theme
        </button>


    </section>
  );
}
