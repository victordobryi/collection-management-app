import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { isUser } from '../../store/action-creators/users';
import Toolbar from './Toolbar';
import Avatar from 'react-avatar';
import TableHead from './TableHead';

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
        <TableHead all={all} setAll={setAll} />
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
                <td>
                  <Avatar
                    name={username}
                    size="45"
                    textSizeRatio={1.75}
                    src={img}
                  />
                </td>
              </tr>
            </tbody>
          )
        )}
      </Table>
    </div>
  );
};

export default AdminPanelTable;
