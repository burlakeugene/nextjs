import styled, { keyframes } from 'styled-components';

const floatUp = keyframes`
  0% {
    transform: scale(0.5);
    bottom: -10%;
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1.2);
    bottom: 110%;
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  animation: ${floatUp} linear infinite;
  height: 0;
  opacity: 0;
`;
