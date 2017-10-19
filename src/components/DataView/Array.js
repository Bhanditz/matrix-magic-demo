/* eslint-disable react/jsx-no-bind */

export const makeCoordinateArray = (arr, hrzScale, height, cellSize) => {
	const coordinateMatrix = arr.map((r, i) => ({
		type: 'array',
		value: r,
		x: hrzScale(i),
		y: height / 2 - cellSize,
		width: cellSize,
		height: cellSize
	}));

	return coordinateMatrix;
};
