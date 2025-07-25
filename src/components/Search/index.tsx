import React from 'react';

import * as S from './style';
import { useTranslations } from '@/hooks';
import SearchIcon from '@/assets/icons/search.svg';
import CloseIcon from '@/assets/icons/close.svg';
import Icon from '@/components/Icon';

type TProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Search = React.memo<TProps>(
  ({ value, onChange, placeholder, className }) => {
    const t = useTranslations();

    return (
      <S.Wrapper className={className} hasValue={!!value}>
        <Icon as={SearchIcon} hide={!!value} />
        <S.Input
          value={value || ''}
          onChange={(event) => {
            onChange?.(event.target.value);
          }}
          placeholder={placeholder || t('common.search')}
          autoFocus
        />
        <S.Clear
          onClick={() => {
            onChange?.('');
          }}
        >
          <Icon as={CloseIcon} />
        </S.Clear>
      </S.Wrapper>
    );
  }
);

Search.displayName = 'Search';

export default Search;
