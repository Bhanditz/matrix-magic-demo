import { h, Component } from 'preact';
import { css } from 'emotion';
import styled from 'preact-emotion';
import { minDevice } from '../lib/css';

const borderRadius = `5px;`;
const onColor = `background-color: black`;
const offColor = `background-color: #3a466d`;

const handheld = minDevice(`
  margin: 2px;
  border-radius: 0;
  border: none;
`);

const btn = css`
  flex-grow: 1;
  text-align: center;
  padding: 0.5em;
  color: #ffffff;
  margin: 0.25em 0.5em;
  border-radius: ${borderRadius};
  ${handheld};
`;

const OnButton = styled.div`${btn} ${onColor};`;

const OffButton = styled.div`${btn} ${offColor};`;

const Button = ({ transformObj, action }) => {
	const { on, label } = transformObj;

	if (on) {
		return <OnButton onClick={() => action(transformObj)}>{label}</OnButton>;
	}
	return <OffButton onClick={() => action(transformObj)}>{label}</OffButton>;
};

export default Button;
