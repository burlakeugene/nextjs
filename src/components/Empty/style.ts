import styled, { css } from 'styled-components';
import {
  TEffect,
  fadeInLeft,
  fadeInRight,
} from '@/components/Visibility/effects';

export const Wrapper = styled.div<{ reverse?: boolean }>`
  ${({ reverse }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex: 1;
    ${reverse &&
    css`
      flex-direction: row-reverse;
    `}
  `}
`;

export const Content = styled.div<TEffect>`
  ${({ visible }) => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    max-width: 500px;
    width: 100%;
    ${fadeInLeft({ visible })}
  `}
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: 800;
`;

export const SubTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`;

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.text.light};
    margin: 0;
  `}
`;

export const Illustration = styled.svg<TEffect>`
  ${({ visible }) => css`
    max-width: 274px;
    width: 100%;
    ${fadeInRight({ visible })}
    @media (max-width: 768px) {
      display: none;
    }
  `}
`;
