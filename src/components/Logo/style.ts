import styled, { css } from 'styled-components';
import Link from 'next/link';

export const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
    width: 48px;
    height: 48px;
    border-radius: 12px;
    color: ${theme.colors.white};
    background: linear-gradient(
      ${theme.gradient.base.degree},
      ${theme.gradient.base.start} 0%,
      ${theme.gradient.base.end} 100%
    );
  `}
`;

export const Wrapper = styled(Link)<{ big?: boolean }>`
  ${({ big }) => css`
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 24px;
    font-weight: 800;
    color: currentColor;
    text-decoration: none;
    ${big &&
    css`
      font-size: 48px;
      ${Icon} {
        width: 120px;
        height: 120px;
        border-radius: 30px;
      }
    `}
  `}
`;
