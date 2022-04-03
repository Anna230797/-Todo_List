import React, { useState } from "react";
import "./App.css";
import Header from "./componets/header/header";
import UserFetch from "./componets/Fetch/UserFetch";
import AddTodo from "./componets/addTodo/addTodo";
import TodoList from "./componets/TodoList/TodoList";
import { Container } from "react-bootstrap";

function App() {
  //Хук useState для управления состоянием, в данном случае управляет состоянием массива todo.
  const [todo, setTodo] = useState([
    // { id: 1, completed: true, title: "Купить хлеб" },
    // { id: 2, completed: false, title: "Купить масло" },
    // { id: 3, completed: true, title: "Купить молоко" },
  ]);

  return (
    <Container>
      <Header />
      {/* компонент addTodo (в этом компоненте мы будет добавлять записпи) */}
      <AddTodo todo={todo} setTodo={setTodo} />
      <UserFetch setTodo={setTodo} />
      {/* компонент todolist (в этом компонентк будут выводиться наши задачи) */}
      <TodoList todo={todo} setTodo={setTodo} />
    </Container>
  );
}

export default App;
