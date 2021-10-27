import React from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { useRouter } from 'next/router';
import Scrollbar from '@components/ui/scrollbar';
import FilterDropdown from './filter-dropdown';

export const SizeFilter = ({ sizes, sizeGroupName }: any) => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedSize = React.useMemo(
    () => (query?.size ? (query.size as string).split(',') : []),
    [query?.size]
  );
  const [formState, setFormState] = React.useState<string[]>(selectedSize);
  React.useEffect(() => {
    setFormState(selectedSize);
  }, [selectedSize]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    setFormState(currentFormState);
    const { size, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { size: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <FilterDropdown secondaryText={`(${sizeGroupName})`} title="Size">
      <div className="max-h-full overflow-hidden rounded border border-skin-base">
        <Scrollbar className="w-full category-filter-scrollbar p-5">
          {sizes?.map((item: any) => (
            <CheckBox
              key={`${item.name}-key-${item.id}`}
              label={item.name}
              name={item.name.toLowerCase()}
              checked={formState.includes(item.id.toString())}
              value={item.id}
              onChange={handleItemClick}
            />
          ))}
          <div className="h-10" />
        </Scrollbar>
      </div>
    </FilterDropdown>
  );
};
