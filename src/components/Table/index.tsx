import React from 'react';
import * as S from './style';
import { flatData, setPaths } from '@/utils';
import Icon from '@/components/Icon';
import ArrowUpIcon from '@/assets/icons/arrowUp.svg';
import Pagination from './Pagination';

type TProps<T> = {
  data?: T[];
  columns?: Array<{
    label?: string;
    render?: (data: T, options?: { isChildren?: boolean }) => React.ReactNode;
  }>;
  collapse?: {
    enabled?: boolean;
  };
  page?: {
    value: number;
    count: number;
    set: (value: number) => void;
  };
  empty?: React.ReactNode;
};

const Table = React.memo(
  <T = unknown,>({
    data: dataProp = [],
    columns = [],
    collapse,
    page,
    empty = null,
  }: TProps<T>) => {
    const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>(
      {}
    );

    React.useEffect(() => {
      setCollapsed({});
    }, [dataProp]);

    const data = React.useMemo<Array<T & { path: string }>>(
      () => flatData(setPaths(structuredClone(dataProp))),
      [dataProp]
    );

    const getChildren = React.useCallback(
      (target) =>
        data.filter((item) => item.path?.startsWith(`${target.path}.`)),
      [data]
    );

    const tableHasChildren = React.useMemo(
      () => data.some((item) => (item.path?.split('.').length || 0) > 1),
      [data]
    );

    return (
      <S.Wrapper>
        {!data.length ? (
          empty
        ) : (
          <>
            <S.Table>
              {columns?.some((row) => !!row.label) && (
                <S.Row head>
                  {columns.map((column, colIndex) => (
                    <S.Col key={colIndex}>{column.label}</S.Col>
                  ))}
                </S.Row>
              )}
              {data.map((item, rowIndex) => {
                const childrenCount = getChildren(item).length;
                const path = item.path;
                const deep = path.split('.').length - 1;
                const isCollapsed = Object.keys(collapsed).some(
                  (collapedKey) => {
                    return (
                      path.startsWith(`${collapedKey}.`) &&
                      collapsed[collapedKey]
                    );
                  }
                );

                if (isCollapsed) {
                  return null;
                }

                return (
                  <S.Row key={rowIndex}>
                    {columns.map((column, colIndex) => {
                      const isFirstCol = colIndex === 0;

                      return (
                        <S.Col key={colIndex}>
                          {isFirstCol && tableHasChildren ? (
                            <S.ChildOffset
                              deep={deep}
                              collapse={collapse?.enabled}
                              hasChild={!!childrenCount}
                            >
                              {collapse?.enabled && !!childrenCount && (
                                <S.Collapse
                                  data-selector="Table__collapse"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    setCollapsed((prev) => ({
                                      ...prev,
                                      [path]: !prev[path],
                                    }));
                                  }}
                                >
                                  <Icon
                                    rotate={collapsed[path]}
                                    as={ArrowUpIcon}
                                  />
                                </S.Collapse>
                              )}

                              {column.render?.(item, { isChildren: deep >= 1 })}
                            </S.ChildOffset>
                          ) : (
                            column.render?.(item)
                          )}
                        </S.Col>
                      );
                    })}
                  </S.Row>
                );
              })}
            </S.Table>
            {page && page.count > 1 && <Pagination {...page} />}
          </>
        )}
      </S.Wrapper>
    );
  }
) as <T = unknown>(props: TProps<T>) => React.ReactElement;

export default Table;
