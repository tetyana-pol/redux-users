import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/app/hooks";
import { userSelector } from "../../store/features/userSlice";
import { setFilter } from "../../store/features/userSlice";

type Props = {
  filter: "filterName" | "filterUsername" | "filterEmail" | "filterPhone";
  placeholder: string;
};

export const Input: React.FC<Props> = ({ filter, placeholder }) => {
  const [search, setSearch] = useState("");

  const dispach = useAppDispatch();

  return (
    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        dispach(setFilter({ filter: filter, value: e.target.value }));
      }}
      placeholder={placeholder}
    />
  );
};
