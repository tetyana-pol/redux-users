import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";
import { UserType } from "../../types/User";
export interface FilterType {
  filter: "filterName" | "filterUsername" | "filterEmail" | "filterPhone";
  value: string;
}

export type UsersState = {
  users: UserType[];
  filteredUsers: UserType[];
  filterName: string;
  filterUsername: string;
  filterEmail: string;
  filterPhone: string;
};

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  filterName: "",
  filterUsername: "",
  filterEmail: "",
  filterPhone: "",
};

export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async () => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.data)
      .then((data) =>
        data.map((user: any) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        }))
      );
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      const { filter, value } = action.payload;
      state[filter] = value;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchUsersData.fulfilled,
      (state, action: PayloadAction<UserType[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export const userSelector = (state: RootState) => state.users;
export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
