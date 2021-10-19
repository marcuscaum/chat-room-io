import { atom } from "recoil";

export interface IUser {
  email: string;
}

const usersState = atom({
  key: "usersState",
  default: [] as IUser[],
});

export default usersState;
