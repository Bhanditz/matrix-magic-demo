import * as mm from "matrix-magic";

const addOutputType = (objArr, type) =>
  objArr.map(d => ({
    ...d,
    output: type
  }));

const matrixOutputs = [
  { label: "Transpose", fcn: mm.transpose },
  { label: "Get Middle Columns", fcn: mm.getMiddleCols },
  { label: "Get Middle Rows", fcn: mm.getMiddleRows },
  { label: "Flip Columns", fcn: mm.flipCols },
  { label: "Flip  Rows", fcn: mm.flipRows },
  { label: "Get All But Bottom Row", fcn: mm.getAllButBottomRow },
  { label: "Get All But Top Row", fcn: mm.getAllButTopRow },
  { label: "Get All But Left Column", fcn: mm.getAllButLeftCol },
  { label: "Get All But Right Column", fcn: mm.getAllButRightCol }
];

const arrayOutputs = [
  { label: "Clockwise Spiral", fcn: mm.getClockwiseSpiral },
  { label: "Counterclockwise Spiral", fcn: mm.getCounterClockwiseSpiral }
];

const nArrayOutputs = [
  { label: "Minor Diagonals", fcn: mm.getMinorDiagonals },
  { label: "Major Diagonals", fcn: mm.getMajorDiagonals }
];

export default [
  ...addOutputType(matrixOutputs, "matrix"),
  ...addOutputType(arrayOutputs, "array"),
  ...addOutputType(nArrayOutputs, "nArray")
].map(d => ({ ...d, on: false }));
