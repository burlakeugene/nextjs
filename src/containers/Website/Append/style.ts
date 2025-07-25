import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Switchers = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 16px 0;
    border-top: 1px solid ${theme.colors.border};
    border-bottom: 1px solid ${theme.colors.border};
  `}
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 16px;
`;
