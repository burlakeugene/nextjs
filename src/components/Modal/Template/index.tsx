import React from 'react';
import Button, { EAppearance as EButtonAppearance } from '@/components/Button';
import LoadingIcon from '@/assets/icons/loading.svg';
import Hotkey from '@/components/Hotkey';
import Icon from '@/components/Icon';

import * as S from './style';

type TButton = {
  disabled?: boolean;
  text?: string;
  onClick?: () => void | Promise<unknown>;
  appearance?: EButtonAppearance;
  hotkey?: string;
};

export type TButtons = {
  list: TButton[];
  centered?: boolean;
};

type TProps = {
  buttons?: TButtons;
  illustration?: (props: React.SVGProps<SVGElement>) => React.ReactElement;
  title?: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  width?: string;
  onHide?: () => void;
};

const Confirm = React.memo<TProps>(
  ({ illustration, title, text, children, buttons: buttonsProp }) => {
    const [loaders, setLoaders] = React.useState({});

    const buttons = React.useMemo(() => {
      if (!buttonsProp?.list.length) {
        return null;
      }

      return (
        <S.Buttons isCenter={buttonsProp.centered}>
          {buttonsProp.list.map((item, index) => {
            const loading = !!loaders[index];

            return (
              <Button
                key={index}
                appearance={item.appearance}
                onClick={
                  item.onClick
                    ? () => {
                        const onClickResult = item.onClick?.();
                        const isPromise = onClickResult instanceof Promise;

                        if (isPromise) {
                          setLoaders((prev) => ({
                            ...prev,
                            [index]: true,
                          }));
                          onClickResult.finally(() => {
                            setLoaders((prev) => ({
                              ...prev,
                              [index]: false,
                            }));
                          });
                        }
                      }
                    : undefined
                }
                disabled={item.disabled || loading}
              >
                {item.hotkey && <Hotkey value={item.hotkey} />}
                {loading ? <Icon as={LoadingIcon} /> : item.text}
              </Button>
            );
          })}
        </S.Buttons>
      );
    }, [loaders, buttonsProp]);

    return (
      <S.Wrapper>
        {title && <S.Title>{title}</S.Title>}
        {text && <S.Text>{text}</S.Text>}
        {illustration && <S.Illustration as={illustration} />}
        {children}
        {buttons}
      </S.Wrapper>
    );
  }
);

Confirm.displayName = 'Confirm';

export default Confirm;
