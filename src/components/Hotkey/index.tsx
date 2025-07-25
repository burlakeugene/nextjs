import styled from 'styled-components';

import React from 'react';

import { useHotkey } from '@/hooks';

type TProps = {
  value: string;
};

const Pixel = styled.div`
  display: none;
`;

export enum EHotkeys {
  ENTER = 'Enter',
  ESC = 'Escape',
}

const Hotkey: React.FC<TProps> = ({ value }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useHotkey(value, () => {
    ref.current?.click();
  });

  return <Pixel ref={ref} />;
};

export default Hotkey;
