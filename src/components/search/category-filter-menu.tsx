import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useMemo, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import ClipLoader from 'react-spinners/ClipLoader';

function CategoryFilterMenuItem({
  className = 'hover:bg-skin-two border-t border-skin-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  allCategories,
  loadingCategory,
  setLoadingCategory,
  depth = 0,
}: any) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;

  const checkIfActive = (id: any): any => {
    if (!id) return false;
    if (id === item.id) return true;
    return checkIfActive(allCategories.find((c: any) => c.id === id).parentId);
  };

  const isActive = query.category ? checkIfActive(+query.category) : false;
  const isActiveCategory = query?.category === item.id.toString();

  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { id, name, icon } = item;
  const isLoading = loadingCategory === id;

  const items = allCategories?.filter((c: any) => c.parentId === id);

  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    setLoadingCategory(id);
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    }
    const { category, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...{ category: id },
        },
      },
      undefined,
      { scroll: false }
    );

    displaySidebar && closeSidebar();
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
    );
  }

  return (
    <>
      <li
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-skin-two': isOpen },
          className
        )}
      >
        <button
          className={`flex items-center w-full text-start group ${
            depth > 0 && 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
          }`}
          onClick={toggleCollapse}
        >
          {icon && (
            <div className="inline-flex flex-shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto me-2.5 md:me-4 2xl:me-3 3xl:me-4">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={40}
                height={40}
              />
            </div>
          )}
          <div className="flex space-x-2 items-center">
            <span
              onClick={onClick}
              className={cn(
                'text-skin-base py-0.5 lg:hover:underline active:underline cursor-pointer space-x-2',
                {
                  'font-bold': isActiveCategory,
                  // 'text-skin-primary': isActiveCategory,
                }
              )}
            >
              {name}
            </span>
            {isLoading && (
              <div className="mt-1">
                <ClipLoader size={12} color="#02b290" />
              </div>
            )}
          </div>

          {expandIcon && <span className="ms-auto">{expandIcon}</span>}
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="text-xs px-4">
            {items?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.id}`}
                  item={currentItem}
                  allCategories={allCategories}
                  loadingCategory={loadingCategory}
                  setLoadingCategory={setLoadingCategory}
                  depth={childDepth}
                  className="px-0 border-t border-skin-base first:border-t-0 mx-[10px] bg-transparent"
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenu({ items, className }: any) {
  const [loadingCategory, setLoadingCategory] = useState(null);
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    setLoadingCategory(null);
  }, [query]);
  return (
    <ul className={cn(className)}>
      {items
        ?.filter((i: any) => !i.parentId)
        .map((item: any) => (
          <CategoryFilterMenuItem
            key={`${item.id}-key-${item.id}`}
            allCategories={items}
            item={item}
            setLoadingCategory={(i: any) => setLoadingCategory(i)}
            loadingCategory={loadingCategory}
          />
        ))}
    </ul>
  );
}

export default CategoryFilterMenu;
