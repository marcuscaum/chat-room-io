import React from "react";
import { Message, Paper } from ".";

const MessagesBox: React.FC<{}> = () => {
  return (
    <Paper
      elevation={0}
      className="min-w-3/4 flex-1 flex justify-end min-h-3/4 lg:min-w-full"
    >
      <div className="flex flex-col overflow-scroll">
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
      </div>
    </Paper>
  );
};

export default MessagesBox;
