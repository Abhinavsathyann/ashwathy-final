import React from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BalloonProps {
  color: string;
  highlightColor: string;
  width: number;
  height: number;
  stringLength: number;
  className?: string;
  style?: React.CSSProperties;
}

const Balloon: React.FC<BalloonProps> = ({
  color,
  highlightColor,
  width,
  height,
  stringLength,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`relative will-change-transform ${className}`}
      style={{
        transform: 'translate3d(0,0,0)',
        filter: 'drop-shadow(0 8px 12px rgba(113, 56, 79, 0.12))',
        ...style,
      }}
    >
      <svg
        width={width}
        height={height + stringLength}
        viewBox={`0 0 ${width} ${height + stringLength}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient
            id={`grad-${color.replace('#', '')}`}
            cx="35%"
            cy="30%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor={highlightColor} stopOpacity="0.95" />
            <stop offset="60%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.75" />
          </radialGradient>
        </defs>

        {/* Balloon Body */}
        <ellipse
          cx={width / 2}
          cy={height * 0.46}
          rx={width * 0.44}
          ry={height * 0.46}
          fill={`url(#grad-${color.replace('#', '')})`}
        />

        {/* Balloon Specular Sheen */}
        <ellipse
          cx={width * 0.35}
          cy={height * 0.28}
          rx={width * 0.12}
          ry={height * 0.18}
          fill="#FFFFFF"
          fillOpacity="0.45"
          transform={`rotate(-18 ${width * 0.35} ${height * 0.28})`}
        />

        {/* Balloon Tie/Knot */}
        <path
          d={`M${width / 2 - 4} ${height * 0.92} L${width / 2 + 4} ${height * 0.92} L${width / 2 + 6} ${height * 0.96} L${width / 2 - 6} ${height * 0.96} Z`}
          fill={color}
          fillOpacity="0.9"
        />

        {/* Balloon Ribbon/String - natural wave */}
        <path
          d={`M${width / 2} ${height * 0.96} Q${width / 2 - 8} ${height + stringLength * 0.35}, ${width / 2 + 6} ${height + stringLength * 0.65} T${width / 2 - 2} ${height + stringLength}`}
          stroke="#D79AAF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.65"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const FloatingDecorations: React.FC = () => {
  const isReduced = useReducedMotion();

  if (isReduced) {
    // Under reduced motion, omit continuous drifting particles and floating balloons
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Balloon 1: Dusty Rose floating gently on left */}
      <div className="absolute top-[18%] left-[4%] hidden lg:block animate-balloon-1 opacity-80">
        <Balloon
          color="#D79AAF"
          highlightColor="#F4DDE5"
          width={72}
          height={92}
          stringLength={95}
        />
      </div>

      {/* Balloon 2: Soft Champagne Gold on upper right */}
      <div className="absolute top-[28%] right-[5%] hidden lg:block animate-balloon-2 opacity-85">
        <Balloon
          color="#D6B77A"
          highlightColor="#FFF9F4"
          width={84}
          height={108}
          stringLength={110}
        />
      </div>

      {/* Balloon 3: Subtle Blush near middle lower left */}
      <div className="absolute top-[68%] left-[7%] hidden xl:block animate-balloon-2 opacity-70">
        <Balloon
          color="#F4DDE5"
          highlightColor="#FFF9F4"
          width={64}
          height={82}
          stringLength={80}
        />
      </div>

      {/* Balloon 4: Deep Berry accent near lower right */}
      <div className="absolute top-[78%] right-[8%] hidden xl:block animate-balloon-1 opacity-75">
        <Balloon
          color="#71384F"
          highlightColor="#D79AAF"
          width={58}
          height={74}
          stringLength={85}
        />
      </div>

      {/* Delicate Twinkling SVG Stars */}
      <div className="absolute top-[12%] right-[18%] animate-pulse-soft">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
            fill="#D6B77A"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      <div
        className="absolute top-[45%] left-[12%] animate-pulse-soft"
        style={{ animationDelay: '1.8s' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
            fill="#D79AAF"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      <div
        className="absolute top-[75%] left-[22%] animate-pulse-soft"
        style={{ animationDelay: '3.2s' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
            fill="#D6B77A"
            fillOpacity="0.45"
          />
        </svg>
      </div>

      <div
        className="absolute top-[88%] right-[24%] animate-pulse-soft"
        style={{ animationDelay: '2.5s' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
            fill="#F4DDE5"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Tiny drifting stardust particles */}
      <div className="absolute top-[22%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#D6B77A]/40 blur-[0.5px] animate-float-gentle" />
      <div
        className="absolute top-[58%] right-[35%] w-2 h-2 rounded-full bg-[#F4DDE5]/60 blur-[0.5px] animate-float-gentle"
        style={{ animationDelay: '2.2s' }}
      />
      <div
        className="absolute top-[82%] left-[55%] w-1.5 h-1.5 rounded-full bg-[#D79AAF]/35 blur-[0.5px] animate-float-gentle"
        style={{ animationDelay: '4.1s' }}
      />
    </div>
  );
};
