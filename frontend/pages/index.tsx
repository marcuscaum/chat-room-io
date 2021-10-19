import { Paper, MessagesBox } from "../components";
import MessageInput from "../components/MessageInput";
import UsersList from "../components/UsersList";
import useSocketEvents from "../hooks/useSocketEvents";
import handleLogout from "../services/logout";
import redirectUser from "../utils/redirectUser";
import { IUser } from "../store/users";

export const getServerSideProps = redirectUser;

const ChatRoom: React.FC<{ user: IUser }> = ({ user }) => {
  useSocketEvents({ currentUser: user });

  return (
    <>
      <div className="justify-self-center md:w-11/12 w-full lg:w-8/12">
        <span onClick={() => handleLogout(user)}>Logout</span>
        <div className="flex h-screen md:py-10">
          <Paper elevation={1}>
            <div className="flex h-full md:rounded-lg overflow-hidden flex-col md:flex-row">
              <div className="bg-blue-600 p-2 flex-col flex md:h-full min-w-1/4">
                <UsersList />
              </div>
              <div className="bg-blue-500 h-3/4 md:h-full flex-1 p-2 flex-col flex justify-between content-end">
                <MessagesBox user={user} />
                <MessageInput user={user} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
