import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { isUser } from '../../store/action-creators/users';
import Toolbar from './Toolbar';

const AdminPanelTable = () => {
  const [all, setAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    setCheckboxes([]);
    setAll(false);
  }, [users]);

  useEffect(() => {
    all
      ? setCheckboxes(
          [...Array(users.length)].map((item, id) => (item = String(id)))
        )
      : setCheckboxes([]);
  }, [all]);

  useEffect(() => {
    dispatch(isUser());
  }, [checkboxes]);

  const changeCheckboxes = (id: string) => {
    setCheckboxes(
      checkboxes.includes(id)
        ? checkboxes.filter((el) => el !== id)
        : [...checkboxes, id]
    );
  };

  return (
    <div className="d-flex flex-column ">
      <Toolbar checkboxes={checkboxes} />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th style={{ fontSize: 14 }}>
              select all
              <br />
              /deselect
              <Form.Check
                type="checkbox"
                id="all"
                checked={all}
                onChange={() => setAll(!all)}
              />
            </th>
            <th>#</th>
            <th>name</th>
            <th>id</th>
            <th>password</th>
            <th>isAdmin</th>
            <th>isBlocked</th>
            <th>avatar</th>
          </tr>
        </thead>
        {users?.map(
          ({ username, img, isBlocked, isAdmin, id, password }, index) => (
            <tbody key={id}>
              <tr>
                <td>
                  <Form.Check
                    type="checkbox"
                    id={`${index}`}
                    checked={checkboxes.includes(`${index}`)}
                    onChange={(event) => changeCheckboxes(event.target.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{username}</td>
                <td>{id}</td>
                <td>{password}</td>
                <td>{isAdmin ? 'admin' : 'not admin'}</td>
                <td>{isBlocked ? 'blocked' : 'not blocked'}</td>
                <td
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'contain'
                  }}
                ></td>
              </tr>
            </tbody>
          )
        )}
      </Table>
    </div>
  );
};

export default AdminPanelTable;
