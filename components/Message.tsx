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
  const isUserMessage = email !== user.email;
  const conditionalStyles = isUserMessage
    ? "bg-gray-100 text-left self-start"
    : "bg-blue-100 text-left self-end";

  if (type === "broadcast") {
    return (
      <span className="text-sm w-full bg-gray-100 flex text-gray-400 p-2 text-center justify-center">
        {content}
      </span>
    );
  }

  return (
    <>
      {isUserMessage && (
        <span className={`text-xs ml-4 mb-2 text-gray-400  first:mt-4`}>
          {email}
        </span>
      )}
      <div
        className={`w-auto inline-block m-4 mt-0 rounded p-2 mb-4 first:mt-4 ${conditionalStyles}`}
      >
        {content}
      </div>
    </>
  );
};

export default Message;
