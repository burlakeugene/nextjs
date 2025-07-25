import styled, { css } from 'styled-components';
import { EAppearance, EColor, ESize } from './types';

type TButton = {
  appearance: EAppearance;
  color: EColor;
  size: ESize;
  disabled?: boolean;
  wide?: boolean;
};

export const Button = styled.button<TButton>`
  ${({ theme, appearance, disabled, wide, color, size }) => css`
    border: none;
    outline: none;
    background: transparent;
    font-weight: 600;
    padding: 16px;
    border-radius: 12px;
    font-size: 16px;
    min-height: ${theme.button.minHeight};
    min-width: ${theme.button.minHeight};
    line-height: 1em;
    transition: all ${theme.animation.duration};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    ${wide &&
    css`
      width: 100%;
    `}
    ${disabled &&
    css`
      cursor: default;
      opacity: 0.6;
    `}

    ${!disabled &&
    css`
      &:hover:not(:active) {
        transform: translateY(-2px);
      }
    `}

    ${appearance === EAppearance.PRIMARY &&
    css`
      background-color: ${theme.button.primary.background};
      color: ${theme.button.primary.color};
      background-image: linear-gradient(
        ${theme.gradient.base.degree},
        ${theme.gradient.base.start} 0%,
        ${theme.gradient.base.end} 100%
      );
      ${color === EColor.WHITE &&
      css`
        background: ${theme.button.primary.white.background};
        color: ${theme.button.primary.white.color};
      `}
      ${color === EColor.GREEN &&
      css`
        background: ${theme.button.primary.green.background};
      `}
      ${color === EColor.RED &&
      css`
        background: ${theme.button.primary.red.background};
      `}
      ${color === EColor.GREY &&
      css`
        background: ${theme.button.primary.grey.background};
      `}
    `}

    ${appearance === EAppearance.GHOST &&
    css`
      box-shadow: inset 0 0 0 2px ${theme.button.ghost.border};
      color: ${theme.button.ghost.color};
      &:not(:disabled):hover {
        background-color: ${theme.button.ghost.hover.background};
        color: ${theme.button.ghost.color};
        box-shadow: inset 0 0 0 2px ${theme.button.ghost.border};
      }

      ${color === EColor.WHITE &&
      css`
        color: ${theme.button.ghost.white.color};
        box-shadow: inset 0 0 0 2px ${theme.button.ghost.white.border};
        &:not(:disabled):hover {
          background: ${theme.button.ghost.white.hover.background};
          color: ${theme.button.ghost.white.hover.color};
          box-shadow: inset 0 0 0 2px ${theme.button.ghost.white.border};
        }
      `}

      ${color === EColor.GREEN &&
      css`
        color: ${theme.button.ghost.green.color};
        box-shadow: inset 0 0 0 2px ${theme.button.ghost.green.border};
        &:not(:disabled):hover {
          background: ${theme.button.ghost.green.hover.background};
          color: ${theme.button.ghost.green.hover.color};
          box-shadow: inset 0 0 0 2px ${theme.button.ghost.green.border};
        }
      `}

      ${color === EColor.RED &&
      css`
        color: ${theme.button.ghost.red.color};
        box-shadow: inset 0 0 0 2px ${theme.button.ghost.red.border};
        &:not(:disabled):hover {
          background: ${theme.button.ghost.red.hover.background};
          color: ${theme.button.ghost.red.hover.color};
          box-shadow: inset 0 0 0 2px ${theme.button.ghost.red.border};
        }
      `}
      ${color === EColor.GREY &&
      css`
        color: ${theme.button.ghost.grey.color};
        box-shadow: inset 0 0 0 2px ${theme.button.ghost.grey.border};
        &:not(:disabled):hover {
          background: ${theme.button.ghost.grey.hover.background};
          color: ${theme.button.ghost.grey.hover.color};
          box-shadow: inset 0 0 0 2px ${theme.button.ghost.grey.border};
        }
      `}
    `}
    ${size === ESize.SMALL &&
    css`
      padding: 12px;
      min-width: 42px;
      min-height: 42px;
      border-radius: 8px;
    `}
  `}
`;
