"use client";

import type { ReactNode } from "react";

/*
 * One illustration per "How We Can Help" pillar. All drawn on a 400 by 300
 * canvas in the site palette, so they read as one family. They are still
 * drawings: nothing moves. Every colour is a palette variable, so the set
 * follows --hue in globals.css.
 */
const C = {
  royal: "var(--color-royal-600)",
  bright: "var(--color-royal-500)",
  sky: "var(--color-sky-300)",
  mist: "var(--color-sky-100)",
  ink: "var(--color-ink)",
  white: "#ffffff",
  gold: "var(--color-gold)",
};

const label = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: 14,
  fill: C.ink,
} as const;

/** Generated coordinates are rounded so the server and the browser print the same text. */
const round = (v: number) => Number(v.toFixed(2));

/** Groups a piece of the drawing. Static: it only keeps the markup grouped. */
function Pop({ children }: { children: ReactNode; delay?: number }) {
  return <g>{children}</g>;
}

function Person({
  x,
  y,
  s = 1,
  fill = C.royal,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-14" r="10" fill={fill} />
      <path d="M-18 22c0-14 8-22 18-22s18 8 18 22z" fill={fill} />
    </g>
  );
}

function Check({ x, y, r = 10, fill = C.bright }: { x: number; y: number; r?: number; fill?: string }) {
  const k = r / 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <circle r="10" fill={fill} />
      <path d="M-4.5 0.5 -1.5 3.5 5 -3.5" stroke={C.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}

function Star({ x, y, r = 11, fill = C.gold }: { x: number; y: number; r?: number; fill?: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.45;
    return `${(x + Math.cos(a) * rad).toFixed(1)},${(y + Math.sin(a) * rad).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} />;
}

function Heart({ x, y, s = 1, fill = C.gold }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 12C-34-12-16-36 0-18 16-36 34-12 0 12z"
      fill={fill}
    />
  );
}

function Clarity() {
  return (
    <>
      <Pop>
        <circle cx="240" cy="142" r="104" fill={C.mist} />
        <circle cx="240" cy="142" r="76" fill={C.sky} />
        <circle cx="240" cy="142" r="48" fill={C.bright} />
        <circle cx="240" cy="142" r="20" fill={C.white} />
      </Pop>
      <Pop delay={0.15}>
        <path
          d="M52 248C92 192 132 254 178 180c12-18 26-26 48-34"
          stroke={C.ink}
          strokeWidth="3"
          strokeDasharray="2 9"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="52" cy="248" r="9" fill={C.royal} />
        <text x="30" y="276" {...label}>Where you are</text>
      </Pop>
      <Pop delay={0.3}>
        <path d="M240 142V78" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
        <path d="M240 78l44 16-44 16z" fill={C.gold} />
        <text x="292" y="58" {...label}>The life you want</text>
      </Pop>
    </>
  );
}

function Leadership() {
  return (
    <>
      <Pop>
        <Person x={200} y={124} s={2.3} fill={C.royal} />
        <path d="M178 66l8-24 14 14 14-14 8 24z" fill={C.gold} />
      </Pop>
      <Pop delay={0.2}>
        <path d="M200 182v14M120 216v-20h160v20" stroke={C.sky} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Person x={120} y={240} s={1.1} fill={C.bright} />
        <Person x={200} y={240} s={1.1} fill={C.sky} />
        <Person x={280} y={240} s={1.1} fill={C.bright} />
      </Pop>
      <Pop delay={0.35}>
        <rect x="16" y="46" width="112" height="32" rx="16" fill={C.white} />
        <Check x={36} y={62} />
        <text x="52" y="67" {...label}>Meetings</text>
        <rect x="272" y="46" width="112" height="32" rx="16" fill={C.white} />
        <Check x={292} y={62} />
        <text x="308" y="67" {...label}>Decisions</text>
      </Pop>
    </>
  );
}

function Systems() {
  const boxes = [30, 155, 280];
  return (
    <>
      <Pop>
        <circle cx="200" cy="66" r="24" fill={C.royal} />
        <circle cx="200" cy="66" r="34" stroke={C.royal} strokeWidth="10" strokeDasharray="9 8.4" fill="none" />
        <circle cx="200" cy="66" r="9" fill={C.mist} />
      </Pop>
      {boxes.map((x, i) => (
        <Pop key={x} delay={0.15 + i * 0.12}>
          <rect x={x} y="128" width="90" height="70" rx="14" fill={C.white} stroke={C.sky} strokeWidth="3" />
          <Check x={x + 24} y={152} r={11} />
          <rect x={x + 42} y="146" width="34" height="8" rx="4" fill={C.mist} />
          <rect x={x + 16} y="172" width="58" height="8" rx="4" fill={C.mist} />
          {i < 2 && (
            <path
              d={`M${x + 96} 163h24m-7-7 7 7-7 7`}
              stroke={C.royal}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </Pop>
      ))}
      <Pop delay={0.55}>
        <rect x="30" y="226" width="340" height="16" rx="8" fill={C.royal} />
        {[70, 130, 190, 250, 310].map((x) => (
          <circle key={x} cx={x} cy="234" r="3.5" fill={C.mist} />
        ))}
      </Pop>
    </>
  );
}

function PracticeManager() {
  return (
    <>
      <Pop>
        <Person x={112} y={150} s={2.1} fill={C.sky} />
        <text x="112" y="236" textAnchor="middle" {...label}>You lead</text>
      </Pop>
      <Pop delay={0.2}>
        <rect x="168" y="116" width="44" height="24" rx="12" stroke={C.ink} strokeWidth="4" fill="none" />
        <rect x="188" y="130" width="44" height="24" rx="12" stroke={C.royal} strokeWidth="4" fill="none" />
      </Pop>
      <Pop delay={0.35}>
        <Person x={288} y={150} s={2.1} fill={C.royal} />
        <text x="288" y="236" textAnchor="middle" {...label}>PM runs day-to-day</text>
      </Pop>
    </>
  );
}

function Meetings() {
  return (
    <>
      <Pop>
        <rect x="112" y="24" width="176" height="106" rx="16" fill={C.white} />
        {[50, 76, 102].map((y, i) => (
          <g key={y}>
            <Check x={140} y={y} r={9} fill={i === 2 ? C.gold : C.bright} />
            <rect x="158" y={y - 4} width={i === 1 ? 92 : 108} height="8" rx="4" fill={C.mist} />
          </g>
        ))}
      </Pop>
      <Pop delay={0.2}>
        {[104, 158, 242, 296].map((x, i) => (
          <circle key={x} cx={x} cy={i % 3 === 0 ? 176 : 164} r="14" fill={C.sky} />
        ))}
        <ellipse cx="200" cy="208" rx="128" ry="40" fill={C.royal} />
        <ellipse cx="200" cy="204" rx="104" ry="28" fill={C.bright} />
      </Pop>
      <Pop delay={0.35}>
        {[128, 200, 272].map((x) => (
          <circle key={x} cx={x} cy="260" r="15" fill={C.white} stroke={C.sky} strokeWidth="3" />
        ))}
      </Pop>
    </>
  );
}

function Reception() {
  return (
    <>
      <Pop>
        <path d="M46 96a44 44 0 0 0 0 64M28 84a66 66 0 0 0 0 88" stroke={C.sky} strokeWidth="5" strokeLinecap="round" fill="none" />
        <rect x="64" y="60" width="88" height="160" rx="20" fill={C.royal} />
        <rect x="74" y="80" width="68" height="108" rx="10" fill={C.mist} />
        <circle cx="108" cy="206" r="8" fill={C.white} />
        <path d="M92 118a16 16 0 0 1 32 0v8a4 4 0 0 1-4 4h-24a4 4 0 0 1-4-4z" fill={C.bright} />
        <rect x="90" y="142" width="36" height="6" rx="3" fill={C.sky} />
      </Pop>
      <Pop delay={0.25}>
        <rect x="196" y="64" width="160" height="156" rx="18" fill={C.white} />
        <path d="M196 82a18 18 0 0 1 18-18h124a18 18 0 0 1 18 18v20H196z" fill={C.bright} />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => {
            const booked = (c + r) % 3 === 0;
            return (
              <rect
                key={`${c}-${r}`}
                x={214 + c * 34}
                y={116 + r * 32}
                width="24"
                height="22"
                rx="6"
                fill={booked ? C.bright : C.mist}
              />
            );
          })
        )}
      </Pop>
      <Pop delay={0.45}>
        <circle cx="346" cy="70" r="22" fill={C.gold} />
        <path d="M336 70l7 7 12-13" stroke={C.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Pop>
    </>
  );
}

function Tco() {
  return (
    <>
      <Pop>
        <rect x="112" y="40" width="176" height="230" rx="18" fill={C.white} />
        <rect x="156" y="26" width="88" height="30" rx="10" fill={C.royal} />
        {[96, 150, 204].map((y, i) => (
          <g key={y}>
            <Check x={146} y={y} r={12} fill={i === 2 ? C.gold : C.bright} />
            <rect x="170" y={y - 12} width="96" height="9" rx="4.5" fill={C.mist} />
            <rect x="170" y={y + 3} width="62" height="9" rx="4.5" fill={C.mist} />
          </g>
        ))}
      </Pop>
      <Pop delay={0.3}>
        <path d="M296 200h-6" stroke={C.sky} strokeWidth="4" strokeLinecap="round" />
        <Person x={336} y={212} s={1.5} fill={C.sky} />
        <Heart x={336} y={130} s={0.9} />
      </Pop>
    </>
  );
}

function Staff() {
  const faces = [
    { x: 84, y: 176, r: 40, fill: C.sky },
    { x: 172, y: 146, r: 44, fill: C.bright },
    { x: 262, y: 146, r: 44, fill: C.royal },
    { x: 340, y: 176, r: 40, fill: C.sky },
  ];
  return (
    <>
      <Pop>
        <rect x="40" y="246" width="320" height="14" rx="7" fill={C.royal} opacity="0.22" />
      </Pop>
      {faces.map((f, i) => (
        <Pop key={f.x} delay={0.1 + i * 0.12}>
          <circle cx={f.x} cy={f.y} r={f.r} fill={f.fill} />
          <circle cx={f.x - f.r * 0.32} cy={f.y - f.r * 0.12} r={f.r * 0.09} fill={C.ink} />
          <circle cx={f.x + f.r * 0.32} cy={f.y - f.r * 0.12} r={f.r * 0.09} fill={C.ink} />
          <path
            d={`M${f.x - f.r * 0.36} ${f.y + f.r * 0.22}q${f.r * 0.36} ${f.r * 0.4} ${f.r * 0.72} 0`}
            stroke={C.ink}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </Pop>
      ))}
      <Pop delay={0.6}>
        <Heart x={217} y={62} s={1.1} />
        <Heart x={150} y={86} s={0.55} fill={C.sky} />
        <Heart x={288} y={84} s={0.55} fill={C.sky} />
      </Pop>
    </>
  );
}

function Recruitment() {
  const rows = [46, 116, 186];
  return (
    <>
      {rows.map((y, i) => (
        <Pop key={y} delay={0.1 + i * 0.14}>
          <rect x="164" y={y} width="204" height="60" rx="14" fill={C.white} stroke={i === 1 ? C.gold : "none"} strokeWidth="4" />
          <circle cx="196" cy={y + 30} r="15" fill={i === 1 ? C.royal : C.sky} />
          <rect x="222" y={y + 16} width="90" height="9" rx="4.5" fill={C.mist} />
          <rect x="222" y={y + 33} width="62" height="9" rx="4.5" fill={C.mist} />
          {i === 1 && <Check x={344} y={y + 30} r={12} fill={C.gold} />}
        </Pop>
      ))}
      <Pop delay={0.5}>
        <circle cx="100" cy="148" r="52" fill="rgba(255,255,255,0.4)" stroke={C.royal} strokeWidth="11" />
        <path d="M138 187l40 40" stroke={C.royal} strokeWidth="14" strokeLinecap="round" />
        <Person x={100} y={160} s={1.4} fill={C.bright} />
      </Pop>
    </>
  );
}

function PatientJourney() {
  const stops = [
    [40, 236],
    [110, 204],
    [180, 172],
    [250, 140],
    [322, 108],
  ];
  const d = "M40 236C110 236 110 172 180 172S250 108 322 108";
  return (
    <>
      <Pop>
        <path d={d} stroke={C.sky} strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d={d} stroke={C.white} strokeWidth="3" strokeDasharray="2 11" strokeLinecap="round" fill="none" />
      </Pop>
      {stops.map(([x, y], i) => (
        <Pop key={i} delay={0.15 + i * 0.12}>
          <circle cx={x} cy={y} r="17" fill={i === 4 ? C.royal : C.white} stroke={C.royal} strokeWidth="4" />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            style={{ ...label, fill: i === 4 ? C.white : C.ink }}
          >
            {i + 1}
          </text>
        </Pop>
      ))}
      <Pop delay={0.8}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} x={266 + i * 28} y={52} r={12} />
        ))}
      </Pop>
    </>
  );
}

function Finance() {
  const heights = [60, 84, 74, 110, 96, 140, 168];
  return (
    <>
      <Pop>
        <path d="M34 252h296" stroke={C.sky} strokeWidth="3" strokeLinecap="round" />
        {heights.map((h, i) => (
          <rect
            key={i}
            x={50 + i * 40}
            y={252 - h}
            width="26"
            height={h}
            rx="7"
            fill={i === heights.length - 1 ? C.royal : i % 2 ? C.sky : C.bright}
          />
        ))}
      </Pop>
      <Pop delay={0.35}>
        <polyline
          points={heights.map((h, i) => `${63 + i * 40},${252 - h - 22}`).join(" ")}
          stroke={C.gold}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {heights.map((h, i) => (
          <circle key={i} cx={63 + i * 40} cy={252 - h - 22} r="5.5" fill={C.gold} stroke={C.ink} strokeWidth="2" />
        ))}
      </Pop>
      <Pop delay={0.6}>
        <circle cx="352" cy="66" r="32" fill={C.gold} />
        <circle cx="352" cy="66" r="24" stroke={C.ink} strokeWidth="2.5" opacity="0.4" fill="none" />
        <text x="352" y="77" textAnchor="middle" style={{ ...label, fontSize: 30 }}>£</text>
      </Pop>
    </>
  );
}

function Growth() {
  const heights = [52, 84, 118, 154, 194];
  return (
    <>
      <Pop>
        {heights.map((h, i) => (
          <rect
            key={i}
            x={54 + i * 58}
            y={254 - h}
            width="44"
            height={h}
            rx="10"
            fill={[C.mist, C.sky, C.sky, C.bright, C.royal][i]}
          />
        ))}
      </Pop>
      <Pop delay={0.4}>
        <path d="M60 150L300 52" stroke={C.ink} strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M268 44l38 6-16 34" stroke={C.ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Pop>
      <Pop delay={0.65}>
        <Star x={350} y={40} r={13} />
        <Star x={374} y={92} r={8} />
        <Star x={326} y={104} r={6} />
      </Pop>
    </>
  );
}

function Freedom() {
  return (
    <>
      <Pop>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 12;
          return (
            <line
              key={i}
              x1={round(200 + Math.cos(a) * 66)}
              y1={round(148 + Math.sin(a) * 66)}
              x2={round(200 + Math.cos(a) * 86)}
              y2={round(148 + Math.sin(a) * 86)}
              stroke={C.gold}
              strokeWidth="7"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="200" cy="148" r="52" fill={C.gold} />
      </Pop>
      <Pop delay={0.25}>
        <rect x="0" y="176" width="400" height="124" fill={C.royal} />
        <path d="M0 200c25-12 50-12 75 0s50 12 75 0 50-12 75 0 50 12 75 0 50-12 75 0v6H0z" fill={C.bright} opacity="0.8" />
        <path d="M0 232c25-12 50-12 75 0s50 12 75 0 50-12 75 0 50 12 75 0 50-12 75 0v6H0z" fill={C.bright} opacity="0.55" />
        <path d="M0 264c25-12 50-12 75 0s50 12 75 0 50-12 75 0 50 12 75 0 50-12 75 0v6H0z" fill={C.bright} opacity="0.4" />
      </Pop>
      <Pop delay={0.5}>
        <path d="M60 104C110 96 150 76 250 62" stroke={C.ink} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
        <g transform="translate(286 46) rotate(-8)">
          <path d="M0 0l64-16-22 42-10-16z" fill={C.white} />
          <path d="M0 0l32 10 10 16" fill={C.mist} />
        </g>
      </Pop>
    </>
  );
}

const GRAPHICS: Record<string, () => React.JSX.Element> = {
  clarity: Clarity,
  leadership: Leadership,
  systems: Systems,
  "practice-manager": PracticeManager,
  meetings: Meetings,
  reception: Reception,
  tco: Tco,
  staff: Staff,
  recruitment: Recruitment,
  "patient-journey": PatientJourney,
  finance: Finance,
  growth: Growth,
  freedom: Freedom,
};

export default function PillarGraphic({ id }: { id: string }) {
  const Graphic = GRAPHICS[id];
  if (!Graphic) return null;
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <Graphic />
    </svg>
  );
}
