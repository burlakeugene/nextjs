import styled, { css } from 'styled-components';
import ContainerBase from '@/components/Container';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background: linear-gradient(
      ${theme.gradient.background.degree},
      ${theme.gradient.background.start} 0%,
      ${theme.gradient.background.end} 100%
    );
    position: relative;
    flex-shrink: 0;
    min-height: 100dvh;
    padding: 40px 0;
    display: flex;
    width: 100%;
    justify-content: center;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 80px 80px;
      background-position: center center;
    }
  `}
`;

export const Container = styled(ContainerBase)`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-around;
  display: flex;
`;
