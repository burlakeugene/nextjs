import styled, { css, keyframes } from 'styled-components';

const animateOpacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(20px) scale(0.9);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

export const Background = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    animation: ${animateOpacity} linear ${theme.animation.duration};
    backdrop-filter: blur(10px);
  `}
`;

type TModal = {
  hidden?: boolean;
};
export const Modal = styled.div<TModal>`
  ${({ theme, hidden }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${animateOpacity} linear ${theme.animation.duration};
    padding: 40px;
    ${hidden &&
    css`
      display: none;
    `}
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    max-width: 500px;
    width: 100%;
    border-radius: 16px;
    color: ${theme.colors.text.primary};
    position: relative;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: ${slideUp} linear ${theme.animation.duration};
  `}
`;

export const Scroller = styled.div`
  ${({ theme }) => css`
    overflow: auto;
    padding: 30px;
    scrollbar-color: ${theme.colors.text.primary} transparent;
    flex: 1;
  `}
`;

export const Close = styled.button`
  ${({ theme }) => css`
    padding: 0;
    width: 24px;
    height: 24px;
    background: transparent;
    color: ${theme.colors.white};
    border: none;
    cursor: pointer;
    position: absolute;
    top: -30px;
    right: -30px;
  `}
`;
