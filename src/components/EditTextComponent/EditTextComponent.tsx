import React from 'react';
import { Card } from 'react-bootstrap';
import { EditText, EditTextarea } from 'react-edit-text';
import { useTranslation } from 'react-i18next';
import { IEditTextComponent } from '../../models';

const EditTextComponent = ({
  isTextArea = false,
  title,
  value,
  setValue,
  onBlur,
  hovered,
  isUser,
  defaultValue
}: IEditTextComponent) => {
  const { t } = useTranslation();

  return (
    <div
      className={`d-flex ${
        isTextArea ? 'align-items-flex-start' : 'align-items-baseline'
      }`}
    >
      {title && <Card.Text>{`${t(title || '')}: `}</Card.Text>}
      {isTextArea ? (
        <EditTextarea
          name={title}
          defaultValue={defaultValue}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onBlur={onBlur}
        />
      ) : (
        <EditText
          name={title}
          defaultValue={defaultValue}
          editButtonProps={{ style: { marginLeft: '10px', minWidth: 25 } }}
          showEditButton={hovered && isUser}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default EditTextComponent;
