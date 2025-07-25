import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

export const Row = styled.tr<{ head?: boolean }>`
  ${({ theme, head }) => css`
    border-bottom: 1px solid ${theme.colors.border};
    position: relative;
    &:last-child {
      border: none;
    }
    ${head &&
    css`
      color: ${theme.colors.text.light};
    `}
  `}
`;
export const Col = styled.td`
  padding: 12px 16px;
`;

export const ChildOffset = styled.div<{
  deep: number;
  hasChild?: boolean;
  collapse?: boolean;
}>`
  ${({ deep, hasChild, collapse }) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: calc(
      ${collapse ? (hasChild ? '0px' : '24px') : '0px'} + ${20 * deep}px
    );
  `}
`;

export const Collapse = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  cursor: pointer;
`;
