'use client';
import React from 'react';
import emitter, { EEvents } from '@/utils/Emitter';
import CloseIcon from '@/assets/icons/close.svg';
import * as S from './style';
import { useHotkey } from '@/hooks';
import Template from './Template';

type TData = {
  content: ((onClose: () => void) => React.ReactNode) | React.ReactNode;
  options?: {
    close?: {
      disabled?: boolean;
      timeout?: number;
    };
    id?: number | string;
  };
};

type TModal = {
  onClose: () => void;
  active: boolean;
  options?: TData['options'];
} & React.PropsWithChildren;

const Modal = React.memo<TModal>(
  ({ children, onClose: onCloseProp, active, options }) => {
    const onClose = !!options?.close?.disabled ? undefined : onCloseProp;

    React.useEffect(() => {
      let timeout;

      if (options?.close?.timeout !== undefined) {
        timeout = setTimeout(() => {
          onCloseProp();
        }, options.close.timeout);
      }

      return () => {
        clearTimeout(timeout);
      };
    }, [onCloseProp, options?.close?.timeout]);

    return (
      <S.Modal
        hidden={!active}
        onClick={() => {
          onClose?.();
        }}
      >
        <S.Content
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {onClose && (
            <S.Close onClick={onClose}>
              <CloseIcon />
            </S.Close>
          )}

          <S.Scroller>{children}</S.Scroller>
        </S.Content>
      </S.Modal>
    );
  }
);

export const Modals = React.memo(() => {
  const [list, setList] = React.useState<TData[]>([]);

  const open = React.useCallback((data: TData) => {
    setList((prev) => {
      if (
        data.options?.id &&
        prev.find((prevData) => prevData.options?.id === data.options?.id)
      ) {
        return prev;
      }

      return [...prev, data];
    });
  }, []);

  const close = React.useCallback(
    (data: { index?: number; id?: number | string }) =>
      setList((prev) =>
        prev.filter((item, listIndex) => {
          const { index, id } = data;

          if (index !== undefined) {
            return listIndex !== index;
          }

          if (id !== undefined) {
            return id !== item.options?.id;
          }

          return false;
        })
      ),
    []
  );

  React.useEffect(() => {
    emitter.on(EEvents.MODAL_OPEN, open);
    emitter.on(EEvents.MODAL_CLOSE, close);

    return () => {
      emitter.off(EEvents.MODAL_OPEN, open);
      emitter.off(EEvents.MODAL_CLOSE, close);
    };
  }, [open, close]);

  useHotkey('Escape', () => {
    if (list.length - 1 < 0 || list[list.length - 1].options?.close?.disabled) {
      return;
    }

    close({ index: list.length - 1 });
  });

  if (!list.length) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.Background />
      {list.map((modal, index) => {
        const onClose = () => close({ index });

        return (
          <Modal
            key={index}
            onClose={onClose}
            active={index === list.length - 1}
            options={modal.options}
          >
            {typeof modal.content === 'function'
              ? modal.content(onClose)
              : modal.content}
          </Modal>
        );
      })}
    </S.Wrapper>
  );
});

export const modal = {
  open: (data: TData) => emitter.publish(EEvents.MODAL_OPEN, data),
  close: (id?: number | string) => emitter.publish(EEvents.MODAL_CLOSE, { id }),
};

export default Template;
