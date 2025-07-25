import styled, { css, keyframes } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

export const Item = styled.div`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.border};
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.5),
        transparent
      );
      animation: ${keyframes`
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      `} ease-in infinite 1s;
    }
  `}
`;
