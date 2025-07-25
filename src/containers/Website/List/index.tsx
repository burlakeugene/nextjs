import React from 'react';
import Icon from '@/components/Icon';
import PlanetIcon from '@/assets/icons/planet.svg';

import Modal, { modal } from '@/components/Modal';
import Append from '../Append';
import Empty from '@/components/Empty';
import Table from '@/components/Table';
import { useMemoEqualValue, useTranslations } from '@/hooks';
import Skeleton from '@/components/Skeleton';
import { useAppDispatch } from '@/store/hooks';
import {
  EArticleGenerationStatus,
  getWebsites,
  TWebsite,
  runBaseAnalysis,
} from '@/store/slices/dashboard';
import Button, { ESize } from '@/components/Button';
import merge from 'lodash/merge';

import * as S from './style';

import { cleanObject } from '@/utils';
import Avatar from '@/components/Avatar';

type TProps = {
  type?: string;
};

const List = React.memo<TProps>(({ type }) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [table, setTableState] = React.useState({
    data: [],
    count: 0,
    loading: false,
    page: {
      value: 1,
      count: 0,
    },
  });

  const setTable = (newState) => {
    setTableState((prevState) => {
      const nextState = merge({}, prevState, newState);

      if (newState.data) {
        nextState.data = newState.data;
      }

      return nextState;
    });
  };

  const [filter, setFilterState] = React.useState({
    articleGenerationStatus: null,
    search: '',
    isArticleGenerationEnabled: true,
  });

  const setFilter = (newState) => {
    setFilterState((prevState) => merge({}, prevState, newState));
  };

  const tableFilter = useMemoEqualValue(
    cleanObject({
      ...filter,
      search: filter.search.length >= 3 ? filter.search : null,
    })
  );

  React.useEffect(() => {
    setTable({
      page: {
        value: 1,
      },
    });
  }, [tableFilter]);

  const getTableData = React.useCallback(
    (data) => {
      if (data) {
        setTable(data);
      }

      dispatch(
        getWebsites({
          page: data?.page?.value || table.page.value,
          ...tableFilter,
        })
      )
        .unwrap()
        .then((response) => {
          const { data, page, pageCount, total } = response;

          setTable({
            loading: false,
            data,
            count: total,
            page: {
              count: pageCount,
              value: page,
            },
          });
        })
        .catch(() => {
          setTable({
            loading: false,
          });
        });
    },
    [dispatch, table.page.value, tableFilter]
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      getTableData({
        loading: true,
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [getTableData]);

  const appendButton = React.useMemo(() => {
    return {
      onClick: () => {
        modal.open({
          content: (closeModal) => (
            <Modal title={t('Dashboard.append.modal.title')}>
              <Append
                onCancel={closeModal}
                onSubmit={(data) => {
                  closeModal();
                  dispatch(runBaseAnalysis(data));
                  // {id: 190, stageCode: 'parse_links', articleGenerationStatus: 'base_analysis_progress'}
                  // {id: 190, stageCode: 'base_analysis_failed', articleGenerationStatus: 'base_analysis_error'}
                  getTableData({
                    loading: true,
                  });
                }}
              />
            </Modal>
          ),
        });
      },
      text: (
        <>
          <Icon
            style={{
              width: 24,
            }}
            as={PlanetIcon}
          />
          {t('Dashboard.append.button')}
        </>
      ),
    };
  }, [t, getTableData]);

  return (
    <S.Wrapper>
      <S.Filter>
        <S.Buttons>
          <Button size={ESize.SMALL} onClick={appendButton.onClick}>
            {appendButton.text}
          </Button>
        </S.Buttons>
        <S.Search
          value={filter.search || ''}
          placeholder={t('Dashboard.filter.search.placeholder')}
          onChange={(event) => {
            setFilter({
              search: event.target.value,
            });
          }}
        />
        <S.Statuses>
          {[null, ...Object.values(EArticleGenerationStatus)].map(
            (item, index) => (
              <S.StatusButton
                key={index}
                active={
                  (item === null && !filter.articleGenerationStatus) ||
                  filter.articleGenerationStatus === item
                }
                onClick={() => {
                  setFilter({
                    articleGenerationStatus: item,
                  });
                }}
              >
                {t(
                  !item
                    ? 'common.all'
                    : `Dashboard.articleGenerationStatus.${item}.label`
                )}
              </S.StatusButton>
            )
          )}
        </S.Statuses>
      </S.Filter>
      <Table
        data={
          table.loading
            ? new Array<TWebsite>(4).fill({} as TWebsite)
            : table.data
        }
        columns={
          table.loading
            ? [
                {
                  render: () => <Skeleton columns={4} />,
                },
              ]
            : [
                {
                  label: t('Dashboard.table.domain.label'),
                  render: (data, options) => {
                    return (
                      <S.Name>
                        {!options?.isChildren ? (
                          <Avatar name={data.domain} />
                        ) : (
                          <Icon as={PlanetIcon} />
                        )}
                        {data.domain}
                      </S.Name>
                    );
                  },
                },
                {
                  label: t('Dashboard.table.status.label'),
                  render: (data) => {
                    const status = data.features.articleGeneration?.status;

                    return (
                      <S.Status
                        green={status === EArticleGenerationStatus.ACTIVE}
                        red={status === EArticleGenerationStatus.INACTIVE}
                      >
                        {t(`Dashboard.articleGenerationStatus.${status}.label`)}
                      </S.Status>
                    );
                  },
                },
                {
                  label: t('Dashboard.table.totalArticlesAvailable.label'),
                  render: (data) => (
                    <S.Number>
                      {data.features.articleGeneration
                        ?.totalArticlesAvailable || 0}
                    </S.Number>
                  ),
                },
                {
                  label: t('Dashboard.table.articlesWritten.label'),
                  render: (data) => (
                    <S.Number>
                      {data.features.articleGeneration?.articlesWritten || 0}
                    </S.Number>
                  ),
                },
                {
                  label: t('Dashboard.table.analyzedLinksCount.label'),
                  render: (data) => (
                    <S.Number>
                      {data.features.articleGeneration?.analyzedLinksCount || 0}
                    </S.Number>
                  ),
                },
                {
                  render: (data) => <S.Actions>actions here</S.Actions>,
                },
              ]
        }
        page={{
          ...table.page,
          set: (value) => {
            setTable({
              page: {
                value,
              },
            });
          },
        }}
        empty={
          <Empty
            title={t('Dashboard.empty.title')}
            text={t('Dashboard.empty.text')}
            button={appendButton}
          />
        }
      />
    </S.Wrapper>
  );
});

List.displayName = 'List';

export default List;
