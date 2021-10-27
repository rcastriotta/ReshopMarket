import { CheckBox } from '@components/ui/form/checkbox';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '@components/ui/input';
import Scrollbar from '@components/ui/scrollbar';
import FilterDropdown from './filter-dropdown';

export const BrandFilter = ({ all, suggested }: any) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const router = useRouter();
  const { pathname, query } = router;

  const selectedBrands = React.useMemo(
    () => (query?.brand ? (query.brand as string).split(',') : []),
    [query?.brand]
  );
  const [formState, setFormState] = React.useState<string[]>(selectedBrands);
  React.useEffect(() => {
    setFormState(selectedBrands);
  }, [selectedBrands]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    setFormState(currentFormState);
    const { brand, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { brand: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const items = searchText
    ? all.filter((b: any) =>
        b.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      )
    : suggested;

  return (
    <FilterDropdown title="Brand">
      <>
        <Input
          name="Search"
          variant="solid"
          className="mb-5"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div
          id="brand-scroll"
          className="max-h-full overflow-hidden rounded border border-skin-base"
        >
          <Scrollbar className="w-full category-filter-scrollbar p-5 pb-0">
            {items?.slice(0, 100)?.map((item: any) => (
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
      </>
    </FilterDropdown>
  );
};
