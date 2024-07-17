import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const prizes = [
  {
    color: "#a6cee3",
    value: 400
  },
  {
    color: "#b2df8a",
    value: 200
  },
  {
    color: "#fb9a99",
    value: 0
  },
  {
    color: "#fdbf6f",
    value: 100
  },
  {
    color: "#cab2d6",
    value: 800
  }
];

export default function Spiner() {
  const [total, setTotal] = useState(0);

  const [keys, setKeys] = useState([0, 1, 2, 3, 4]);
  const [spin, set] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const end = useRef(0);
  const styles = useSpring({
    to: { x: end.current },
    config: { duration: 1600 },
    onRest: () => {
      setDisabled(false);
      setTotal((prev) => prev + prizes.at(keys[2] % 5).value);
    }
  });

  const handleSpin = () => {
    const rand = Math.ceil(
      (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * 5
    );
    setKeys((prev) =>
      Array.from(Array(15 + rand), (_, x) => x - (14 + rand) + prev[4])
    );
    set(!spin);
    setDisabled(true);
    end.current = end.current + 800 + rand * 80;
  };

  return (
    <>
      <button className="btn btn-outline-primary" disabled={disabled} onClick={handleSpin}>
        spin
      </button>
      <div style={{ width: 320, overflow: "clip" }}>
        <animated.div style={{ position: "relative", height: 80, ...styles }}>
          {keys.map((val) => (
            <div
              key={val}
              style={{
                position: "absolute",
                width: 70,
                height: 70,
                top: 5,
                left: val * 80 + 5,
                backgroundColor: prizes.at(val % 5).color,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {prizes.at(val % 5).value}
            </div>
          ))}
          {!disabled && (
            <div
              style={{
                position: "absolute",
                width: "70px",
                height: "76px",
                top: 5,
                left: keys[2] * 80 + 5,
                border: "5px solid #e31a1c"
              }}
            />
          )}
        </animated.div>
      </div>
      <div>{`Total Prize: ${total}`}</div>
    </>
  );
}
