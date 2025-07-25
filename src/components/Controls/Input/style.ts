import styled, { css } from 'styled-components';

type TInput = {
  error?: boolean;
  disabled?: boolean;
};

export const Input = styled.input<TInput>`
  ${({ theme, error, disabled }) => css`
    color: ${theme.form.control.color};
    background: ${theme.form.control.background};
    border: 2px solid ${theme.form.control.border};
    border-radius: 12px;
    transition: all ${theme.animation.duration};
    outline: none;
    font-size: 16px;
    padding: 16px;
    min-height: ${theme.form.control.minHeight};
    line-height: 1em;
    &:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    ${!error &&
    css`
      &:focus {
        border-color: ${theme.form.control.focus.border};
      }
    `}
    ${error &&
    css`
      background: ${theme.form.control.error.background};
      border-color: ${theme.form.control.error.border};
    `}
    ${disabled &&
    css`
      color: ${theme.form.control.disabled.color};
      border-color: ${theme.form.control.disabled.border};
    `}
  `}
`;
