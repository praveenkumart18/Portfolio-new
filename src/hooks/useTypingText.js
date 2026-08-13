import { useEffect, useState } from "react";

export function useTypingText(words, speed = 80, pause = 1100) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isComplete = text === currentWord;
    const isEmpty = text === "";

    const delay = isComplete && !deleting ? pause : deleting ? speed / 2 : speed;

    const timeout = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      const nextLength = deleting ? text.length - 1 : text.length + 1;
      setText(currentWord.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, pause, speed, text, wordIndex, words]);

  return text;
}
