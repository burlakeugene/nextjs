import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button<{ arrow?: boolean }>`
  ${({ theme, arrow }) => css`
    font-size: 14px;
    font-weight: 600;
    background: ${theme.colors.white};
    color: ${theme.colors.text.primary};
    padding: 0;
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all ${theme.animation.duration};
    box-shadow: inset 0 0 0 2px ${theme.colors.theme};
    ${arrow &&
    css`
      background-color: ${theme.colors.theme};
      color: ${theme.colors.white};
    `}

    &:hover:not(:disabled) {
      background-color: ${theme.colors.theme};
      color: ${theme.colors.white};
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
      ${!arrow &&
      css`
        opacity: 1;
        background-color: ${theme.colors.theme};
        color: ${theme.colors.white};
      `}
    }
  `}
`;
