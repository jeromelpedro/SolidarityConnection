/**
 * Ilustracoes proprias em SVG inline.
 * Evitam dependencia de CDN ou de arquivos externos: a interface continua
 * integra mesmo sem internet, o que importa na demonstracao local.
 */

export function HeroArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="Ilustração de acolhimento e solidariedade"
      className={className}
    >
      <defs>
        <linearGradient id="hero-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        <linearGradient id="hero-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>

        <radialGradient id="hero-glow">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="210" cy="210" r="200" fill="url(#hero-glow)" />

      <circle
        cx="210"
        cy="210"
        r="150"
        fill="none"
        stroke="url(#hero-a)"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      <circle
        cx="210"
        cy="210"
        r="120"
        fill="none"
        stroke="url(#hero-b)"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="4 8"
      />

      {/* Maos acolhendo um coracao: simbolo do acolhimento. */}
      <path
        d="M210 285c-8 0-15-4-20-10l-52-58c-16-18-15-46 3-62 17-16 44-14 60 4l9 10 9-10c16-18 43-20 60-4 18 16 19 44 3 62l-52 58c-5 6-12 10-20 10Z"
        fill="url(#hero-a)"
        opacity="0.9"
      />

      <path
        d="M210 285c-8 0-15-4-20-10l-52-58c-16-18-15-46 3-62 17-16 44-14 60 4l9 10 9-10c16-18 43-20 60-4 18 16 19 44 3 62l-52 58c-5 6-12 10-20 10Z"
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.6"
        strokeWidth="2"
      />

      {/* Nos da rede solidaria. */}
      {[
        [90, 120],
        [330, 120],
        [70, 280],
        [350, 280],
        [210, 60],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#67e8f9">
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <g stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1">
        <line x1="90" y1="120" x2="210" y2="60" />
        <line x1="330" y1="120" x2="210" y2="60" />
        <line x1="70" y1="280" x2="90" y2="120" />
        <line x1="350" y1="280" x2="330" y2="120" />
      </g>
    </svg>
  )
}

const ICONS: Record<string, string> = {
  heart:
    'M12 21s-7-4.35-9.33-8.4C.9 9.35 2.3 5.5 5.7 4.6c2-.53 4 .3 5.1 2 1.1-1.7 3.1-2.53 5.1-2 3.4.9 4.8 4.75 3.03 8-2.33 4.05-9.33 8.4-9.33 8.4Z',
  shield:
    'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1 13-3.5-3.5 1.4-1.4L11 12.2l4.1-4.1 1.4 1.4L11 15Z',
  users:
    'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.7 0-8 1.3-8 4v3h9v-3c0-1 .4-2 1.2-2.8A13 13 0 0 0 8 13Zm8 0c-.5 0-1 0-1.6.1.9.9 1.6 2 1.6 3.4V20h8v-3c0-2.7-5.3-4-8-4Z',
  chart:
    'M4 20h16v2H2V2h2v18Zm4-2H6v-6h2v6Zm4 0h-2V8h2v10Zm4 0h-2v-8h2v8Zm4 0h-2V5h2v13Z',
  sparkles:
    'M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm6 12l.9 2.6L21.5 17l-2.6.9L18 20.5l-.9-2.6L14.5 17l2.6-.9L18 14ZM6 14l.9 2.6L9.5 17l-2.6.9L6 20.5l-.9-2.6L2.5 17l2.6-.9L6 14Z',
  handshake:
    'M12 4.5 9.6 6.9a2 2 0 0 1-2.8 0L4.4 4.5 2 6.9l4.9 4.9 1.4-1.4 2.3 2.3a2 2 0 0 0 2.8 0l2.3-2.3 1.4 1.4L22 6.9l-2.4-2.4-2.4 2.4a2 2 0 0 1-2.8 0L12 4.5ZM4 13.3V19h4v-1.7l-4-4Zm16 0-4 4V19h4v-5.7Z',
}

export function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: keyof typeof ICONS | string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={ICONS[name] ?? ICONS.sparkles} />
    </svg>
  )
}
