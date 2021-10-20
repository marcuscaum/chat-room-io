import axios from "axios";
import { useRef } from "react";
import { IMessage } from "../store/messages";
import { IUser } from "../store/users";
import sendMessage from "../utils/sendMessage";

const useMessageInput = ({ user }: { user: IUser }) => {
  const message = useRef("");
  const inputRef = useRef<HTMLDivElement>(null);

  const clearField = () => {
    inputRef.current!.textContent = "";
    message.current = "";
  };

  const handleSendMessage = () => {
    if (!message.current.length) {
      return;
    }
    const definedMessage: IMessage = {
      content: message.current,
      email: user.email,
    };

    sendMessage(definedMessage);
    clearField();
  };

  const handleKeypress = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOnInput = () => {
    const value = inputRef.current!.textContent;
    message.current = value || "";
  };

  return {
    handleOnInput,
    handleKeypress,
    handleSendMessage,
    inputRef,
  };
};

export default useMessageInput;
