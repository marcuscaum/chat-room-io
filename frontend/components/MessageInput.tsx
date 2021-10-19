import React, { BaseSyntheticEvent, KeyboardEvent, useRef } from "react";
import { Button } from ".";
import useMessageInput from "../hooks/useMessageInput";

import { IUser } from "../store/users";

import { TextFieldStyle } from "./TextField";

const MessageInput: React.FC<{ user: IUser }> = ({ user }) => {
  const { handleKeypress, handleOnInput, handleSendMessage, inputRef } =
    useMessageInput({ user });

  return (
    <div className="mt-2 flex">
      <div
        aria-label="Mensagem"
        contentEditable="true"
        spellCheck="true"
        className={`select-text break-all ${TextFieldStyle} w-full`}
        suppressContentEditableWarning={true}
        onKeyDown={handleKeypress}
        onInput={handleOnInput}
        ref={inputRef}
      ></div>
      <Button onClick={handleSendMessage} className="w-20 ml-2">
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
