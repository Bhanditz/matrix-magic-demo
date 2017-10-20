import { css } from 'emotion';

export const minDevice = styles => css`
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    ${styles};
  }
`;

export const medBrowser = styles => css`
  @media only screen and (min-width: 946px) and (max-width: 1151px) and (-webkit-min-device-pixel-ratio: 1) {
    ${styles};
  }
`;

export const smallBrowser = styles => css`
  @media only screen and (min-width: 569px) and (max-width: 945px) and (-webkit-min-device-pixel-ratio: 1) {
    ${styles};
  }
`;
