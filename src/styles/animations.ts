import { keyframes, css } from 'styled-components';

type TAnimateHeight = {
  height?: string;
  padding?: {
    start: string;
    end: string;
  };
  margin?: {
    start: string;
    end: string;
  };
};

export const animateHeightKeyframes = (props: TAnimateHeight = {}) => {
  const { padding, margin, height = '100px' } = props;

  return keyframes`
    0% {
      max-height: 0;
      overflow: hidden;
      ${
        padding &&
        css`
          padding: ${padding.start};
        `
      }
      ${
        margin &&
        css`
          margin: ${margin.start};
        `
      }
    }
    100% {
      max-height: ${height};
      overflow: visible;
      ${
        padding &&
        css`
          padding: ${padding.end};
        `
      }
      ${
        margin &&
        css`
          margin: ${margin.end};
        `
      }
    }
  `;
};

export const animateHeight = (props?: TAnimateHeight) => css`
  animation: ${animateHeightKeyframes(props)} 0.6s;
`;
