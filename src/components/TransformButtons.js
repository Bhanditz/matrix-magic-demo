import { h, Component } from "preact";
import { css } from "emotion";
import styled from "preact-emotion";
import Button from "./Button";
import { minDevice } from "../lib/css";

const handheld = minDevice(`
  margin: 1em 5px;
  justify-content: flex-start;
  order: 2;
`);

const ButtonBin = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 1em;
  ${handheld};
`;

const TransformButtons = ({ transforms, action }) => {
  return (
    <ButtonBin>
      {transforms.map((d, i) => {
        return <Button key={i} transformObj={d} action={action} />;
      })}
    </ButtonBin>
  );
};

export default TransformButtons;
