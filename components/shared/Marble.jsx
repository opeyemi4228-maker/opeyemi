// Marble, drawn rather than photographed. Thin diagonal veins are laid down
// as a pattern, then warped by fractal noise (a displacement map), the
// standard way procedural marble is made. The result is generated in the
// browser from a few hundred bytes of SVG: no image download, sharp at any
// size. Used only by Words on Marble, where the name earns it.

const svg = (seed) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000' preserveAspectRatio='xMidYMid slice'>` +
  `<defs>` +
  `<pattern id='p' width='1600' height='240' patternUnits='userSpaceOnUse' patternTransform='rotate(-24)'>` +
  `<rect width='1600' height='240' fill='%23f6f4ef'/>` +
  `<rect y='118' width='1600' height='1.8' fill='%238c8881'/>` +
  `<rect y='54' width='1600' height='0.8' fill='%23b1ada5'/>` +
  `<rect y='186' width='1600' height='0.6' fill='%23c2beb6'/>` +
  `</pattern>` +
  `<filter id='m' x='-10%' y='-10%' width='120%' height='120%'>` +
  `<feTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='5' seed='${seed}' result='n'/>` +
  `<feDisplacementMap in='SourceGraphic' in2='n' scale='230' xChannelSelector='R' yChannelSelector='G'/>` +
  `<feGaussianBlur stdDeviation='0.55'/>` +
  `</filter>` +
  `</defs>` +
  `<rect x='-100' y='-100' width='1800' height='1200' fill='url(%23p)' filter='url(%23m)'/>` +
  `</svg>`;

export const marbleStyle = (seed = 11) => ({
  backgroundColor: "#f6f4ef",
  backgroundImage: `url("data:image/svg+xml;utf8,${svg(seed)}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export default function Marble({ seed = 11, className = "", children, style, ...rest }) {
  return (
    <div className={className} style={{ ...marbleStyle(seed), ...style }} {...rest}>
      {children}
    </div>
  );
}
