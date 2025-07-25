import React from 'react';
import * as S from './style';

const numToArr = (number) => number.toString().split('');

const FlipNumber = React.memo<React.PropsWithChildren>(({ children }) => {
  const [value, setValue] = React.useState(Number(children));
  const [nextValue, setNextValue] = React.useState(value);

  React.useEffect(() => {
    setNextValue(Number(children));
  }, [children]);

  React.useEffect(() => {
    setTimeout(() => {
      setValue(nextValue);
    }, S.ANIMATION_TIME);
  }, [nextValue]);

  const prepared = React.useMemo(() => {
    let valueArr = numToArr(value);
    let nextValueArr = numToArr(nextValue);
    const diff = nextValueArr.length - valueArr.length;

    if (diff > 0) {
      valueArr = [...new Array(diff).fill(' '), ...valueArr];
    }

    if (diff < 0) {
      nextValueArr = [...new Array(Math.abs(diff)).fill(' '), ...nextValueArr];
    }

    return valueArr.map((current, index) => {
      const result = {
        prev: null,
        current,
        next: null,
      };

      if (value > nextValue && current !== nextValueArr[index]) {
        result.prev = nextValueArr[index];
      }

      if (nextValue > value && current !== nextValueArr[index]) {
        result.next = nextValueArr[index];
      }

      return result;
    });
  }, [value, nextValue]);

  return prepared.map((num, index) => {
    const props = {};

    if (num.prev) {
      props['data-prev'] = num.prev;
    }

    if (num.next) {
      props['data-next'] = num.next;
    }

    return (
      <S.Item {...props} key={index}>
        <S.Current>{num.current}</S.Current>
      </S.Item>
    );
  });
});

FlipNumber.displayName = 'FlipNumber';

export default FlipNumber;
