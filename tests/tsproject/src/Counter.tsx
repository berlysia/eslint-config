import { useEffect, useState } from "react";

export function Counter({ initial }: { readonly initial: number }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    document.title = `count: ${count}`;
  }, [count]);

  return (
    <button
      onClick={() => {
        setCount((value) => value + 1);
      }}
      type="button"
    >
      {count}
    </button>
  );
}
