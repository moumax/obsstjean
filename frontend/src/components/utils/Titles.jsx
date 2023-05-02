export default function Titles({ size, color, text }) {
  return <h1 className={`font-exo2 pb-2 ${size} ${color}`}>{text}</h1>;
}
