import styled, { css } from 'styled-components';

type TButtons = {
  isCenter?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const Text = styled.div`
  font-size: 18px;
`;

export const Illustration = styled.svg`
  max-width: 300px;
`;

export const Buttons = styled.div<TButtons>`
  ${({ isCenter }) => css`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: ${isCenter ? 'center' : 'flex-end'};
  `}
`;
