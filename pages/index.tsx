import type { NextPage } from "next";

import { Paper, MessagesBox } from "../components";
import MessageInput from "../components/MessageInput";
import handleLogout from "../services/logout";
import getUser from "../utils/getUser";

export const getServerSideProps = getUser;

const ChatRoom: NextPage = ({ user }) => {
  return (
    <>
      <div className="justify-self-center md:w-11/12 w-full lg:w-8/12">
        <span onClick={handleLogout}>Logout</span>
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
    </>
  );
};

export default ChatRoom;
