import { h, Component } from 'preact';

const Circle = ({ x, y, width }) => {
	const centerShift = x + width / 2;

	const styles = {
		cx: centerShift,
		cy: centerShift,
		r: width / 2,
		fill: 'none',
		stroke: 'black',
		strokeWidth: 1
	};

	return <circle {...styles} />;
};

export default Circle;
