import { h, Component } from 'preact';
import styled from 'preact-emotion';
import Helmet from 'preact-helmet';
import Title from './Title';
import DemoView from './DemoView';
import TransformButtons from './TransformButtons';
import Demo from './Demo';
import transforms from '../assets/transforms';
import { minDevice, smallBrowser, medBrowser } from '../lib/css';

const matrix = [
	[
		{ entry: '', color: '#ef8fc7', emoji: '😀' },
		{ entry: '', color: '#ef8fc7', emoji: '💩' },
		{ entry: '', color: '#ef8fc7', emoji: '🤖' },
		{ entry: '', color: '#ef8fc7', emoji: '👏' }
	],
	[
		{ entry: '', color: '#8fd0ef', emoji: '😀' },
		{ entry: '', color: '#8fd0ef', emoji: '💩' },
		{ entry: '', color: '#8fd0ef', emoji: '🤖' },
		{ entry: '', color: '#8fd0ef', emoji: '👏' }
	],
	[
		{ entry: '', color: '#efc38f', emoji: '😀' },
		{ entry: '', color: '#efc38f', emoji: '💩' },
		{ entry: '', color: '#efc38f', emoji: '🤖' },
		{ entry: '', color: '#efc38f', emoji: '👏' }
	]
];

const handheld = minDevice(`
  width: 100%;
`);

const deskSmall = smallBrowser(`
  width: 80%;
`);

const deskMed = medBrowser(`
  width: 65%;
`);

const AppBin = styled.div`
  width: 50%;
  margin: 1em auto;
  ${deskSmall};
  ${deskMed};
  ${handheld};
`;

const App = () => (
	<AppBin>
		<Helmet
			title={'Matrix Magic'}
			meta={[
				{ name: 'description', content: 'matrix-magic.js demo' },
				{ property: 'og:image', content: '../assets/thumbnail.png' },
				{ name: 'twitter:card', content: 'summary_large_image' }
			]}
		/>
		<Demo matrix={matrix} transformList={transforms} />
	</AppBin>
);

export default App;
