import React from "react";
import { Button } from ".";
import { TextFieldStyle } from "./TextField";

const MessageInput: React.FC<{}> = () => {
  return (
    <div className="mt-2 flex">
      <div
        aria-label="Mensagem"
        contentEditable="true"
        spellCheck="true"
        className={`select-text break-all ${TextFieldStyle} w-full`}
        suppressContentEditableWarning={true}
      >
        Aa
      </div>
      <Button className="w-20 ml-2">Send</Button>
    </div>
  );
};

export default MessageInput;
