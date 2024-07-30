import { useState } from "react";

export default function useStateSync(initialValue) {
  const [trait, updateTrait] = useState(initialValue);

  let current = trait;

  const set = (newValue) => {
    current = newValue;
    updateTrait(newValue);
    return current;
  };

  return [current, set];
}
