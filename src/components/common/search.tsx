import React, { useState } from 'react';
import cn from 'classnames';
import { useSearchQuery } from '@framework/product/use-search';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
  searchId?: string;
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  ({ className = 'md:w-[730px] 2xl:w-[800px]', searchId = 'search' }, ref) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const router = useRouter();
    const { pathname, query, basePath } = router;
    const [searchText, setSearchText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);

    useFreezeBodyScroll(
      inputFocus === true || displaySearch || displayMobileSearch
    );

    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
    }
    function clear() {
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
      const { keyword, ...restQuery } = query;

      router.push(
        {
          pathname: `${basePath}/search`,
          query: {
            ...restQuery,
            ...(!!searchText.length ? { keyword: searchText.trim() } : {}),
          },
        },
        undefined,
        { scroll: false }
      );
      clear();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div
          className={cn('overlay cursor-pointer', {
            open: displayMobileSearch,
            'input-focus-overlay-open': inputFocus === true,
            'open-search-overlay': displaySearch,
          })}
          onClick={() => clear()}
        />
        {/* End of overlay */}

        <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
          <div className="flex flex-col mx-auto w-full">
            <SearchBox
              searchId={searchId}
              name="search"
              value={searchText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={() => setSearchText('')}
              onFocus={() => enableInputFocus()}
            />
          </div>
          {/* End of searchbox */}

          {/*
          {searchText && (
            <div className="w-full absolute top-[56px] start-0 py-2.5 bg-skin-fill rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <Scrollbar className="os-host-flexbox">
                <div className="w-full h-[380px]">
                  {isLoading
                    ? Array.from({ length: 15 }).map((_, idx) => (
                        <div
                          key={`search-result-loader-key-${idx}`}
                          className="py-2.5 ps-5 pe-10 scroll-snap-align-start"
                        >
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        </div>
                      ))
                    : data?.map((item, index) => (
                        <div
                          key={`search-result-key-${index}`}
                          className="py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 hover:bg-skin-two"
                          onClick={clear}
                        >
                          <SearchProduct item={item} key={index} />
                        </div>
                      ))}
                </div>
              </Scrollbar>
            </div>
          )}
                    */}
          {/* End of search result */}
        </div>
      </div>
    );
  }
);

export default Search;
