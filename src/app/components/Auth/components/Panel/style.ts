import styled, { css } from 'styled-components';

import { fadeInRight, TEffect } from '@/components/Visibility/effects';
import Button from '@/components/Button';

export const Wrapper = styled.div<TEffect>`
  ${({ theme, visible }) => css`
    width: 100%;
    max-width: 500px;
    background: ${theme.colors.white};
    border-radius: 20px;
    padding: 48px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    ${fadeInRight({ visible })}
  `}
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 28px;
  text-align: center;
`;

export const Text = styled.p`
  ${({ theme }) => css`
    text-align: center;
    margin: 0;
    color: ${theme.colors.text.light};
  `}
`;

export const Controls = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export const Submit = styled(Button)`
  flex: 1;
`;

export const Resend = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;

export const ResendSecond = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 800;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    circle {
      stroke-width: 10;
    }
  }
`;

export const ResendButton = styled.button``;

export const Deliver = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      transform: translateY(-50%);
      background-color: ${theme.colors.border};
      z-index: -2;
    }
  `}
`;

export const DeliverInner = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.text.light};
    padding: 0 20px;
    position: relative;
    z-index: -1;
  `}
`;
