import styled, { css, keyframes } from 'styled-components';

export const ANIMATION_TIME = 300;

const animation = (name) =>
  css`
    ${name} ${ANIMATION_TIME}ms
  `;

const up = keyframes`
    to {
      transform: translateY(-100%);
    }
  `;

const down = keyframes`
    to {
      transform: translateY(100%);
    }
  `;

const fadeOut = keyframes`
    to {
      opacity: 0;
      visibility: hidden;
    }
  `;

const fadeIn = keyframes`
    to {
      opacity: 1;
      visibility: visible;
    }
  `;

export const Current = styled.span``;

export const Item = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1em;
  white-space: pre-wrap;
  &:before,
  &:after {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    opacity: 0;
    visibility: hidden;
  }
  &:before {
    content: attr(data-next);
    transform: translateY(-100%) translateX(-50%);
  }
  &:after {
    content: attr(data-prev);
    transform: translateY(100%) translateX(-50%);
  }
  &[data-next] {
    animation: ${animation(down)};
    ${Current} {
      animation: ${animation(fadeOut)};
    }
    &:before {
      animation: ${animation(fadeIn)};
    }
  }
  &[data-prev] {
    animation: ${animation(up)};
    ${Current} {
      animation: ${animation(fadeOut)};
    }
    &:after {
      animation: ${animation(fadeIn)};
    }
  }
`;
