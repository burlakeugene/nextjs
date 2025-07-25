import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    padding: 0 16px;
    width: 100%;
    max-width: ${theme.container.maxWidth};
  `}
`;

export default Container;
