import React, { useState, useEffect } from "react";

import s from "./Fetch.module.css";

function UserFetch({ setTodo }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function usersTodo() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData = await response.json();
      setUsers(usersData);
    }) ();
  }, []);


  const userTodo = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${id}`
    );
    const todosData = await response.json();
    setTodo(todosData);
  };

  return (
    <div className={s.ident}  >
      {users.map((user) => (
        <p
          onClick={() => userTodo(user.id)}
          className={s.setUsers}
          key={user.id}
        >
          {user.name}
        </p>
      ))}
    </div>
  );
}
export default UserFetch;
