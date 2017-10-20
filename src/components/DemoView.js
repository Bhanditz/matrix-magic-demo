import { h, Component } from 'preact';
import { css } from 'emotion';
import styled from 'preact-emotion';
import DataView from './DataView';
import { minDevice } from '../lib/css';

const handheld = minDevice(`
  flex-direction: column;
  order: 1;
  margin-top: 1em;
`);

const View = styled.div`
  display: flex;
  justify-content: space-around;

  ${handheld};
`;

const DemoView = ({ matrix, fcn, label, type, styles }) => (
	<View>
		<DataView
			matrix={matrix}
			label={'Input'}
			type={'matrix'}
			styles={styles}
		/>
		<DataView
			matrix={fcn(matrix)}
			label={label}
			type={type}
			styles={styles}
			logTable
		/>
	</View>
);

export default DemoView;
