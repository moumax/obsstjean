import { useState } from "react";
import useSWR from "swr";
import userAPI from "../../services/userAPI";
/* eslint-disable react/function-component-definition */
const Users = () => {
  const [users, setUsers] = useState([]);

  const fetcher = async () => {
    const response = await userAPI.get("http://localhost:5000/api/users");
    setUsers(response.data);
    return response.data;
  };
  const { data } = useSWR("users", fetcher);
  if (!data) return <h2>Chargement ...</h2>;

  //   const { mutate } = useSWRConfig();

  return (
    <div>
      <h2 className="text-2xl text-red-700">
        Liste et gestion des utilisateurs
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.email}</p>
            <p>{user.password_hash}</p>
          </div>
        ))}
      </h2>
    </div>
  );
};

export default Users;
