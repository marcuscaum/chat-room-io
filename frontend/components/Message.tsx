import React from "react";
import { IMessage } from "../store/messages";
import { IUser } from "../store/users";

interface IMessageComponent extends IMessage {
  user: IUser;
}

const Message: React.FC<IMessageComponent> = ({
  content,
  email,
  type,
  user,
}) => {
  const isUserMessage = email === user.email;

  if (type === "broadcast") {
    return (
      <span className="text-sm w-full bg-gray-100 mb flex text-gray-400 p-2 text-center justify-center">
        {content}
      </span>
    );
  }

  return (
    <div
      className={`flex-1 m-2 flex ${
        isUserMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-auto inline-block rounded p-2  ${
          isUserMessage ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
        }`}
      >
        <div className={`text-xs m-2 text-gray-400`}>
          {isUserMessage ? "Me" : email}:
        </div>
        <div className="m-2">{content}</div>
      </div>
    </div>
  );
};

export default Message;
