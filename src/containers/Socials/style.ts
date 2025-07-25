import styled, { css } from 'styled-components';
import { EType } from './types';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const colors = {
  [EType.TELEGRAM]: '#25a5e5',
  [EType.YOUTUBE]: '#ed1c19',
};

export const Item = styled.a<{ type: EType }>`
  ${({ theme, type }) => css`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: ${colors[type] || theme.colors.theme};
    color: ${theme.colors.white};
    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(1);
    }
  `}
`;
