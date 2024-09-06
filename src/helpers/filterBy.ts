import { UserType } from "../types/User";

export function filterBy(
  field: keyof Omit<UserType, "id">,
  filter: string,
  arr: UserType[]
): UserType[] {
  return arr.filter((user) =>
    user[field].toLowerCase().includes(filter.toLowerCase())
  );
}
