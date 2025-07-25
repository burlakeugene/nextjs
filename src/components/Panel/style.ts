import styled, { css } from 'styled-components';
import { EType } from './types';
import { animateHeight } from '@/styles/animations';

type TProps = {
  type: EType;
};

export const Wrapper = styled.div<TProps>`
  ${({ theme, type }) => {
    const target = theme.panel[type.toLowerCase()] || theme.panel.default;

    return css`
      color: ${target.color};
      display: flex;
      gap: 12px;
      border-radius: 12px;
      padding: 16px;
      width: 100%;
      font-size: 14px;
      line-height: 20px;
      align-items: flex-start;
      background: ${target.background};
      ${animateHeight({
        padding: {
          start: '0 16px',
          end: '16px',
        },
        height: '150px',
      })}
    `;
  }}
`;
