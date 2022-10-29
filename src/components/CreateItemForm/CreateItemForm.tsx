import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ItemService, TagService } from '../../API';
import { IItem, ITag, IModalItemProps, INewInputsProps } from '../../models';
import { mediaUploader } from '../../utils';
import SocketContext from '../../context/SocketContext';
import {
  DropImageZone,
  TagCreator,
  ModalContainer,
  FormItem
} from '../../components';

const CreateItemForm = ({
  collectionId,
  userId,
  handleClose,
  setLoading,
  additionalInputs
}: IModalItemProps) => {
  const [title, setTitle] = useState('');
  const [newInputsData, setNewInputsData] = useState<INewInputsProps[]>([]);
  const newInputs: INewInputsProps[] = JSON.parse(additionalInputs);
  const { socket } = useContext(SocketContext).SocketState;
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [error, setError] = useState<Error>();

  if (error) throw new Error(error.message);

  const createItem = async () => {
    handleClose();
    setLoading(true);
    const url = await mediaUploader(files, 'items');
    const item: IItem = {
      title,
      collectionId,
      userId,
      img: url[0] || '',
      createTime: String(Date.now()),
      additionalInputs: JSON.stringify(newInputsData),
      tags: JSON.stringify(tags)
    };

    try {
      await ItemService.addItem(item);
      Promise.all(
        tags.map(async (tag) => {
          await TagService.addTag(tag);
        })
      );

      if (socket) {
        socket.emit('add_NewItem', JSON.stringify(item));
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setLoading(false);
      setNewInputsData([]);
    }
  };

  const addNewInputs = (
    name: string,
    type: string,
    value: boolean | string
  ) => {
    setNewInputsData((values) => ({
      ...values,
      [name + '+' + type]: value
    }));
  };

  return (
    <>
      <ModalContainer
        title="Create Item"
        onClose={handleClose}
        onCreate={createItem}
      >
        <Form>
          <FormItem label="Title" onChange={setTitle} value={title} />
          <TagCreator tags={tags} setTags={setTags} />
          {newInputs.map(({ name, type }, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>{name}</Form.Label>
              {type === 'checkbox' ? (
                <Form.Check
                  onChange={(e) => addNewInputs(name, type, e.target.checked)}
                />
              ) : (
                <>
                  <Form.Control
                    type={type}
                    as={type === 'textarea' ? 'textarea' : undefined}
                    onChange={(e) => addNewInputs(name, type, e.target.value)}
                  />
                </>
              )}
            </Form.Group>
          ))}
          <DropImageZone setFiles={setFiles} />
        </Form>
      </ModalContainer>
    </>
  );
};

export default CreateItemForm;
