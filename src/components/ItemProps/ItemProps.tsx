import React, { useContext, useState } from 'react';
import { onSaveProps } from 'react-edit-text';
import { IItemProps } from '../../models';
import { FormSelect, EditTextComponent } from '../../components';
import { ItemService } from '../../API';
import SocketContext from '../../context/SocketContext';

const ItemProps = ({ data, id, isUser, hovered, newInputs }: IItemProps) => {
  const { socket } = useContext(SocketContext).SocketState;
  const [error, setError] = useState<Error>();

  if (error) throw new Error(error.message);

  const handleSave = async ({ name, value }: onSaveProps) => {
    try {
      await ItemService.updateItem(
        {
          additionalInputs: JSON.stringify({ ...newInputs, [name]: value })
        },
        String(id)
      );
      if (socket) {
        socket.emit(
          'update_CurrentItem',
          JSON.stringify({
            additionalInputs: JSON.stringify({
              ...newInputs,
              [name]: value
            })
          })
        );
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  return (
    <>
      {data.map(({ name, value, type }, index) =>
        type === 'checkbox' ? (
          <FormSelect
            key={index}
            defaultValue={String(value)}
            onBlur={(e) =>
              handleSave({
                name: name + '+' + type,
                value: e.target.value,
                previousValue: ''
              })
            }
            options={[{ value: 'true' }, { value: 'false' }]}
          />
        ) : (
          <EditTextComponent
            key={index}
            isTextArea={type === 'textarea'}
            title={name}
            onSave={handleSave}
            defaultValue={value}
            isUser={isUser}
            hovered={hovered}
            name={name + '+' + type}
          />
        )
      )}
    </>
  );
};

export default ItemProps;
