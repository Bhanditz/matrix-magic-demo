import { h, Component } from "preact";
import { mainStyles } from "./cellStyles";

const Cell = ({ type, value, x, y, width, height }) => {
  const { entry, color, emoji } = value;
  const { marginBottom, marginLeft, rx, ry, dx, dy } = mainStyles[type];

  const textStyles = {
    x: (width - marginLeft) / 2,
    y: (height + marginBottom) / 2,
    dx,
    dy
  };

  return (
    <g transform={`translate( ${x}, ${y})`}>
      <rect
        height={height - marginBottom}
        width={width - marginLeft}
        fill={color}
        rx={rx}
        ry={ry}
      />
      <text {...textStyles} text-anchor={"middle"}>
        {emoji}
      </text>
    </g>
  );
};

export default Cell;
