import { h, Component } from 'preact';
import GitHub from 'react-icons/lib/go/mark-github';
import Twitter from 'react-icons/lib/ti/social-twitter';
import { css } from 'emotion';
import styled from 'preact-emotion';
import { minDevice } from '../lib/css';

const TitleBin = styled.div`
  grid-area: title;
  color: #08232c;
  text-align: center;
`;

const Top = styled.div`font-size: 3em;`;

const Name = styled.div`
  font-size: 1.5em;
  margin-top: 0.5em;
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  margin: 0.5em 0;

  a {
    align-self: center;
  }

  a:visited {
    color: black;
  }
`;

const Code = styled.div`
  background-color: #e2e2e2;
  text-align: center;
  padding: 0.5em 0;
  margin: 0 1.5em;
  border-radius: 5px;
  border: 1px solid #797979;

  ${minDevice(`
    margin: 0;
  `)};
`;

const Desc = styled.div`margin: 1em 0;`;

const Title = () => {
	const len = '1.5em';
	return (
		<TitleBin>
			<Top>Matrix Magic</Top>
			<Name>PJ Trainor</Name>
			<Social>
				<a href="https://github.com/trainorpj/matrix-magic">
					<GitHub
						className={css`margin-right: 0.5em;`}
						width={len}
						height={len}
					/>
				</a>
				<a href="https://twitter.com/pj_trainor">
					<Twitter
						className={css`margin-left: 0.5em;`}
						width={len}
						height={len}
					/>
				</a>
			</Social>
			<Desc>
        A library to manipulate, slice, and do other fun things with matrices
			</Desc>
			<Code>
				<code>npm install --save matrix-magic</code>
			</Code>
		</TitleBin>
	);
};

export default Title;
