import styled, { css } from 'styled-components';

export const Control = styled.div`
  ${({ theme }) => css`
    width: 48px;
    height: 24px;
    border-radius: 24px;
    transition: all ${theme.animation.duration};
    background: transparent;
    border: 2px solid ${theme.colors.darkGrey};
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      transform: translate(-120%, -50%);
      border-radius: 50%;
      background: ${theme.colors.darkGrey};
      transition: all ${theme.animation.duration};
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    display: none;
    &:checked + ${Control} {
      background: ${theme.colors.theme};
      border-color: ${theme.colors.theme};
      &:before {
        width: 18px;
        height: 18px;
        background: ${theme.colors.white};
        transform: translate(10%, -50%);
      }
    }
  `}
`;

export const Wrapper = styled.label<{
  disabled?: boolean;
  error?: boolean;
}>`
  ${({ theme, error, disabled }) => css`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    transition: all ${theme.animation.duration};
    font-size: 16px;
    cursor: pointer;
    ${error &&
    css`
      color: ${theme.form.error.color};
    `}
    ${disabled &&
    css`
      cursor: default;
      color: ${theme.form.control.disabled.color};
      ${Input}:checked + ${Control},${Control} {
        background-color: ${theme.form.control.disabled.border};
        border-color: ${theme.form.control.disabled.border};
        &:before {
          background-color: ${theme.colors.white};
        }
      }
    `}
  `}
`;
