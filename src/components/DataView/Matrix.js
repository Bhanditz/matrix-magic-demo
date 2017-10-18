import { h, Component } from "preact";
import Cell from "./Cell";
import { scaleLinear } from "@vx/scale";
import { min } from "d3-array";
import { getMatrixDimensions, flattenArray } from "matrix-magic";

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
        type: "matrix",
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

const Matrix = ({ matrix, styles }) => {
  const svgWidth = styles.width;
  const svgHeight = styles.height;

  const { width, height } = getMatrixDimensions(matrix);

  const cellSize = min([svgWidth / width, svgHeight / height]);

  const hrz = scaleLinear({
    domain: [0, width],
    range: [0, cellSize * width]
  });

  const vrt = scaleLinear({
    domain: [0, height],
    range: [0, cellSize * height]
  });

  const coordinateArray = makeCoordinateArray(matrix, hrz, vrt);

  return <g>{coordinateArray.map((d, i) => <Cell key={i} {...d} />)}</g>;
};

export default Matrix;
