import Heading from '@components/ui/heading';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Divider from '@components/ui/divider';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const FilterDropdown = ({ title, children, startOpen, secondaryText }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!startOpen);
  const { t } = useTranslation('common');

  let expandIcon = !isOpen ? (
    <IoIosArrowDown
      size={20}
      className="text-base text-skin-primary text-opacity-100"
    />
  ) : (
    <IoIosArrowUp
      size={20}
      className="text-base text-skin-primary text-opacity-100"
    />
  );

  return (
    <div className="block">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex">
          <Heading className="mb-5 -mt-1">{t(title)}</Heading>
          {!!secondaryText && <small className="ml-2">{secondaryText}</small>}
        </div>
        {expandIcon && <span className="ms-auto">{expandIcon}</span>}
      </div>
      {isOpen ? children : <Divider />}
    </div>
  );
};

export default FilterDropdown;
