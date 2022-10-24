import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import { IPageLayout } from '../../models';

const PageLayout = ({ children }: IPageLayout) => {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
        <Row
          className="d-flex flex-wrap gap-3 mt-5 justify-content-center w-100"
          xl={4}
          lg={4}
          md={3}
          sm={2}
        >
          {children}
        </Row>
      </Container>
    </>
  );
};

export default PageLayout;
