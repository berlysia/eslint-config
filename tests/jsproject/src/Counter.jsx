const { useEffect, useState } = require("react");

function Counter() {
  const [count, setCount] = useState(0);

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

module.exports = { Counter };
