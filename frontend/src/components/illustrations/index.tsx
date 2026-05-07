/**
 * Inline SVG illustrations for iCollege Life homepage sections.
 * Brand colour palette:
 *   primary blue   #4F6BF5 / pale #D6DCFD / bg blob #EEF2FF
 *   secondary lime #BBCF2E / pale #DDE688 / bg blob #F4F8C2
 *   neutral bg     #E9EDF5
 */

const P  = "#4F6BF5"; // primary blue
const PL = "#A8B8FC"; // primary light
const PP = "#D6DCFD"; // primary pale
const PB = "#EEF2FF"; // primary bg blob
const S  = "#BBCF2E"; // secondary lime
const SL = "#D7E84E"; // secondary light
const SP = "#EEF2AA"; // secondary pale
const D  = "#1E243A"; // dark/text
const NG = "#E9EDF5"; // neutral grey

interface IllustrationProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Academy – graduation cap + open book + sparkle stars
// ---------------------------------------------------------------------------
export function IllustrationAcademy({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      {/* bg blob */}
      <ellipse cx="100" cy="85" rx="88" ry="46" fill={PB} />
      {/* open book - left page */}
      <path d="M55 60 Q100 52 100 58 L100 108 Q55 108 55 102 Z" fill={PL} />
      {/* open book - right page */}
      <path d="M100 58 Q145 52 145 58 L145 102 Q100 108 100 108 Z" fill={PP} />
      {/* book spine */}
      <rect x="97" y="56" width="6" height="52" rx="3" fill={P} />
      {/* text lines left */}
      <rect x="65" y="72" width="24" height="4" rx="2" fill={P} opacity="0.25" />
      <rect x="65" y="81" width="18" height="4" rx="2" fill={P} opacity="0.2" />
      <rect x="65" y="90" width="21" height="4" rx="2" fill={P} opacity="0.25" />
      {/* text lines right */}
      <rect x="110" y="72" width="24" height="4" rx="2" fill={P} opacity="0.2" />
      <rect x="110" y="81" width="18" height="4" rx="2" fill={P} opacity="0.18" />
      <rect x="110" y="90" width="21" height="4" rx="2" fill={P} opacity="0.2" />
      {/* graduation cap board */}
      <polygon points="100,20 140,36 100,52 60,36" fill={P} />
      {/* cap top */}
      <ellipse cx="100" cy="20" rx="12" ry="5" fill={D} />
      {/* tassel */}
      <line x1="140" y1="36" x2="143" y2="55" stroke={S} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="143" cy="57" r="3.5" fill={S} />
      {/* stars */}
      <circle cx="42" cy="35" r="4" fill={S} />
      <circle cx="162" cy="30" r="3" fill={S} opacity="0.7" />
      <circle cx="155" cy="55" r="2" fill={P} opacity="0.5" />
      <circle cx="38" cy="65" r="2" fill={PL} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Global – globe + airplane arc + location pins
// ---------------------------------------------------------------------------
export function IllustrationGlobal({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      {/* bg blob */}
      <ellipse cx="100" cy="88" rx="85" ry="44" fill={SP} />
      {/* globe circle */}
      <circle cx="95" cy="82" r="44" fill={PB} stroke={P} strokeWidth="2.5" />
      {/* meridians */}
      <ellipse cx="95" cy="82" rx="20" ry="44" stroke={PL} strokeWidth="1.5" />
      <ellipse cx="95" cy="82" rx="44" ry="18" stroke={PL} strokeWidth="1.5" />
      <line x1="51" y1="82" x2="139" y2="82" stroke={PL} strokeWidth="1.5" />
      {/* location pin Barcelona */}
      <circle cx="80" cy="68" r="6" fill={P} />
      <path d="M80 74 L80 82" stroke={P} strokeWidth="2" strokeLinecap="round" />
      <circle cx="80" cy="68" r="3" fill="white" />
      {/* location pin 2 */}
      <circle cx="113" cy="90" r="5" fill={S} />
      <path d="M113 95 L113 102" stroke={S} strokeWidth="2" strokeLinecap="round" />
      <circle cx="113" cy="90" r="2.5" fill="white" />
      {/* airplane arc */}
      <path d="M52 55 Q100 25 148 48" stroke={S} strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" fill="none" />
      {/* plane icon */}
      <g transform="translate(146,44) rotate(30)">
        <path d="M0 -6 L4 2 L0 0 L-4 2 Z" fill={D} />
        <path d="M-5 1 L5 1 L3 3 L-3 3 Z" fill={D} opacity="0.7" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Lifelong – heart + growing plant + upward line
// ---------------------------------------------------------------------------
export function IllustrationLifelong({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="90" rx="78" ry="42" fill={PB} />
      {/* stem */}
      <line x1="100" y1="110" x2="100" y2="45" stroke={S} strokeWidth="3" strokeLinecap="round" />
      {/* leaves */}
      <path d="M100 80 Q78 68 80 50 Q92 60 100 80Z" fill={SL} />
      <path d="M100 65 Q122 53 120 35 Q108 45 100 65Z" fill={S} />
      {/* soil */}
      <ellipse cx="100" cy="112" rx="28" ry="8" fill={PP} />
      {/* heart above plant */}
      <path d="M100 40 C100 40 88 28 83 28 C76 28 72 34 72 40 C72 52 100 62 100 62 C100 62 128 52 128 40 C128 34 124 28 117 28 C112 28 100 40 100 40Z"
        fill={P} opacity="0.85" />
      {/* sparkles */}
      <circle cx="55" cy="52" r="4" fill={S} />
      <circle cx="148" cy="44" r="3" fill={PL} />
      <circle cx="58" cy="80" r="2" fill={P} opacity="0.4" />
      <circle cx="145" cy="75" r="2.5" fill={S} opacity="0.6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Structure – three sequential boxes connected by arrows (Learn→Design→Build)
// ---------------------------------------------------------------------------
export function IllustrationStructure({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="92" rx="82" ry="40" fill={PB} />
      {/* box 1 */}
      <rect x="18" y="62" width="44" height="48" rx="8" fill={P} />
      <rect x="26" y="74" width="28" height="4" rx="2" fill="white" opacity="0.5" />
      <rect x="26" y="83" width="20" height="4" rx="2" fill="white" opacity="0.4" />
      <rect x="26" y="92" width="24" height="4" rx="2" fill="white" opacity="0.4" />
      {/* box 2 */}
      <rect x="78" y="54" width="44" height="56" rx="8" fill={PL} />
      <rect x="86" y="66" width="28" height="4" rx="2" fill={P} opacity="0.5" />
      <rect x="86" y="75" width="20" height="4" rx="2" fill={P} opacity="0.4" />
      <rect x="86" y="84" width="24" height="4" rx="2" fill={P} opacity="0.4" />
      <rect x="86" y="93" width="16" height="4" rx="2" fill={P} opacity="0.35" />
      {/* box 3 */}
      <rect x="138" y="46" width="44" height="64" rx="8" fill={S} />
      <rect x="146" y="58" width="28" height="4" rx="2" fill="white" opacity="0.5" />
      <rect x="146" y="67" width="20" height="4" rx="2" fill="white" opacity="0.4" />
      <rect x="146" y="76" width="24" height="4" rx="2" fill="white" opacity="0.4" />
      <rect x="146" y="85" width="16" height="4" rx="2" fill="white" opacity="0.35" />
      {/* arrow 1→2 */}
      <path d="M65 86 L75 86" stroke={P} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowP)" />
      {/* arrow 2→3 */}
      <path d="M125 90 L135 80" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
      {/* numbers on top */}
      <circle cx="40" cy="54" r="10" fill={PP} />
      <text x="40" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill={P}>1</text>
      <circle cx="100" cy="46" r="10" fill={PP} />
      <text x="100" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill={P}>2</text>
      <circle cx="160" cy="38" r="10" fill={PP} />
      <text x="160" y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill={P}>3</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Personal – person silhouette + three concentric rings
// ---------------------------------------------------------------------------
export function IllustrationPersonal({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="92" rx="80" ry="42" fill={PB} />
      {/* rings */}
      <circle cx="100" cy="80" r="62" stroke={PP} strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="100" cy="80" r="45" stroke={PL} strokeWidth="2" strokeDasharray="5 3" />
      <circle cx="100" cy="80" r="28" stroke={P} strokeWidth="2" />
      {/* person body */}
      <circle cx="100" cy="65" r="12" fill={P} />
      <path d="M78 110 Q78 88 100 88 Q122 88 122 110Z" fill={P} />
      {/* dots on rings */}
      <circle cx="145" cy="80" r="5" fill={S} />
      <circle cx="55" cy="80" r="5" fill={S} />
      <circle cx="100" cy="35" r="5" fill={SL} />
      <circle cx="100" cy="125" r="4" fill={SL} />
      <circle cx="157" cy="47" r="4" fill={PL} />
      <circle cx="43" cy="113" r="3.5" fill={PL} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Achievement – badge/medal + star burst
// ---------------------------------------------------------------------------
export function IllustrationAchievement({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="96" rx="80" ry="38" fill={SP} />
      {/* ribbon 1 */}
      <path d="M88 92 L86 130 L100 118 L114 130 L112 92Z" fill={P} />
      {/* medal circle */}
      <circle cx="100" cy="82" r="32" fill={S} />
      <circle cx="100" cy="82" r="24" fill={SL} />
      {/* star in medal */}
      <path d="M100 60 L104 74 L119 74 L107 83 L111 97 L100 88 L89 97 L93 83 L81 74 L96 74 Z"
        fill={P} />
      {/* burst lines */}
      <line x1="100" y1="42" x2="100" y2="35" stroke={S} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="118" y1="46" x2="122" y2="40" stroke={S} strokeWidth="2" strokeLinecap="round" />
      <line x1="82" y1="46" x2="78" y2="40" stroke={S} strokeWidth="2" strokeLinecap="round" />
      <line x1="127" y1="64" x2="134" y2="61" stroke={S} strokeWidth="2" strokeLinecap="round" />
      <line x1="73" y1="64" x2="66" y2="61" stroke={S} strokeWidth="2" strokeLinecap="round" />
      {/* sparkle dots */}
      <circle cx="48" cy="50" r="4" fill={P} opacity="0.4" />
      <circle cx="152" cy="48" r="3" fill={P} opacity="0.4" />
      <circle cx="160" cy="90" r="4" fill={SL} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Future – circuit board + lightning bolt + rising arrow
// ---------------------------------------------------------------------------
export function IllustrationFuture({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="96" rx="82" ry="40" fill={PB} />
      {/* circuit lines */}
      <path d="M30 110 H60 V80 H90" stroke={PP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M110 80 H140 V60 H160" stroke={PP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 80 V55 H85" stroke={PP} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M140 60 V90 H170" stroke={PP} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* nodes */}
      <circle cx="60" cy="80" r="5" fill={PL} />
      <circle cx="90" cy="80" r="5" fill={PL} />
      <circle cx="140" cy="60" r="5" fill={PL} />
      <circle cx="60" cy="55" r="4" fill={P} opacity="0.5" />
      {/* lightning bolt */}
      <path d="M100 32 L88 62 H98 L86 100 L118 58 H106 L118 32Z" fill={P} />
      <path d="M100 32 L88 62 H98 L86 100 L118 58 H106 L118 32Z" fill={S} opacity="0.5" />
      {/* rising arrow */}
      <path d="M158 112 L158 72" stroke={S} strokeWidth="3" strokeLinecap="round" />
      <path d="M150 80 L158 72 L166 80" stroke={S} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Learn – stack of books + light beam
// ---------------------------------------------------------------------------
export function IllustrationLearn({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="96" rx="80" ry="38" fill={PB} />
      {/* book 3 (bottom) */}
      <rect x="52" y="103" width="96" height="18" rx="4" fill={PL} />
      <rect x="58" y="103" width="6" height="18" rx="2" fill={P} />
      {/* book 2 (middle) */}
      <rect x="56" y="85" width="88" height="18" rx="4" fill={P} />
      <rect x="62" y="85" width="6" height="18" rx="2" fill={D} opacity="0.2" />
      {/* book 1 (top) */}
      <rect x="60" y="67" width="80" height="18" rx="4" fill={S} />
      <rect x="66" y="67" width="6" height="18" rx="2" fill={D} opacity="0.2" />
      {/* light beam from top of books */}
      <path d="M100 65 L82 32 M100 65 L100 28 M100 65 L118 32" stroke={S} strokeWidth="2"
        strokeLinecap="round" opacity="0.7" />
      <circle cx="100" cy="24" r="8" fill={S} opacity="0.9" />
      {/* small circles (sparkle) */}
      <circle cx="55" cy="50" r="4" fill={PP} />
      <circle cx="145" cy="44" r="3.5" fill={PP} />
      <circle cx="42" cy="70" r="2.5" fill={PL} opacity="0.6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Design – compass + geometric shapes
// ---------------------------------------------------------------------------
export function IllustrationDesign({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="96" rx="80" ry="40" fill={SP} />
      {/* grid dots */}
      {[50, 70, 90, 110, 130, 150].map(x =>
        [50, 70, 90, 110].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill={NG} />
        ))
      )}
      {/* blueprint rectangle */}
      <rect x="54" y="52" width="92" height="72" rx="6" stroke={PL} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      {/* inner shape */}
      <polygon points="100,62 135,100 65,100" fill={PP} />
      <polygon points="100,62 135,100 65,100" stroke={P} strokeWidth="2" fill="none" />
      {/* compass */}
      <g transform="translate(140,46)">
        <circle r="12" fill={P} />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="white" strokeWidth="2" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke="white" strokeWidth="2" />
        <circle r="2.5" fill="white" />
        <path d="M0 -12 L-3 -6 L3 -6Z" fill={S} />
      </g>
      {/* ruler */}
      <rect x="45" y="108" width="75" height="12" rx="3" fill={PL} />
      {[52, 58, 64, 70, 76, 82, 88, 94, 100, 106].map(x => (
        <line key={x} x1={x} y1="108" x2={x} y2="115" stroke={P} strokeWidth="1" />
      ))}
      {/* pencil */}
      <g transform="translate(158,78) rotate(-45)">
        <rect x="-4" y="-20" width="8" height="30" rx="2" fill={S} />
        <polygon points="-4,10 4,10 0,18" fill={D} />
        <rect x="-4" y="-20" width="8" height="7" rx="1" fill={D} opacity="0.3" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Build – stacked blocks / construction
// ---------------------------------------------------------------------------
export function IllustrationBuild({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="106" rx="80" ry="28" fill={PB} />
      {/* ground */}
      <rect x="40" y="112" width="120" height="10" rx="5" fill={PP} />
      {/* block row 1 (bottom) - 3 blocks */}
      <rect x="42" y="90" width="34" height="22" rx="4" fill={P} />
      <rect x="83" y="90" width="34" height="22" rx="4" fill={PL} />
      <rect x="124" y="90" width="34" height="22" rx="4" fill={P} />
      {/* block row 2 - 2 blocks */}
      <rect x="58" y="68" width="34" height="22" rx="4" fill={S} />
      <rect x="99" y="68" width="34" height="22" rx="4" fill={SL} />
      {/* block row 3 - 1 block */}
      <rect x="76" y="46" width="34" height="22" rx="4" fill={P} />
      {/* flag on top */}
      <line x1="93" y1="20" x2="93" y2="46" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M93 20 L112 27 L93 34Z" fill={S} />
      {/* sparkles */}
      <circle cx="42" cy="50" r="4" fill={PP} />
      <circle cx="158" cy="60" r="3.5" fill={PP} />
      <circle cx="155" cy="88" r="2.5" fill={SL} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Community – three person figures connected
// ---------------------------------------------------------------------------
export function IllustrationCommunity({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="106" rx="82" ry="30" fill={SP} />
      {/* connection lines */}
      <line x1="68" y1="72" x2="100" y2="64" stroke={PL} strokeWidth="2" strokeDasharray="4 3" />
      <line x1="132" y1="72" x2="100" y2="64" stroke={PL} strokeWidth="2" strokeDasharray="4 3" />
      <line x1="68" y1="72" x2="132" y2="72" stroke={PL} strokeWidth="1.5" strokeDasharray="4 3" />
      {/* person centre */}
      <circle cx="100" cy="52" r="14" fill={P} />
      <path d="M78 100 Q78 76 100 76 Q122 76 122 100Z" fill={P} />
      {/* person left */}
      <circle cx="62" cy="62" r="11" fill={PL} />
      <path d="M44 104 Q44 84 62 84 Q80 84 80 104Z" fill={PL} />
      {/* person right */}
      <circle cx="138" cy="62" r="11" fill={PL} />
      <path d="M120 104 Q120 84 138 84 Q156 84 156 104Z" fill={PL} />
      {/* globe badge on centre person */}
      <circle cx="100" cy="52" r="6" fill={S} />
      <ellipse cx="100" cy="52" rx="3" ry="6" stroke="white" strokeWidth="1" fill="none" />
      <line x1="94" y1="52" x2="106" y2="52" stroke="white" strokeWidth="1" />
      {/* flags / country pins */}
      <circle cx="55" cy="38" r="5" fill={S} />
      <circle cx="148" cy="35" r="4" fill={S} opacity="0.75" />
      <circle cx="175" cy="58" r="3.5" fill={SL} />
      <circle cx="28" cy="54" r="3" fill={SL} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// RealWorld – laptop + location / environment
// ---------------------------------------------------------------------------
export function IllustrationRealWorld({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="100" rx="84" ry="36" fill={PB} />
      {/* laptop base */}
      <rect x="42" y="100" width="116" height="10" rx="4" fill={PP} />
      {/* laptop screen outer */}
      <rect x="54" y="52" width="92" height="58" rx="6" fill={P} />
      {/* screen inner */}
      <rect x="60" y="58" width="80" height="46" rx="3" fill={D} />
      {/* code lines on screen */}
      <rect x="66" y="65" width="32" height="3" rx="1.5" fill={S} opacity="0.8" />
      <rect x="66" y="72" width="24" height="3" rx="1.5" fill={PL} opacity="0.7" />
      <rect x="70" y="79" width="36" height="3" rx="1.5" fill={S} opacity="0.5" />
      <rect x="66" y="86" width="28" height="3" rx="1.5" fill={SL} opacity="0.7" />
      <rect x="70" y="93" width="20" height="3" rx="1.5" fill={PL} opacity="0.6" />
      {/* location pin beside screen (right side) */}
      <circle cx="155" cy="64" r="10" fill={P} />
      <path d="M155 74 L155 86" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="155" cy="64" r="4" fill="white" />
      {/* mountains/skyline silhouette in screen bg */}
      <polygon points="80,100 90,82 100,94 112,76 122,100" fill={D} opacity="0.4" />
      {/* sparkles */}
      <circle cx="42" cy="60" r="4" fill={SL} />
      <circle cx="38" cy="95" r="3" fill={PP} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SmallCohort – small intimate group / circle with focus
// ---------------------------------------------------------------------------
export function IllustrationSmallCohort({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <ellipse cx="100" cy="104" rx="80" ry="32" fill={PB} />
      {/* outer focus ring */}
      <circle cx="100" cy="78" r="58" stroke={PP} strokeWidth="2" strokeDasharray="5 4" />
      {/* inner ring */}
      <circle cx="100" cy="78" r="38" stroke={PL} strokeWidth="2" />
      {/* 4 person silhouettes spaced evenly */}
      {/* top */}
      <circle cx="100" cy="40" r="9" fill={P} />
      <path d="M87 72 Q87 58 100 58 Q113 58 113 72Z" fill={P} />
      {/* right */}
      <circle cx="136" cy="78" r="8" fill={PL} />
      <path d="M124 106 Q124 94 136 94 Q148 94 148 106Z" fill={PL} />
      {/* bottom */}
      <circle cx="100" cy="114" r="8" fill={S} />
      <path d="M88 136 Q88 130 100 130 Q112 130 112 136Z" fill={S} />
      {/* left */}
      <circle cx="64" cy="78" r="8" fill={SL} />
      <path d="M52 106 Q52 94 64 94 Q76 94 76 106Z" fill={SL} />
      {/* central star */}
      <circle cx="100" cy="78" r="10" fill={P} />
      <path d="M100 70 L101.8 75.5 L107.6 75.5 L103 79 L104.8 84.5 L100 81 L95.2 84.5 L97 79 L92.4 75.5 L98.2 75.5Z"
        fill="white" />
    </svg>
  );
}
