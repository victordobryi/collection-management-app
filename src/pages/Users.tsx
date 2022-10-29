import React, { Suspense } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { UserService } from '../API';
import { ErrorWrapper, UserContainer } from '../components';
import { Await, defer, useLoaderData } from 'react-router-dom';

export const Users = () => {
  const { users } = useLoaderData();

  return (
    <>
      <ErrorWrapper>
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          <Await resolve={users}>
            {(resolvedUsers) => (
              <ErrorWrapper>
                <Row xl={5} lg={4} md={3} sm={2} xs={1} className="w-100">
                  {resolvedUsers.map((user) =>
                    user.username !== 'admin' ? (
                      <UserContainer key={user.id} user={user} />
                    ) : null
                  )}
                </Row>
              </ErrorWrapper>
            )}
          </Await>
        </Suspense>
      </ErrorWrapper>
    </>
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
