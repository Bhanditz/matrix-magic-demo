import { h, render, Component } from 'preact';
import styled from 'preact-emotion';
import TransformButtons from './TransformButtons';
import DemoView from './DemoView';
import Title from './Title';
import transforms from '../assets/transforms';

const styles = {
	width: 200,
	height: 200
};

const Bin = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  text-align: center;
  margin: 2em 0;
  order: 4;
`;

class Demo extends Component {
  state = { transform: { ...transforms[0], on: true } };

  updateTransform = transformObj => this.setState({ transform: transformObj });

  render({ matrix, transformList }, { transform }) {
  	const { label, fcn, output } = transform;

  	return (
  		<Bin>
  			<Title />
  			<TransformButtons
	transforms={transformList}
	action={this.updateTransform}
  			/>
  			<DemoView
	matrix={matrix}
	fcn={fcn}
	label={label}
	type={output}
	styles={styles}
  			/>
  			<Footer>
          Contributions are welcome!{' '}
  				<a href="https://github.com/trainorpj/matrix-magic">
            Find it on GitHub.
  				</a>
  			</Footer>
  		</Bin>
  	);
  }
}

export default Demo;
