
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.18;
    audio.loop = true;

    const startMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Music playback failed:", error);
      }
    };

    window.addEventListener("birthday-music-start", startMusic);

    return () => {
      window.removeEventListener("birthday-music-start", startMusic);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Unable to play music:", error);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/romantic-piano.mp3"
        preload="auto"
        loop
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 10000,
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "1px solid rgba(214, 143, 179, 0.4)",
          background: "rgba(255, 245, 250, 0.95)",
          color: "#a85f85",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 4px 18px rgba(170, 95, 133, 0.15)",
        }}
      >
        {playing ? "♫" : "♪"}
      </button>
    </>
  );
}
