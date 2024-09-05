import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { fetchUsersData, userSelector } from "../../store/features/userSlice";
import { UserType } from "../../types/User";
import "./user.scss";
import { Input } from "../Input/Input";

export const Users = () => {
  const dispatch = useAppDispatch();
  const { users, filterName, filterUsername, filterEmail, filterPhone } =
    useAppSelector(userSelector);
  console.log(filterPhone);
  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const filteredUsers = (): UserType[] => {
    let result = [...users];
    if (filterName) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterUsername) {
      result = result.filter((user) =>
        user.username.toLowerCase().includes(filterUsername.toLowerCase())
      );
    }
    if (filterEmail) {
      result = result.filter((user) =>
        user.email.toLowerCase().includes(filterEmail.toLowerCase())
      );
    }
    if (filterPhone) {
      result = result.filter((user) =>
        user.phone.toLowerCase().includes(filterPhone.toLowerCase())
      );
    }
    return result;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Input filter="filterName" placeholder="Type name to seach..." />
          </td>
          <td>
            <Input
              filter="filterUsername"
              placeholder="Type username to seach..."
            />
          </td>
          <td>
            <Input filter="filterEmail" placeholder="Type email to seach..." />
          </td>
          <td>
            <Input filter="filterPhone" placeholder="Type phone to seach..." />
          </td>
        </tr>
        {filteredUsers().map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
