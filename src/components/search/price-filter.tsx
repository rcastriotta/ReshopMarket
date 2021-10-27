import React from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { useRouter } from 'next/router';
import FilterDropdown from './filter-dropdown';

export const PriceFilter = ({ prices }: any) => {
  const router = useRouter();
  const { pathname, query } = router;

  const selectedMaxPrice = React.useMemo(
    () => query.maxPrice,
    [query?.maxPrice]
  );
  const selectedMinPrice = React.useMemo(
    () => query.minPrice,
    [query?.minPrice]
  );
  const [formState, setFormState] = React.useState<any>({
    minPrice: undefined,
    maxPrice: undefined,
  });

  React.useEffect(() => {
    setFormState({ minPrice: selectedMinPrice, maxPrice: selectedMaxPrice });
  }, [selectedMinPrice, selectedMaxPrice]);

  function handleItemClick(minPrice: string, maxPrice: string): void {
    let currentFormState =
      formState.minPrice === minPrice && formState.maxPrice === maxPrice
        ? { minPrice: undefined, maxPrice: undefined }
        : { minPrice, maxPrice };
    setFormState(currentFormState);
    const { maxPrice: maxP, minPrice: minP, ...restQuery } = query;

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(currentFormState.minPrice
            ? { minPrice: currentFormState.minPrice }
            : {}),
          ...(currentFormState.maxPrice
            ? { maxPrice: currentFormState.maxPrice }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <FilterDropdown title="Price">
      <div className="p-5 flex flex-col border border-skin-base rounded-md">
        {prices?.map((item: any) => (
          <CheckBox
            key={`${item.name}-key-${item.id}`}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={
              formState.minPrice === item.minPrice &&
              formState.maxPrice === item.maxPrice
            }
            value={item.id}
            onChange={() => handleItemClick(item.minPrice, item.maxPrice)}
          />
        ))}
      </div>
    </FilterDropdown>
  );
};
