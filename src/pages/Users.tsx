import React, { Suspense } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { UserService } from '../API';
import { ErrorWrapper, UserContainer } from '../components';
import { Await, defer, useLoaderData } from 'react-router-dom';

export const Users = () => {
  const { users } = useLoaderData();

  return (
    <Row className="d-flex flex-wrap gap-3">
      <ErrorWrapper>
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          <Await resolve={users}>
            {(resolvedUsers) => (
              <>
                {resolvedUsers.map((user) =>
                  user.username !== 'admin' ? (
                    <ErrorWrapper>
                      <UserContainer key={user.id} user={user} />
                    </ErrorWrapper>
                  ) : null
                )}
              </>
            )}
          </Await>
        </Suspense>
      </ErrorWrapper>
    </Row>
  );
};

const getUsers = async () => {
  const users = (await UserService.getUsers()).data;
  return users.data;
};

export const usersLoader = async () => {
  return defer({
    users: getUsers()
  });
};
