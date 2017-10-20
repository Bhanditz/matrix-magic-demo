import { h, Component } from 'preact';
import { mainStyles } from './cellStyles';

const Cell = ({ type, value, x, y, width, height, opacity }) => {
	const { entry, color, emoji } = value;
	const { marginBottom, marginLeft, rx, ry, dx, dy } = mainStyles[type];

	const textStyles = {
		x: (width - marginLeft) / 2,
		y: (height + marginBottom) / 2,
		dx,
		dy
	};

	return (
		<g transform={`translate( ${x}, ${y})`} opacity={opacity}>
			<rect
				height={Math.max(0, height - marginBottom)}
				width={Math.max(0, width - marginLeft)}
				fill={color}
				rx={rx}
				ry={ry}
			/>
			<text {...textStyles} text-anchor={'middle'}>
				{emoji}
			</text>
		</g>
	);
};

export default Cell;
