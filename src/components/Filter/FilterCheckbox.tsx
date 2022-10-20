import React from 'react';
import { Form } from 'react-bootstrap';

interface IFilterCheckbox {
  label: string;
  action: (isChecked: boolean) => void;
}

const FilterCheckbox = ({ label, action }: IFilterCheckbox) => {
  return (
    <Form.Group className="mt-3 ">
      <Form.Check
        type="checkbox"
        className="d-flex align-items-center gap-2"
        label={label}
        onChange={(e) => action(e.target.checked)}
      />
    </Form.Group>
  );
};

export default FilterCheckbox;
