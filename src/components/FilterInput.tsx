import type { Dispatch, SetStateAction } from 'react';

type Props = {
  filter: string;
  onFilterChange: Dispatch<SetStateAction<string>>;
};

const FilterInput = ({ filter, onFilterChange }: Props) => {
  return (
    <div className='filter'>
      <input
        type='text'
        placeholder='Filter coins...'
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
