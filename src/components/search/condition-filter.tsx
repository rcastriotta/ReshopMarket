import React from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { useRouter } from 'next/router';
import FilterDropdown from './filter-dropdown';

export const ConditionFilter = ({ conditions }: any) => {
  const router = useRouter();
  const { pathname, query } = router;

  const selectedCondition = React.useMemo(
    () => (query?.condition ? (query.condition as string).split(',') : []),
    [query?.condition]
  );
  const [formState, setFormState] = React.useState<string[]>(selectedCondition);
  React.useEffect(() => {
    setFormState(selectedCondition);
  }, [selectedCondition]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    setFormState(currentFormState);
    const { condition, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { condition: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <FilterDropdown title="Condition">
      <div className="p-5 flex flex-col border border-skin-base rounded-md">
        {conditions?.map((item: any) => (
          <CheckBox
            key={`${item.name}-key-${item.id}`}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.id.toString())}
            value={item.id}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </FilterDropdown>
  );
};
