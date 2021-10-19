import { IUser } from "../store/users";

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="flex-1 text-gray-100 text-sm p-2 border-b-2 border-blue-700">
      {user.email}
    </div>
  );
};

export default UserCard;
