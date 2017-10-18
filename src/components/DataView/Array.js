import { h, Component } from "preact";
import Cell from "./Cell";
import { scaleLinear } from "@vx/scale";

const STYLES = {
  rx: 3,
  ry: 3,
  marginLeft: 3,
  marginBottom: 0
};

const makeCoordinateArray = (arr, hrzScale, height, cellSize) => {
  const coordinateMatrix = arr.map((r, i) => {
    return {
      type: "array",
      value: r,
      x: hrzScale(i),
      y: height / 2 - cellSize,
      width: cellSize,
      height: cellSize
    };
  });

  return coordinateMatrix;
};

const Array = ({ arr, styles }) => {
  const svgWidth = styles.width;
  const svgHeight = styles.height;

  const width = arr.length;

  const cellSize = svgWidth / width;

  const hrz = scaleLinear({
    domain: [0, width],
    range: [0, svgWidth]
  });

  const coordinateArray = makeCoordinateArray(arr, hrz, svgHeight, cellSize);

  return (
    <g>{coordinateArray.map((d, i) => <Cell key={i} {...d} {...STYLES} />)}</g>
  );
};

export default Array;
