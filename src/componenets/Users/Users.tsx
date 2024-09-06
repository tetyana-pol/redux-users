import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { fetchUsersData, userSelector } from "../../store/features/userSlice";
import { UserType } from "../../types/User";
import "./user.scss";
import { Input } from "../Input/Input";
import { filterBy } from "../../helpers/filterBy";

export const Users = () => {
  const dispatch = useAppDispatch();
  const { users, filterName, filterUsername, filterEmail, filterPhone } =
    useAppSelector(userSelector);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const filteredUsers = (): UserType[] => {
    let result = [...users];
    if (filterName) {
      result = filterBy("name", filterName, result);
    }
    if (filterUsername) {
      result = filterBy("username", filterUsername, result);
    }
    if (filterEmail) {
      result = filterBy("email", filterEmail, result);
    }
    if (filterPhone) {
      result = filterBy("phone", filterPhone, result);
    }
    console.log("result", result);
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
