import React from 'react';

import ArrowDownIcon from '@/assets/icons/arrowDown.svg';
import ArrowLeftIcon from '@/assets/icons/arrowLeft.svg';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg';

import Search from '@/components/Search';
import * as S from './style';
import { useClickOutside, useHotkey } from '@/hooks';
import Icon from '@/components/Icon';

type TOption = {
  value: number | string;
  label: string;
  children?: TOption[];
};

type TProps = {
  onChange?: (value: TOption['value']) => void;
  value?: TOption['value'];
  isInvalid?: boolean;
  disabled?: boolean;
  options: TOption[];
  placeholder?: string;
  labelMaxLevel?: number;
  search?: string;
};

const getPath = (data, value, path: TOption[] = []) => {
  for (const item of data) {
    const nextPath = [...path, item];

    if (item.value === value) {
      return nextPath;
    }

    if (item.children) {
      const childrenPath = getPath(item.children, value, nextPath);

      if (childrenPath.length) {
        return childrenPath;
      }
    }
  }

  return [];
};

export const finder = (data, query) => {
  const result: TOption[] = [];

  query = query.toLowerCase();

  const inner = (node) => {
    if (node.label?.toLowerCase().includes(query)) {
      result.push(node);
    }

    const list = Array.isArray(node) ? node : node.children;

    if (list) {
      for (const item of list) {
        inner(item);
      }
    }
  };

  inner(data);

  return result;
};

export const Select = React.memo<TProps>(
  ({
    onChange,
    value,
    options = [],
    isInvalid,
    disabled,
    placeholder,
    labelMaxLevel = 3,
    search: searchProp = '',
  }) => {
    const [opened, setOpened] = React.useState(false);
    const overlayRef = React.useRef<HTMLDivElement>(null);
    const [search, setSearch] = React.useState('');
    const [current, setCurrent] = React.useState<TOption['value'] | null>(null);

    React.useEffect(() => {
      setSearch(searchProp);
    }, [searchProp]);

    const list = React.useMemo(() => {
      const result = getPath(options, current).at(-1) || options;

      if (search) {
        return {
          value: result.value,
          children: finder(result, search).filter(
            (item) => item.value !== current
          ),
        };
      }

      return result;
    }, [options, current, search]);

    const handleESC = React.useCallback(() => {
      if (!opened) {
        return;
      }

      setOpened(false);
    }, [opened]);

    useHotkey('esc', handleESC);

    useClickOutside(() => {
      if (opened) {
        setOpened(false);
      }
    }, overlayRef);

    const handleClickControl = React.useCallback(() => {
      if (disabled) {
        return;
      }

      setOpened((prev) => !prev);
    }, [disabled]);

    const getLabel = React.useCallback(
      (target) => {
        let path = getPath(options, target);

        if (path.length > labelMaxLevel) {
          path = [path.at(0)!, { label: '...' }, path.at(-1)!];
        }

        return path.map((item) => item.label).join(' / ');
      },
      [options, labelMaxLevel]
    );

    const label = React.useMemo(() => getLabel(value), [getLabel, value]);

    const renderList = React.useCallback(
      (data) => {
        if (!data) {
          return null;
        }

        return (
          <S.List>
            {data?.value && (
              <S.Item
                onClick={() => {
                  setSearch('');
                  setCurrent(
                    getPath(options, data.value).at(-2)?.value ?? null
                  );
                }}
              >
                <Icon as={ArrowLeftIcon} />
                <S.Label>{getLabel(data.value)}</S.Label>
              </S.Item>
            )}
            {(Array.isArray(data) ? data : data.children)?.map(
              (item, index) => {
                const disabled = item.value === value;

                return (
                  <S.Item
                    key={index}
                    title={item.label}
                    disabled={disabled}
                    onClick={() => {
                      if (disabled) {
                        return;
                      }

                      onChange?.(item.value);
                      setOpened(false);
                      setSearch('');
                      setCurrent(null);
                    }}
                  >
                    <S.Label>{item.label}</S.Label>
                    {item.children && (
                      <Icon
                        onClick={(event) => {
                          event.stopPropagation();

                          setSearch('');
                          setCurrent(item.value);
                        }}
                        as={ArrowRightIcon}
                      />
                    )}
                  </S.Item>
                );
              }
            )}
          </S.List>
        );
      },
      [getLabel, options, value, onChange]
    );

    return (
      <S.Wrapper>
        <S.Control
          disabled={disabled}
          invalid={isInvalid}
          onClick={handleClickControl}
          active={opened}
        >
          {!label && placeholder && (
            <S.Placeholder>{placeholder}</S.Placeholder>
          )}
          {label && <S.Label>{label}</S.Label>}
          <Icon
            style={{
              width: 18,
            }}
            as={ArrowDownIcon}
            rotate={opened}
          />
        </S.Control>
        {opened && (
          <S.Overlay ref={overlayRef}>
            <Search onChange={setSearch} value={search} />
            {renderList(list)}
          </S.Overlay>
        )}
      </S.Wrapper>
    );
  }
);

export default Select;
