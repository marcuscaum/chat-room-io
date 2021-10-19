import { IUser } from "../store/users";

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="text-gray-100 text-sm text-center p-2 border-b border-blue-700">
      {user.email}
    </div>
  );
};

export default UserCard;
