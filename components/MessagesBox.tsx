import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Message, Paper } from ".";
import messagesState from "../store/messages";
import { IUser } from "../store/users";

const MessagesBox: React.FC<{ user: IUser }> = ({ user }) => {
  const messages = useRecoilValue(messagesState);
  console.log(messages);
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
        {messages.map((values) => (
          <>
            <Message {...values} key={values.email} user={user} />
          </>
        ))}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
    </Paper>
  );
};

export default MessagesBox;
