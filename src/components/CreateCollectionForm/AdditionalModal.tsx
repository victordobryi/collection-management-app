import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { INewInputsModal } from '../../models';
import { FormItem, FormSelect, ModalContainer } from '../../components';

const AdditionalModal = ({
  handleCloseAdditional,
  setProp,
  additionalProps
}: INewInputsModal) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('input');

  const addNewField = () => {
    const newProps = { name, type };
    setProp([...additionalProps, newProps]);
    handleCloseAdditional();
  };

  return (
    <>
      <ModalContainer
        title="Add a new item property"
        onClose={handleCloseAdditional}
        onCreate={addNewField}
        createButtonText="Add new field"
      >
        <>
          <Form>
            <FormItem
              label="Сhoose the name of the new property"
              onChange={setName}
              placeholder=" "
              value={name}
            />
            <FormSelect
              defaultValue="Сhoose the type"
              onChange={setType}
              options={[
                { value: 'text' },
                { value: 'textarea' },
                { value: 'checkbox' },
                { value: 'number' }
              ]}
            />
          </Form>
        </>
      </ModalContainer>
    </>
  );
};

export default AdditionalModal;
