import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const getMatches = () => window.matchMedia(query).matches;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener("change", listener);

    // Không setState trong effect! -> tránh ESLint warning

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
