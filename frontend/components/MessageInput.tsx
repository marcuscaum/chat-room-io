import React from "react";
import useAutocomplete from "../hooks/useAutocomplete";
import useMessageInput from "../hooks/useMessageInput";
import { IUser } from "../store/users";

import { Button } from ".";
import { TextFieldStyle } from "./TextField";
import { useRecoilState } from "recoil";
import { messageInputValue } from "../store/autocomplete";

const MessageInput: React.FC<{ user: IUser }> = ({ user }) => {
  const {
    onClickSendMessage,
    handleKeyDown,
    handleChange,
    shadowDivRef,
    inputRef,
    style,
  } = useMessageInput({
    user,
  });

  const [inputValue, setInputValue] = useRecoilState(messageInputValue);
  const {
    handleKeyUp: autocompleteHandleKeyUp,
    handleChange: autocompleteHandleChange,
  } = useAutocomplete({ inputElement: inputRef?.current });

  return (
    <div className="mt-2 flex relative">
      <textarea
        // onKeyDown={(e) => console.log(e)}
        className={`select-text break-all ${TextFieldStyle} resize-none  w-full`}
        value={inputValue}
        onKeyUp={(e) => {
          autocompleteHandleKeyUp(e);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleChange(e);
        }}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
          autocompleteHandleChange(e);
        }}
        style={style}
        ref={inputRef}
      />
      <div
        ref={shadowDivRef}
        contentEditable
        className={`select-text break-all ${TextFieldStyle} invisible absolute`}
        style={{ width: "86%" }}
      ></div>
      <Button onClick={onClickSendMessage} className="w-20 ml-2">
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
