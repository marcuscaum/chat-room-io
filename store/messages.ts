import { atom } from "recoil";
import { IUser } from "./users";

export interface IMessage {
  content: string;
  email?: IUser["email"];
  type?: "broadcast";
}

const messagesState = atom({
  key: "messagesState",
  default: [] as IMessage[],
});

export default messagesState;
