
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import "./FlowerGiftIntro.css";

interface FlowerGiftIntroProps {
  onReceive: () => void;
}

const PARTICLES = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: `${(i * 47 + 13) % 100}%`,
  delay: `${((i * 7) % 25) / 10}s`,
  duration: `${7 + ((i * 3) % 8)}s`,
  size: 2 + ((i * 5) % 5),
}));

const PETALS = Array.from({ length: 12 }, (_, i) => i);
const INNER_PETALS = Array.from({ length: 8 }, (_, i) => i);

export const FlowerGiftIntro: React.FC<FlowerGiftIntroProps> = ({
  onReceive,
}) => {
  const [received, setReceived] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!received) return;

    const timer = window.setTimeout(() => {
      onReceive();
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [received, onReceive]);

  const handleReceive = () => {
    if (!received) setReceived(true);
  };

  return (
    <AnimatePresence>
      {!received && (
        <motion.section
          className="flower-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          aria-label="A special birthday flower"
        >
          <div className="flower-background" aria-hidden="true" />
          <div className="flower-orb flower-orb-one" aria-hidden="true" />
          <div className="flower-orb flower-orb-two" aria-hidden="true" />
          <div className="flower-orb flower-orb-three" aria-hidden="true" />

          <div className="flower-stars" aria-hidden="true">
            {PARTICLES.map((particle) => (
              <span
                key={particle.id}
                className={`flower-particle ${
                  particle.id % 5 === 0 ? "is-star" : ""
                }`}
                style={{
                  left: particle.left,
                  bottom: "-12px",
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>

          <motion.div
            className="flower-content"
            initial={reduceMotion ? false : { y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flower-top-ornament"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span>✧</span>
              <span className="ornament-line" />
              <span>♡</span>
              <span className="ornament-line" />
              <span>✧</span>
            </motion.div>

            <motion.p
              className="flower-eyebrow"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ delay: 0.35, duration: 1 }}
            >
              A LITTLE SOMETHING FROM MY HEART
            </motion.p>

            <motion.h1
              className="flower-heading"
              initial={reduceMotion ? false : { y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              For someone
              <br />
              <span>truly special.</span>
            </motion.h1>

            <motion.p
              className="flower-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 1 }}
            >
              If I could give you one little thing,
              <br />
              it would be a flower carrying all the warmth
              <br />
              and happiness you deserve. ♡
            </motion.p>

            <motion.button
              type="button"
              className={`flower-button ${received ? "is-received" : ""}`}
              onClick={handleReceive}
              aria-label="Receive your flower"
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.045, y: -5 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.96 }
              }
            >
              <span className="flower-button-ring ring-one" aria-hidden="true" />
              <span className="flower-button-ring ring-two" aria-hidden="true" />
              <span className="flower-aura" aria-hidden="true" />
              <span className="flower-ground-glow" aria-hidden="true" />

              <span className="flower-model" aria-hidden="true">
                <span className="flower-stem" />
                <span className="flower-stem-shine" />
                <span className="flower-leaf flower-leaf-left" />
                <span className="flower-leaf flower-leaf-right" />

                <span className="flower-head">
                  <span className="flower-petals-outer">
                    {PETALS.map((petal) => (
                      <span
                        className="flower-petal"
                        key={petal}
                        style={
                          {
                            "--petal-index": petal,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </span>

                  <span className="flower-petals-inner">
                    {INNER_PETALS.map((petal) => (
                      <span
                        className="flower-petal-inner"
                        key={petal}
                        style={
                          {
                            "--inner-index": petal,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </span>

                  <span className="flower-heart">
                    <span className="flower-heart-center" />
                  </span>
                  <span className="flower-highlight" />
                </span>

                <span className="flower-floating-heart heart-one">♡</span>
                <span className="flower-floating-heart heart-two">✧</span>
                <span className="flower-floating-heart heart-three">♡</span>
              </span>

              <span className="flower-click-label">
                {received ? "WITH LOVE ♡" : "YOUR FLOWER"}
              </span>
            </motion.button>

            <AnimatePresence mode="wait">
              {received ? (
                <motion.div
                  key="received"
                  className="flower-message"
                  initial={{ opacity: 0, y: 18, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                >
                  <span className="flower-message-heart">♡</span>
                  <p className="flower-message-title">
                    This little flower is yours.
                  </p>
                  <p className="flower-message-copy">
                    A small gift, with a whole lot of love.
                  </p>
                  <span className="flower-message-subtitle">
                    Your little birthday world is waiting…
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  className="flower-hint"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <span className="flower-hint-line" />
                  <span>Touch the flower to receive your little gift</span>
                  <span className="flower-hint-line" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="flower-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              Made with love, especially for you <span>♡</span>
            </motion.p>
          </motion.div>

          <div className="flower-bottom-note" aria-hidden="true">
            <span>WITH LOVE</span>
            <span className="bottom-note-dot">✦</span>
            <span>ALWAYS</span>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FlowerGiftIntro;
