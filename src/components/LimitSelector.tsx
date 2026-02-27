import type { Dispatch, SetStateAction } from 'react';

type Props = {
  limit: number;
  onLimitChange: Dispatch<SetStateAction<number>>;
};

const LimitSelector = ({ limit, onLimitChange }: Props) => {
  return (
    <div className='controls'>
      <label htmlFor='limit'>Show: </label>

      <select
        id='limit'
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default LimitSelector;
