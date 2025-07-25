import React from 'react';
import * as S from './style';
import { useClickOutside, useHotkey } from '@/hooks';

type TProps = {
  toggle: (props: {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactElement;
  overlay: (props: {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactElement;
};

const Dropdown = React.memo<TProps>(({ toggle, overlay }) => {
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [opened, setOpened] = React.useState(false);

  const handleClose = React.useCallback(() => {
    if (!opened) {
      return;
    }

    setOpened(false);
  }, [opened]);

  useHotkey('Escape', handleClose);

  useClickOutside(handleClose, overlayRef);

  return (
    <S.Wrapper>
      <S.Toggle
        onClick={() => {
          setOpened((prev) => !prev);
        }}
        ref={toggleRef}
      >
        {typeof toggle === 'function' ? toggle({ opened, setOpened }) : toggle}
      </S.Toggle>
      <S.Overlay visible={opened} ref={overlayRef}>
        {typeof overlay === 'function'
          ? overlay({ opened, setOpened })
          : overlay}
      </S.Overlay>
    </S.Wrapper>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
