import React, { useEffect, useState } from 'react';
import UserService from '../API/UserService';
import { IUser } from '../models/IUser';

const Users = () => {
  const [us, setUs] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = (await UserService.getUsers()).data;
      setUs(users.data);
      console.log(users.data);
    };
    fetchUsers();
  }, []);
  return <div></div>;
};

export default Users;
