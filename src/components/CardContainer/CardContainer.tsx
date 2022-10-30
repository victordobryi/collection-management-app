import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Card } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { DropImageZone, ConfirmModal } from '../../components';
import { ICardContainer } from '../../models';
import LazyLoadImg from '../LazyLoadImg/LazyLoadImg';
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
  hovered,
  isAvatar = false,
  idName
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
        className="card-container"
        onMouseEnter={() => (isOnPage ? setHovered(true) : null)}
        onMouseLeave={() => setHovered(false)}
        id={idName}
      >
        <AiOutlineClose
          style={{
            visibility: hovered && isUser ? 'visible' : 'hidden'
          }}
          className="card__close"
          onClick={toggleModal}
        />
        <Card.Header
          className="card-container__header card-img-top"
          style={{
            pointerEvents:
              isUser && sectionName === containerName ? 'auto' : 'none'
          }}
        >
          {isAvatar ? (
            <Avatar
              name={title}
              src={img}
              round={isRound ? '100%' : 'none'}
              size="100%"
            />
          ) : (
            <LazyLoadImg image={String(img)} className="card-img" />
          )}
          <DropImageZone setFiles={setFiles} isVisible={false} />
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
