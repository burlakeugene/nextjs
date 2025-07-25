import styled, { css } from 'styled-components';

type TWrapper = {
  overlay?: boolean;
  full?: boolean;
  visible?: boolean;
};

export const Wrapper = styled.div<TWrapper>`
  ${({ theme, overlay, full, visible }) => css`
    color: ${theme.colors.theme};
    display: flex;
    justify-content: center;
    align-items: center;
    ${full &&
    css`
      width: 100%;
      height: 100%;
    `}
    ${overlay &&
    css`
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 1);
    `}
    opacity: 0;
    visibility: hidden;
    transition: all ${theme.animation.duration};
    ${visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}
  `}
`;
