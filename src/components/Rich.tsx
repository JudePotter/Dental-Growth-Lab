/**
 * Renders copy-doc text where the doc highlights words. Wrap highlighted
 * words in double asterisks in the copy ("a **business problem.**") and they
 * come out bold (the site's display weight, see `strong` in globals.css).
 */
export default function Rich({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}
