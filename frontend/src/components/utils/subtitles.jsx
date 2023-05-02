export default function SubTitles({ size, color, text }) {
  return (
    <h3 className={`font-exo2 italic opacity-70 pb-3 ${size} ${color}`}>
      `{text}`
    </h3>
  );
}
