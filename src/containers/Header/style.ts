import styled, { css } from 'styled-components';

export const Wrapper = styled.header<{ hide?: boolean }>`
  ${({ theme, hide }) => css`
    pointer-events: none;
    width: 100%;
    padding: 10px 0;
    position: fixed;
    top: 0;
    transition: all ${theme.animation.duration};
    z-index: 3;
    ${hide &&
    css`
      transform: translateY(-100%);
    `}
  `}
`;

export const Panel = styled.div`
  ${({ theme }) => css`
    pointer-events: all;
    display: flex;
    gap: 20px;
    align-items: center;
    background: ${theme.colors.white};
    padding: 10px;
    border-radius: 20px;
    box-shadow: ${theme.boxShadow.panel};
  `}
`;

export const PanelEnd = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
  align-items: center;
`;
