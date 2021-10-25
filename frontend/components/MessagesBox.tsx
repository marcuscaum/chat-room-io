import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { AutocompleteSuggestions, Message, Paper } from ".";
import messagesState from "../store/messages";
import { IUser } from "../store/users";

const MessagesBox: React.FC<{ user: IUser }> = ({ user }) => {
  const messages = useRecoilValue(messagesState);
  let messageEnd: HTMLDivElement | null = null;

  // scroll to latest message
  useEffect(() => {
    messageEnd?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Paper
      elevation={0}
      className="relative h-full flex overflow-y-scroll flex-col-reverse"
    >
      <div className="flex-initial">
        {messages.map((values, index) => (
          <Message
            {...values}
            key={values.email + values.content + index}
            user={user}
          />
        ))}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
        <AutocompleteSuggestions />
      </div>
    </Paper>
  );
};

export default MessagesBox;
