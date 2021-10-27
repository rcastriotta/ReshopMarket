import React from 'react';
import { useTranslation } from 'next-i18next';
import SearchIcon from '@components/icons/search-icon';
import CloseIcon from '@components/icons/close-icon';

type SearchProps = {
  className?: string;
  searchId?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      searchId = 'search',
      value,
      onSubmit,
      onClear,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation('forms');
    return (
      <form
        className="flex w-full relative rounded-md"
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor={searchId} className="flex flex-1 items-center py-0.5">
          <input
            id={searchId}
            className="text-heading outline-none w-full h-[52px] ps-5 md:ps-6 pe-20 md:pe-25 bg-skin-full text-skin-base text-sm lg:text-15px border border-skin-base rounded-md transition-all duration-200 focus:border-skin-primary focus:ring-1 focus:ring-skin-form"
            placeholder={t('Search for anything...')}
            aria-label={searchId}
            autoComplete="off"
            value={value}
            onFocus={onFocus}
            ref={ref}
            {...rest}
          />
        </label>
        {value ? (
          <div className="flex absolute w-20 h-full end-0">
            <button
              type="button"
              onClick={onClear}
              title="Clear search"
              className="cursor-pointer outline-none w-14 md:w-16 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
            >
              <CloseIcon className="w-[15px] h-[15px] text-skin-base text-opacity-40" />
            </button>
            <span
              onClick={onSubmit}
              className="cursor-pointer w-14 md:w-16 h-fulltop-0 end-0 flex flex-shrink-0 justify-center items-center focus:outline-none"
            >
              <SearchIcon className="w-5 h-5 text-skin-base text-opacity-40" />
            </span>
          </div>
        ) : (
          <span
            onClick={onSubmit}
            className="cursor-pointer w-14 md:w-16 h-full absolute top-0 end-0 flex flex-shrink-0 justify-center items-center focus:outline-none"
          >
            <SearchIcon className="w-5 h-5 text-skin-base text-opacity-40" />
          </span>
        )}
      </form>
    );
  }
);

export default SearchBox;

SearchBox.displayName = 'SearchBox';
