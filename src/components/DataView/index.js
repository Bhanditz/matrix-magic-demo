import { h, Component } from "preact";
import { doMatrixCheck } from "matrix-magic";
import styled from "preact-emotion";
import Matrix from "./Matrix";
import Array from "./Array";
import NArray from "./NArray";
import { minDevice } from "../../lib/css";

const borderRadius = "10px";

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

const getComponent = (data, styles) => outputType => {
  switch (outputType) {
    case "matrix":
      return <Matrix matrix={data} styles={styles} />;
    case "nArray":
      return <NArray nArray={data} styles={styles} />;
    case "array":
      return <Array arr={data} styles={styles} />;
  }
};

// TODO better array checking
const emojiMatrix = matrix => {
  try {
    return matrix.map(d => d.map(x => x.emoji));
  } catch (err) {
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
      <Label>{label}</Label>
      <Display>
        <svg width={width} height={height}>
          {componentGetter(type)}
        </svg>
        <TypeDisplay>Data type: {type}</TypeDisplay>
      </Display>
    </Bin>
  );
};

export default DataView;
