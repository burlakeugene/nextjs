import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Toggle = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
`;

export const Overlay = styled.div<{ visible?: boolean }>`
  ${({ theme, visible }) => css`
    position: absolute;
    top: 100%;
    right: 0;
    transition: all ${theme.animation.duration};
    opacity: 0;
    visibility: hidden;
    transform: translateY(16px);
    ${visible &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(8px);
    `}
  `}
`;
