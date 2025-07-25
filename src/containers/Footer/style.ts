import styled, { css } from 'styled-components';
import LinkBase from 'next/link';

export const Wrapper = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.blue};
    padding: 40px 0;
    color: ${theme.colors.white};
    margin-top: auto;
  `}
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Row = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

export const Deliver = styled.div`
  ${({ theme }) => css`
    height: 1px;
    background: ${theme.colors.darkGrey};
  `}
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  &:first-child {
    flex: 2;
  }
`;

export const Title = styled.div`
  font-size: 600;
  font-size: 18px;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Item = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const Link = styled(LinkBase)`
  ${({ theme }) => css`
    display: flex;
    gap: 8px;
    color: currentColor;
    text-decoration: none;
    transition: all 0.3s;
    &:hover {
      color: ${theme.colors.theme};
    }
  `}
`;

export const Bottom = styled(Row)`
  ${({ theme }) => css`
    justify-content: space-between;
    color: ${theme.colors.darkGrey};
    ${Items} {
      flex-direction: row;
      gap: 24px;
    }
  `}
`;

export const Rights = styled.div``;
