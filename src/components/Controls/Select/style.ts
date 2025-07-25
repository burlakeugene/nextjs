import styled, { css, keyframes } from 'styled-components';
import Icon from '@/components/Icon';

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input<{ error?: boolean; disabled?: boolean }>`
  ${({ theme, error, disabled }) => css`
    padding: 6px 16px;
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

export const Control = styled.div<{
  disabled?: boolean;
  active?: boolean;
  invalid?: boolean;
}>`
  ${({ theme, disabled, active, invalid }) => css`
    border-radius: 4px;
    padding: 6px 16px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    justify-content: space-between;
    color: ${theme.form.control.color};
    background: ${theme.form.control.background};
    border: 2px solid ${theme.form.control.border};
    border-radius: 12px;
    cursor: pointer;
    transition: ${theme.animation.duration};
    user-select: none;
    font-size: 16px;
    padding: 16px;
    min-height: ${theme.form.control.minHeight};
    line-height: 1em;
    ${disabled &&
    css`
      color: ${theme.form.control.disabled.color};
      border-color: ${theme.form.control.disabled.border};
      cursor: default;
    `}
    ${active &&
    css`
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      border-color: ${theme.form.control.focus.border};
    `}
    ${invalid &&
    css`
      box-shadow: inset 0 0 0 2px ${theme.form.control.error.border};
      background-color: ${theme.form.control.error.background};
    `}
    ${Icon} {
      margin-left: auto;
    }
  `}
`;

export const Label = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Placeholder = styled(Label)`
  ${({ theme }) => css`
    color: ${theme.form.control.placeholder};
  `}
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    padding: 8px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    transition: ${theme.animation.duration};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    box-shadow: ${theme.boxShadow.panel};
    z-index: 3;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: ${keyframes`
      0% {
        opacity: 0;
        transform: translateY(6px);
      }
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    `} ${theme.animation.duration};
  `}
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 300px;
`;

export const Item = styled.div<{ disabled?: boolean }>`
  ${({ theme, disabled }) => css`
    padding: 16px;
    display: flex;
    align-items: flex-start;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background ${theme.animation.duration};
    color: ${theme.form.control.color};
    border-radius: 10px;
    font-size: 16px;
    ${!disabled &&
    css`
      &:hover {
        background-color: ${theme.form.control.border};
      }
    `}
    ${disabled &&
    css`
      color: ${theme.form.control.disabled.color};
      cursor: not-allowed;
      ${Icon} {
        color: ${theme.form.control.color};
        cursor: pointer;
      }
    `}
  `}
`;
