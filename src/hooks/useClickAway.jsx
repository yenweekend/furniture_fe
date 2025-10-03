import { useEffect } from "react";

const useClickAway = (dropdownRef, targetRef, onClickAway) => {
  useEffect(() => {
    const handleClick = (event) => {
      event.stopPropagation();
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !targetRef.current.contains(event.target)
      ) {
        onClickAway();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dropdownRef, onClickAway]);
};

export default useClickAway;
