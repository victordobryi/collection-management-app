import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ItemService, TagService } from '../../API';
import { IItem, ITag, IModalItemProps, INewInputsProps } from '../../models';
import { mediaUploader } from '../../utils';
import SocketContext from '../../context/SocketContext';
import { DropImageZone, TagCreator } from '../../components';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      console.log(error);
    } finally {
      setLoading(false);
      setNewInputsData([]);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('Create Item')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`${t('Title')}`}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <TagCreator tags={tags} setTags={setTags} />
          {newInputs.map(({ name, type }, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>{name}</Form.Label>
              {type === 'checkbox' ? (
                <Form.Check
                  onChange={(e) => {
                    setNewInputsData((values) => ({
                      ...values,
                      [name + '+' + type]: e.target.checked
                    }));
                  }}
                />
              ) : (
                <>
                  <Form.Control
                    type={type}
                    as={type === 'textarea' ? 'textarea' : undefined}
                    onChange={(e) =>
                      setNewInputsData((values) => ({
                        ...values,
                        [name + '+' + type]: e.target.value
                      }))
                    }
                  />
                </>
              )}
            </Form.Group>
          ))}
          <DropImageZone setFiles={setFiles} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
        <Button variant="primary" onClick={createItem}>
          {t(' Create Item')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default CreateItemForm;
