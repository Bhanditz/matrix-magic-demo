import { h, Component } from "preact";
import Cell from "./Cell";
import { scaleLinear } from "@vx/scale";
import { max, min } from "d3-array";
import { getMatrixDimensions, flattenArray } from "matrix-magic";

const STYLES = {
  rx: 5,
  ry: 5,
  marginLeft: 2,
  marginBottom: 2
};

const getBarDim = (scale, margin = 0) => {
  const dim = Math.abs(scale.range()[1] - scale.range()[0]) / scale.domain()[1];
  return dim - margin;
};

const makeCoordinateArray = (matrix, hrzScale, vrtScale) => {
  const width = getBarDim(hrzScale);
  const height = getBarDim(vrtScale);

  const coordinateMatrix = matrix.map((r, rowIndex) => {
    return r.map((val, colIndex) => {
      return {
        type: "nArray",
        value: val,
        x: hrzScale(colIndex),
        y: vrtScale(rowIndex),
        width,
        height
      };
    });
  });

  return flattenArray(coordinateMatrix);
};

const NArray = ({ nArray, styles }) => {
  const svgWidth = styles.width;
  const svgHeight = styles.height;

  const height = nArray.length;
  const width = max([...nArray.map(d => d.length)]);

  const cellSize = min([svgWidth / width, svgHeight / height]);

  const hrz = scaleLinear({
    domain: [0, width],
    range: [0, cellSize * width]
  });

  const vrt = scaleLinear({
    domain: [0, height],
    range: [0, cellSize * height]
  });

  const coordinateArray = makeCoordinateArray(nArray, hrz, vrt);

  return (
    <g>{coordinateArray.map((d, i) => <Cell key={i} {...d} {...STYLES} />)}</g>
  );
};

export default NArray;
