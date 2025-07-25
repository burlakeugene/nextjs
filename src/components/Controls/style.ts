import styled, { css } from 'styled-components';
import { animateHeight } from '@/styles/animations';

export const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const Label = styled.div`
  ${({ theme }) => css`
    color: ${theme.form.label.color};
    font-weight: 600;
  `}
`;

export const Error = styled.div`
  ${({ theme }) => css`
    color: ${theme.form.error.color};

    ${animateHeight()}
  `}
`;
