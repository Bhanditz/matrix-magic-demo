/* eslint-disable react/jsx-no-bind */
import { Motion } from 'data-driven-motion';
import { getMatrixDimensions } from 'matrix-magic';
import styled from 'preact-emotion';
import { makeCoordinateArray as makeMatrixArray } from './Matrix';
import { makeCoordinateArray as makeArrayArray } from './Array';
import { makeCoordinateArray as makeNArrayArray } from './NArray';
import Cell from './Cell';
import { minDevice } from '../../lib/css';
import { max, min } from 'd3-array';
import { scaleLinear } from '@vx/scale/build/index';

const STIFF_SPRING = { stiffness: 1028, damping: 36 };
const borderRadius = '10px';

const Bin = styled.div`
	${minDevice(`
  margin-bottom: 1em;
`)};
`;

const Display = styled.div`
	background-color: #fff;
	padding: 2em;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	border-bottom-left-radius: ${borderRadius};
	border-bottom-right-radius: ${borderRadius};
	${minDevice(`
    padding: 1em;
  `)};
`;

const Label = styled.div`
	background-color: #3a466d;
	color: #ffffff;
	text-align: center;
	padding: 1em 0;
	border-top-left-radius: ${borderRadius};
	border-top-right-radius: ${borderRadius};
`;

const TypeDisplay = styled.div`
	color: #afafaf;
	width: 100%;
	text-align: right;
	padding-right: 1em;
	padding-top: 0.5em;
	${minDevice(`
  padding-top: 0;
`)};
`;

const STYLES = {
	array: {
		rx: 3,
		ry: 3,
		marginLeft: 3,
		marginBottom: 0
	},
	nArray: {
		rx: 5,
		ry: 5,
		marginLeft: 2,
		marginBottom: 2
	},
	matrix: {}
};

const getComponent = (data, styles) => outputType => {
	let coordinateArray;
	const svgWidth = styles.width;
	const svgHeight = styles.height;
	switch (outputType) {
		case 'matrix': {
			const { width, height } = getMatrixDimensions(data);

			const cellSize = min([svgWidth / width, svgHeight / height]);

			const hrz = scaleLinear({
				domain: [0, width],
				range: [0, cellSize * width]
			});

			const vrt = scaleLinear({
				domain: [0, height],
				range: [0, cellSize * height]
			});

			coordinateArray = makeMatrixArray(data, hrz, vrt);
			break;
		}
		case 'nArray': {
			const height = data.length;
			const width = max([...data.map(d => d.length)]);

			const cellSize = min([svgWidth / width, svgHeight / height]);

			const hrz = scaleLinear({
				domain: [0, width],
				range: [0, cellSize * width]
			});

			const vrt = scaleLinear({
				domain: [0, height],
				range: [0, cellSize * height]
			});

			coordinateArray = makeNArrayArray(data, hrz, vrt);
			break;
		}
		case 'array': {
			const width = data.length;

			const cellSize = svgWidth / width;

			const hrz = scaleLinear({
				domain: [0, width],
				range: [0, svgWidth]
			});

			coordinateArray = makeArrayArray(data, hrz, svgHeight, cellSize);
			break;
		}
	}

	return (
		<Motion
			data={coordinateArray}
			component={<g />}
			getKey={(d, i) => `${d.value.emoji}-${d.value.color}`}
			render={(key, data, style) =>
				<Cell key={key} {...data} {...style} {...STYLES[outputType]} />}
			onComponentMount={({ x, y }) => ({
				x,
				y,
				opacity: 0,
				height: 0,
				width: 0
			})}
			onRender={({ x = 0, y = 0, height = 0, width = 0 }, i, spring) => ({
				x: spring(x),
				y: spring(y),
				height: spring(height, STIFF_SPRING),
				width: spring(width, STIFF_SPRING),
				opacity: spring(1, STIFF_SPRING)
			})}
			onRemount={({ x = 0, y = 0, height = 0, width = 0 }, i) => ({
				x: 0,
				y: svgHeight,
				height,
				width,
				opacity: 0
			})}
			onUnmount={({ x = 0, y = 0, height = 0, width = 0 }, spring) => ({
				x: spring(x, STIFF_SPRING),
				y: spring(y, STIFF_SPRING),
				height: spring(0, STIFF_SPRING),
				width: spring(0, STIFF_SPRING),
				opacity: spring(0, STIFF_SPRING)
			})}
		/>
	);
};

// TODO better array checking
const emojiMatrix = matrix => {
	try {
		return matrix.map(d => d.map(x => x.emoji));
	}
	catch (err) {
		return matrix.map(d => d.emoji);
	}
};

const DataView = ({ matrix, type, label, styles, logTable = false }) => {
	const { width, height } = styles;

	const componentGetter = getComponent(matrix, styles);

	if (logTable) {
		console.log(`output of ${label}`);
		console.table(emojiMatrix(matrix));
	}

	return (
		<Bin>
			<Label>
				{label}
			</Label>
			<Display>
				<svg width={width} height={height}>
					{componentGetter(type)}
				</svg>
				<TypeDisplay>
          Data type: {type}
				</TypeDisplay>
			</Display>
		</Bin>
	);
};

export default DataView;
