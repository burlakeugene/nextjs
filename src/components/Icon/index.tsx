import styled, { css } from 'styled-components';

const Icon = styled.svg<{ rotate?: boolean; hide?: boolean }>`
  ${({ theme, rotate, hide }) => css`
    width: 16px;
    max-width: 100%;
    height: auto;
    flex-shrink: 0;
    transition: all ${theme.animation.duration};
    ${rotate &&
    css`
      transform: rotate(180deg);
    `}
    ${hide &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
  `}
`;

export default Icon;
