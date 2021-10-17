import React, { useEffect } from "react";
import { Message, Paper } from ".";

const MessagesBox: React.FC<{}> = () => {
  let messageEnd: HTMLDivElement | null = null;

  // scroll to latest message
  useEffect(() => {
    messageEnd?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Paper
      elevation={0}
      className="min-w-3/4 flex-1 flex justify-end min-h-3/4 lg:min-w-full"
    >
      <div className="flex flex-col overflow-scroll scrollbar-hide">
        <Message content="Hello" />
        <Message
          author="Marcus"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores amet, ipsam dolore quia odit iusto molestias maxime reiciendis, iste maiores earum labore? At ab vitae repudiandae neque fugiat iste reprehenderit."
        />
        <Message
          author="João"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores amet, ipsam dolore quia odit iusto molestias maxime reiciendis, iste maiores earum labore? At ab vitae repudiandae neque fugiat iste reprehenderit."
        />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
        <Message content="World" />
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
