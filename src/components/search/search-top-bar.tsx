import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import { useUI } from '@contexts/ui.context';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';

const SearchTopBar = ({ count, isLoading }: any) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale, query } = useRouter();
  const { keyword } = query;
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        className="lg:hidden text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:border-skin-primary hover:text-skin-primary"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{t('text-filters')}</span>
      </button>
      <div className="flex w-full items-center justify-end lg:justify-between">
        <div className="flex-shrink-0 text-skin-base font-medium text-15px leading-4 md:me-6 hidden lg:block mt-0.5">
          {isLoading
            ? '...Loading'
            : `${count > 999 ? '999+' : count} ${t('Results')} ${
                keyword ? `for "${keyword}"` : ''
              }`}
        </div>
        <ListBox
          options={[
            { name: 'Best Match', value: '1' },
            { name: 'Newest First', value: '2' },
            { name: 'Lowest Price', value: '3' },
            //{ name: 'Highest Price', value: '4' },
          ]}
        />
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar isLoading={isLoading} count={count} />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
