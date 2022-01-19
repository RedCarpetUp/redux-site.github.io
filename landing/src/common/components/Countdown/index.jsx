import React, { useEffect, useState, useRef } from "react";

export default function Countdown({ time }) {
  const [timer, setTimer] = useState(time);
  const id = useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  return <div>{timer}</div>;
}
