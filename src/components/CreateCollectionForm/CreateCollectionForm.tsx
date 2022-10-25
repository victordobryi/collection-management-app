import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CollectionService } from '../../API';
import {
  ICollection,
  IModalCollectionProps,
  INewInputsProps
} from '../../models';
import { mediaUploader } from '../../utils';
import {
  AdditionalModal,
  DropImageZone,
  FormItem,
  FormSelect,
  ModalContainer
} from '../../components';
import SocketContext from '../../context/SocketContext';

const CreateCollectionForm = ({
  handleClose,
  userId,
  setLoading,
  setIsVisible
}: IModalCollectionProps) => {
  const [theme, setTheme] = useState('Comics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [active, setActive] = useState(false);
  const [additionalProps, setAdditionalProps] = useState<INewInputsProps[]>([]);
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext).SocketState;

  const createCollection = async () => {
    setLoading(true);
    handleClose();
    const url = await mediaUploader(files, 'collections');
    const collection: ICollection = {
      title,
      description,
      theme,
      userId,
      img: url[0] || '',
      additionalInputs: JSON.stringify(additionalProps)
    };
    try {
      await CollectionService.addCollection(collection);
      if (socket) {
        socket.emit('add_NewCollection', JSON.stringify(collection));
      }
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAdditional = () => {
    setActive(false);
    setIsVisible(true);
  };

  const handleShowAdditional = () => {
    setActive(true);
    setIsVisible(false);
  };

  return (
    <>
      <Modal show={active} onHide={handleCloseAdditional}>
        <AdditionalModal
          handleCloseAdditional={handleCloseAdditional}
          setProp={setAdditionalProps}
          additionalProps={additionalProps}
        />
      </Modal>
      <ModalContainer
        onClose={handleClose}
        onCreate={createCollection}
        title="Create Collection"
      >
        <>
          <Form>
            <FormItem type="text" label="Title" onChange={setTitle} />
            <FormItem
              type="textarea"
              label="Description"
              onChange={setDescription}
            />
            <FormSelect
              onChange={setTheme}
              defaultValue="Select a category"
              options={[
                { value: 'Comics' },
                { value: 'Card' },
                { value: 'Figures' }
              ]}
            />
            <DropImageZone setFiles={setFiles} />
            <Button
              className="d-flex gx-0 mx-auto "
              variant="dark"
              onClick={handleShowAdditional}
            >
              +
            </Button>
            <Form.Text>
              {`${t('Additional Props')} : ${additionalProps.map(
                ({ name, type }) =>
                  ` ${t('Name')}: ${name} - ${t('Type')}: ${type}`
              )}`}
            </Form.Text>
          </Form>
        </>
      </ModalContainer>
    </>
  );
};

export default CreateCollectionForm;
