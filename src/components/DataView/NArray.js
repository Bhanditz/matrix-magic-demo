/* eslint-disable react/jsx-no-bind */
import { flattenArray } from 'matrix-magic';

const getBarDim = (scale, margin = 0) => {
	const dim = Math.abs(scale.range()[1] - scale.range()[0]) / scale.domain()[1];
	return dim - margin;
};

export const makeCoordinateArray = (matrix, hrzScale, vrtScale) => {
	const width = getBarDim(hrzScale);
	const height = getBarDim(vrtScale);

	const coordinateMatrix = matrix.map((r, rowIndex) =>
		r.map((val, colIndex) => ({
			type: 'nArray',
			value: val,
			x: hrzScale(colIndex),
			y: vrtScale(rowIndex),
			width,
			height
		}))
	);

	return flattenArray(coordinateMatrix);
};
