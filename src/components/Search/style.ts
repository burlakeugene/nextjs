import styled, { css } from 'styled-components';
import InputBase from '@/components/Controls/Input';
import Icon from '@/components/Icon';

export const Input = styled(InputBase)`
  padding: 16px 40px;
  width: 100%;
`;

export const Clear = styled.button<{ visible?: boolean }>`
  ${({ theme }) => css`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    transition: all ${theme.animation.duration};
    opacity: 0;
    visibility: hidden;
  `}
`;

export const Wrapper = styled.div<{ hasValue?: boolean }>`
  ${({ theme, hasValue }) => css`
    position: relative;
    & > ${Icon} {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      transition: all ${theme.animation.duration};
    }
    ${hasValue &&
    css`
      ${Input} {
        padding-left: 16px;
      }
      ${Clear} {
        opacity: 1;
        visibility: visible;
      }
    `}
  `}
`;
