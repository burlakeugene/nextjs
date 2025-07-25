import styled, { css } from 'styled-components';
import { EType } from './types';

export const Wrapper = styled.div<{ type?: EType }>`
  ${({ theme, type }) => css`
    padding: 40px;
    box-shadow: ${theme.boxShadow.panel};
    border-radius: 20px;
    ${type === EType.FLOAT &&
    css`
      position: relative;
      color: ${theme.colors.white};
      background-image: linear-gradient(
        ${theme.gradient.base.degree},
        ${theme.gradient.base.start} 0%,
        ${theme.gradient.base.end} 100%
      );
    `}
  `}
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 30px;
`;
