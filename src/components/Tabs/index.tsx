import React from 'react';
import * as S from './style';
import { useForceUpdate, useOnChange } from '@/hooks';

type TItem = {
  label: React.ReactNode;
  content: React.ReactNode | ((index: number) => React.ReactNode);
};

type TProps = {
  className?: string;
  list?: TItem[];
  active?: number;
  onChange?: (index: number) => void;
};
const Tabs = React.memo<TProps>(
  ({ className, list = [], active: activeProps = 0, onChange }) => {
    const [active, setActive] = React.useState(activeProps);
    const itemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
    const wrapperRef = React.useRef(null);
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
      setActive(activeProps);
    }, [activeProps]);

    useOnChange(() => {
      onChange?.(active);
    }, [active]);

    const data = React.useMemo(() => list[active], [list, active]);

    const content = React.useMemo(() => {
      if (!data?.content) {
        return null;
      }

      if (typeof data.content === 'function') {
        return data.content(active);
      }

      return data.content;
    }, [data, active]);

    React.useEffect(() => {
      itemsRef.current = itemsRef.current.slice(0, list.length);
    }, [list.length]);

    React.useEffect(() => {
      if (!wrapperRef.current) return;

      const observer = new ResizeObserver(() => {
        forceUpdate();
      });

      observer.observe(wrapperRef.current);

      return () => {
        observer.disconnect();
      };
    }, [list]);

    return (
      <S.Wrapper ref={wrapperRef} className={className}>
        <S.List>
          <S.Active
            style={{
              width: itemsRef.current[active]?.offsetWidth,
              height: itemsRef.current[active]?.offsetHeight,
              left: itemsRef.current[active]?.offsetLeft,
              top: itemsRef.current[active]?.offsetTop,
            }}
          />
          {list.map((item, index) => (
            <S.Item
              key={index}
              ref={(element) => {
                itemsRef.current[index] = element;
              }}
              active={index === active}
              onClick={() => setActive(index)}
            >
              {item.label}
            </S.Item>
          ))}
        </S.List>
        {content}
      </S.Wrapper>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;
