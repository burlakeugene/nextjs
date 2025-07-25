import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme, onClick }) => css`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(
      ${theme.gradient.base.degree},
      ${theme.gradient.base.start} 0%,
      ${theme.gradient.base.end} 100%
    );
    color: ${theme.colors.white};
    font-size: 20px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    ${onClick &&
    css`
      cursor: pointer;
    `}
  `}
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
