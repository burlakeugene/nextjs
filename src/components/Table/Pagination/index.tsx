import React from 'react';
import * as S from './style';
import Icon from '@/components/Icon';
import ArrowLeftIcon from '@/assets/icons/arrowLeft.svg';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg';
interface PaginationProps {
  value: number;
  count: number;
  set: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ value, count, set }) => {
  const handlePrevious = () => {
    if (value > 1) {
      set(value - 1);
    }
  };

  const handleNext = () => {
    if (value < count) {
      set(value + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= count) {
      set(page);
    }
  };

  // Генерация кнопок страниц
  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, value - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(count, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <S.Button key={1} onClick={() => handlePageChange(1)}>
          1
        </S.Button>
      );
      if (startPage > 2) {
        pages.push(<>...</>);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <S.Button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={value === page}
        >
          {page}
        </S.Button>
      );
    }

    if (endPage < count) {
      if (endPage < count - 1) {
        pages.push(<>...</>);
      }
      pages.push(
        <S.Button key={count} onClick={() => handlePageChange(count)}>
          {count}
        </S.Button>
      );
    }

    return pages;
  };

  return (
    <S.Wrapper>
      <S.Button onClick={handlePrevious} disabled={value === 1} arrow>
        <Icon as={ArrowLeftIcon} />
      </S.Button>

      {renderPageNumbers()}

      <S.Button onClick={handleNext} disabled={value === count} arrow>
        <Icon as={ArrowRightIcon} />
      </S.Button>
    </S.Wrapper>
  );
};

export default Pagination;
