import styled, { css } from 'styled-components';
import InputBase from '@/components/Controls/Input';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Filter = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Search = styled(InputBase)`
  min-width: 300px;
  margin-left: auto;
`;

export const Statuses = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  flex-shrink: 0;
`;

export const StatusButton = styled.button<{ active?: boolean }>`
  ${({ theme, active }) => css`
    border: 1px solid ${theme.colors.border};
    background: ${theme.colors.white};
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all ${theme.animation.duration};
    ${!active &&
    css`
      &:hover {
        background: ${theme.colors.grey};
      }
    `}
    ${active &&
    css`
      background: ${theme.colors.theme};
      border-color: ${theme.colors.theme};
      color: ${theme.colors.white};
    `}
  `}
`;

export const Name = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    svg {
      color: ${theme.colors.theme};
    }
  `}
`;

export const Status = styled.div<{ red?: boolean; green?: boolean }>`
  ${({ theme, red, green }) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    background: ${theme.colors.orange.light};
    color: ${theme.colors.orange.dark};
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${theme.colors.orange.bright};
    }
    ${red &&
    css`
      background: ${theme.colors.red.light};
      color: ${theme.colors.red.dark};
      &:before {
        background: ${theme.colors.red.default};
      }
    `}
    ${green &&
    css`
      background: ${theme.colors.green.light};
      color: ${theme.colors.green.dark};
      &:before {
        background: ${theme.colors.green.default};
      }
    `}
  `}
`;

export const Number = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
