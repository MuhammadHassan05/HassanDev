/**
 * Text whose letters bounce up under the cursor. Pure CSS (globals.css,
 * .bounce-letter), so it needs no JavaScript and does nothing on touch
 * screens or with reduced motion.
 *
 * Use it only where the design does: the hero name, the studio hero heading,
 * the TrackSwitch labels and the two contact headings.
 */
import { Fragment } from "react";

/** Props for {@link BounceText}. */
export interface BounceTextProps {
  text: string;
}

/**
 * Renders each letter in its own span. The whole thing is aria-hidden, since
 * screen readers would otherwise spell the word out letter by letter: the
 * parent element must carry the text as its aria-label.
 *
 * @param props.text - The visible text.
 */
export function BounceText({ text }: BounceTextProps) {
  const words = text.split(" ");
  return (
    <span aria-hidden="true">
      {words.map((word, wordIndex) => (
        // Words never repeat in a way that matters here; the index keeps keys unique.
        <Fragment key={wordIndex}>
          {wordIndex > 0 ? " " : null}
          {/* nowrap keeps a word together; lines still break between words. */}
          <span className="inline-block whitespace-nowrap">
            {[...word].map((letter, letterIndex) => (
              <span key={letterIndex} className="bounce-letter">
                {letter}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
