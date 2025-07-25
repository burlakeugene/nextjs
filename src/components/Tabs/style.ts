import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const List = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    background-color: ${theme.colors.white};
    border-radius: 20px;
    padding: 10px;
    gap: 8px;
    margin-right: auto;
    box-shadow: ${theme.boxShadow.panel};
    position: relative;
  `}
`;

export const Item = styled.button<{ active?: boolean }>`
  ${({ theme, active }) => css`
    display: flex;
    background: transparent;
    border: none;
    cursor: pointer;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    color: ${theme.colors.text.light};
    font-weight: 600;
    position: relative;
    padding: 12px;
    transition: all ${theme.animation.duration};
    border-radius: 12px;
    ${!active &&
    css`
      &:hover {
        color: ${theme.colors.text.primary};
      }
    `}
    ${active &&
    css`
      /* background: ${theme.colors.theme}; */
      color: ${theme.colors.white};
    `}
  `}
`;

export const Active = styled.div`
  ${({ theme }) => css`
    position: absolute;
    background: ${theme.colors.theme};
    transition: all ${theme.animation.duration};
    border-radius: 12px;
    background: linear-gradient(
      ${theme.gradient.base.degree},
      ${theme.gradient.base.start} 0%,
      ${theme.gradient.base.end} 100%
    );
  `}
`;
