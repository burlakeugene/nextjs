import styled, { css } from 'styled-components';
import LinkBase from 'next/link';

export const Overlay = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    min-width: 280px;
    box-shadow: ${theme.boxShadow.panel};
  `}
`;

export const Top = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const Tariff = styled.div`
  ${({ theme }) => css`
    font-size: 13px;
    color: ${theme.colors.text.light};
    background: ${theme.colors.grey};
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: auto;
  `}
`;

export const Links = styled.div`
  ${({ theme }) => css`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-top: 1px solid ${theme.colors.border};
  `}
`;

export const Link = styled(LinkBase)<{ red?: boolean; active?: boolean }>`
  ${({ theme, red, active }) => css`
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    border-radius: 6px;
    transition: all ${theme.animation.duration};
    color: ${theme.colors.text.primary};
    line-height: 1em;
    &:hover {
      background: ${theme.colors.grey};
    }
    ${active &&
    css`
      background: ${theme.colors.grey};
    `}

    ${red &&
    css`
      color: ${theme.colors.red.default};
      &:hover {
        background: ${theme.colors.red.light};
      }
      ${active &&
      css`
        background: ${theme.colors.red.light};
      `}
    `}
  `}
`;
