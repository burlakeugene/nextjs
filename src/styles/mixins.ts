import { css } from 'styled-components';

export const flexWrapper = ({
  count,
  gap,
}: {
  count: number;
  gap: string;
}) => css`
  --count: ${count};
  --gap: ${gap};
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
`;

export const flexItem =
  'width: calc(100% / var(--count) - ((var(--count) - 1) * var(--gap)) / var(--count));';
