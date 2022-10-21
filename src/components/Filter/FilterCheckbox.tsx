import React from 'react';
import { Form } from 'react-bootstrap';

interface IFilterCheckbox {
  label: string;
  action: (isChecked: boolean) => void;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  count: string;
}

const FilterCheckbox = ({
  label,
  action,
  setCount,
  count
}: IFilterCheckbox) => {
  return (
    <Form.Group className="mt-3 ">
      <Form.Check
        type="checkbox"
        className="d-flex align-items-center gap-2"
        label={label}
        onChange={(e) => action(e.target.checked)}
      />
      <Form.Range
        value={count}
        onChange={(e) => setCount(e.target.value)}
        min={1}
        step={1}
        max={10}
      />
    </Form.Group>
  );
};

export default FilterCheckbox;
