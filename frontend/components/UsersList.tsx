import { useRecoilValue } from "recoil";
import usersState, { IUser } from "../store/users";
import UserCard from "./UserCard";

const UsersList: React.FC<{}> = () => {
  const users = useRecoilValue(usersState);

  return (
    <>
      <div className="text-sm text-center p-2 text-white font-extrabold">
        Users list
      </div>
      <div className="flex-1 rounded-lg bg-blue-500">
        {!users.length && (
          <div className="text-blue-300 text-center mt-3">
            No users available.
          </div>
        )}
        {users.map((user) => (
          <UserCard user={user} key={user.email} />
        ))}
      </div>
    </>
  );
};

export default UsersList;
