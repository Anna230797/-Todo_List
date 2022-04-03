import React, { useState } from "react";
import s from "./addTodo.module.css";

import { Row, Col, Button, FormControl } from "react-bootstrap";

//компонент addTodo (в этом компоненте мы будет добавлять записпи)
function AddTodo({ todo, setTodo }) {
  //Хук useState для управления состоянием, в данном случае управляет состоянием input, при редактирование
  const [value, setValue] = useState("");

  //функция которая отрабатывает по кнопки сохранить
  function saveTodo() {
    //делаем сетевой запрос fetch
    fetch("https://jsonplaceholder.typicode.com/todos", {
      //отправляем данные на сервер
      method: "POST",
      body: JSON.stringify({
        title: value,
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      //response.json декодирует ответ в формате json
      .then((response) => response.json())
      // создаем новый массив со значениями todo существующим массивом, в этот массив добавляем новый обьект с новой задачей
      .then((json) => {
        setTodo([...todo, json]);
      });

    //для того чтоб наш input очищался после сохранения
    setValue("");
  }
  //return возвращает jsx разметку
  return (
    //строка
    <Row>
      {/* колонка */}
      <Col className={s.addTodoForm}>
        {/* input */}
        <FormControl
          placeholder="Введите задачу"
          value={value}
          //для того чтобы мы могли ввести текст в наш инпут
          onChange={(e) => setValue(e.target.value)}
        />
        {/* при нажатии на кнопку сохранить будет срабатывать функция (которая будет заниматься обновлением state)  */}
        <Button variant="outline-dark" onClick={saveTodo} className={s.btn}>
          Добавить
        </Button>
      </Col>
    </Row>
  );
}
export default AddTodo;
