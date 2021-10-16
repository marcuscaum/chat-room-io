import type { NextPage } from "next";
import { Router, useRouter } from "next/dist/client/router";
import { TextField, Paper, Button, MessagesBox } from "../components";
import MessageInput from "../components/MessageInput";

const ChatRoom: NextPage = () => {
  const router = useRouter();
  return (
    <div className="justify-self-center md:w-11/12 w-full lg:w-8/12">
      <div className="flex h-screen md:py-10">
        <Paper elevation={1}>
          <div className="flex h-full rounded-lg overflow-hidden flex-col md:flex-row">
            <div className="bg-gray-200 p-4 md:p-0 md:h-full min-w-1/4">
              test
            </div>
            <div className="bg-gray-300 h-3/4 md:h-full flex-1 p-2 flex-col flex justify-between content-end">
              <MessagesBox />
              <MessageInput />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ChatRoom;
