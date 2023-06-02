import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../components/form/Button";

const UserCard = ({ user }) => {
  if (!user) return <div>Loading...</div>;
  return (
    <div className="w-full bg-white flex flex-row justify-between h-20 items-center px-8">
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">{user.name}</p>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">{user.phone}</p>
        <p className="text-gray-500 text-sm">{user.date}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">{user.address}</p>

        {user.admin ? <p>Admin</p> : <p>User</p>}
      </div>
      <div className="flex flex-row cursor-pointer">
        <div className="flex flex-col" onClick={() => console.log("click")}>
          <AiFillEdit size={32} />
        </div>
        <div className="flex flex-col" onClick={() => console.log("click")}>
          <AiFillDelete size={32} />
        </div>
      </div>    
    </div>
  );
};

export default UserCard;