import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import { IMessage } from "../store/messages";
import { IUser } from "../store/users";
import sendMessage from "../utils/sendMessage";

const DEFAULT_TEXTAREA_HEIGHT = 40;

const useMessageInput = ({ user }: { user: IUser }) => {
  const [textAreaHeight, setTextAreaHeight] = useState(DEFAULT_TEXTAREA_HEIGHT);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  /* 
    - Shadow div concept - 
    This is a tricky to automatically resize the textarea based on his content.
    
    1. First you create a div that is a clone of your textarea, same style and height.
    2. Make this div contentEditable, so you can change the textContent without using refs or states
    3. Keep track of the shadow div height and replicate the same height to the textarea
  */

  const shadowDivRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    shadowDivRef.current!.textContent = e.currentTarget.value;
    setTextAreaHeight(
      shadowDivRef.current!.clientHeight === 16
        ? 40
        : shadowDivRef.current!.clientHeight
    );
  };

  const handleSendMessage = (value: string) => {
    if (!value) return false;
    const definedMessage: IMessage = {
      content: value,
      email: user.email,
    };

    sendMessage(definedMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // prevent default from some keys that autocomplete uses
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Tab") {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  const onClickSendMessage = () => {
    const value = inputRef.current?.value;
    if (value) {
      handleSendMessage(value);
    }
  };

  return {
    onClickSendMessage,
    handleKeyDown,
    handleChange,
    shadowDivRef,
    inputRef,
    style: {
      height: textAreaHeight,
    },
  };
};

export default useMessageInput;
