import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Card, Form } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { DropImageZone, ConfirmModal } from '../../components';
import { ICardContainer } from '../../models';
import './card-container.scss';

const CardContainer = ({
  onClick,
  isOnPage,
  isUser,
  sectionName,
  containerName,
  children,
  setFiles,
  title,
  img,
  isRound = false,
  deleteElem,
  setHovered,
  hovered
}: ICardContainer) => {
  const [show, setShow] = useState(false);

  const toggleModal = () => setShow(!show);

  return (
    <>
      <Card
        onClick={onClick}
        style={{
          cursor: isOnPage ? 'default' : 'pointer'
        }}
        className="p-3"
        onMouseEnter={() => (isOnPage ? setHovered(true) : null)}
        onMouseLeave={() => setHovered(false)}
      >
        <AiOutlineClose
          style={{
            visibility: hovered && isUser ? 'visible' : 'hidden'
          }}
          className="card__close"
          onClick={toggleModal}
        />
        <Card.Header className="card-container__header">
          <Form
            style={{
              pointerEvents:
                isUser && sectionName === containerName ? 'auto' : 'none'
            }}
          >
            <Avatar
              name={title}
              size="130"
              src={img}
              round={isRound ? '100%' : 'none'}
            />
            <DropImageZone setFiles={setFiles} isVisible={false} />
          </Form>
        </Card.Header>
        <Card.Body style={{ pointerEvents: isUser ? 'auto' : 'none' }}>
          {children}
        </Card.Body>
      </Card>
      <ConfirmModal show={show} onHide={toggleModal} deleteFunc={deleteElem} />
    </>
  );
};

export default CardContainer;
