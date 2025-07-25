import { css } from 'styled-components';

export type TEffect = { visible?: boolean; delay?: number };

export const fadeIn = ({ visible, delay }: TEffect) => css`
  ${({ theme }) => css`
    opacity: 0;
    transition: ${theme.animation.duration};
    ${visible &&
    css`
      opacity: 1;
    `}
    ${!!delay &&
    css`
      transition-delay: ${delay}ms;
    `}
  `}
`;

export const fadeInUp = (props: TEffect) => css`
  ${fadeIn(props)}
  transform: translateY(20px);
  ${props.visible &&
  css`
    transform: translateY(0);
  `}
`;

export const fadeInLeft = (props: TEffect) => css`
  ${fadeIn(props)}
  transform: translateX(20px);
  ${props.visible &&
  css`
    transform: translateX(0);
  `}
`;

export const fadeInRight = (props: TEffect) => css`
  ${fadeIn(props)}
  transform: translateX(-20px);
  ${props.visible &&
  css`
    transform: translateX(0);
  `}
`;
