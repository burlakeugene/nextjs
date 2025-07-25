import styled, { css } from 'styled-components';
import { fadeInLeft, TEffect } from '@/components/Visibility/effects';
import IconBase from '@/components/Icon';

export const Wrapper = styled.div<TEffect>`
  ${({ theme, visible }) => css`
    max-width: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    color: ${theme.colors.white};
    ${fadeInLeft({ visible })};
  `}
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 800;
  font-size: 36px;
  text-align: center;
`;

export const Text = styled.p`
  text-align: center;
  margin: 0;
  line-height: 1.6em;
  font-size: 18px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checked = styled.div`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  ${IconBase} {
    width: 80%;
  }
`;
