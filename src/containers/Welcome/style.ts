import { flexItem, flexWrapper } from '@/styles/mixins';
import styled, { css } from 'styled-components';
import { Input as InputBase } from '@/components/Controls';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  text-align: center;
`;

export const Text = styled.div`
  ${({ theme }) => css`
    text-align: center;
    font-size: 16px;
    color: ${theme.colors.text.light};
  `}
`;

export const Controls = styled.div`
  ${flexWrapper({
    count: 2,
    gap: '20px',
  })}
`;

export const Input = styled(InputBase)`
  ${flexItem}
`;
