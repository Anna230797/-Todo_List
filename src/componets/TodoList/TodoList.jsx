import React, { useState } from "react";
import s from "./TodoList.module.css";
import { Button} from "react-bootstrap";


// компонент todolist (в этом компонентк будут выводиться наши задачи)
function TodoList({ todo, setTodo }) {
  //Хук useState для управления состоянием, в данном случае отвечает за состояние нашей задачи редактируется она или нет в дамнный момент
  const [edit, setEdit] = useState(null);
 //Хук useState для управления состоянием, в данном случае управляет состоянием input, при редактирование
  const [value, setValue] = useState("");

  //функци которая отрабатывает по кнопки удалить
  function deleteTodo(id) {
    //Создаем новую переменную, в которую передаем копию нашего todo и применяем метод filter,
    // для которого прописываем условие что перебираемый id не должен быть равен id(который мы получили от кнопки)
    let newTodo = [...todo].filter((item) => item.id != id);
    setTodo(newTodo);
  }

  //функция которая отбратывает по кнопки редактировать
  function editTodo(id, title) {
    //задаем новое значение для переменной edit
    setEdit(id);
    // задаем новое значение для переменной value, которое передастся в input
    setValue(title);
  }

  // функция которая отрабатывает по кнопки сохранить когда редактируеться наш input
  function saveTodo(id) {
     //делаем сетевой запрос fetch 
    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      //получение запросов
      method: "PUT",
      body: JSON.stringify({
        title: value,
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
.then((json) => {
  // (обновляем значение) обходим все элементы массива и находим в нем нужный нам элемент
    let newTodo = [...todo].map((item) => {
      //нашли элемент по нашему id и в этом обьекте (title) поменяли значение на value
      if (item.id == id) {
        return json;
      }
      return item;
    });
    //отправляет новый элемент newTodo с помощью хука setTodo
    setTodo(newTodo);
})
    // задаем значение для переменной edit (null отвечает что мы находимя в режиме просмотра а не редактирования)
    setEdit(null);
  }
 //функция для управления состоянием чекбокса
  function checkTodo(id){
    let newTodo = [...todo].map(item =>{
    //нашли элемент по нашему id и в этом обьекте поменяли значение на completed
      if(item.id == id){
        item.completed = !item.completed;
      }
      return item
    })
     //отправляет новы элемент newTodo с помощью хука setTodo
    setTodo(newTodo)
  }
  return (
    <div>
      {/* выводим наш todo, каждый элемент масива будет лежать в переменной item */}
      {todo.map((item) => (
        //передаем ключ с уникальный значением id
        <div key={item.id} className={s.listItems}>
          {/* (создаем условие) Если edit равен item.id то будет выводится input а иначе item.title */}
          {edit == item.id ? (
            <div>
              <input onChange={(e) => setValue(e.target.value)} value={value} />
            </div>
          ) : (
            <div className={item.completed ? s.close : ""}>
              {/* мы устанавливаем checked значение false. Но если флажок не установлен, мы устанавливаем значение  true     */}
              <input 
                className={s.checkBox}
                type="checkbox"
                checked={item.completed}
                onChange={() => checkTodo(item.id)}
              />
              {item.title}</div>
          )}
          {/* (создаем условие) Если edit равен item.id то будет выводится кнопка сохранить а иначе кнопки удалить и реактировать */}
          {edit == item.id ? (
            <div>
              <Button variant="outline-dark" onClick={() => saveTodo(item.id)}>Сохранить </Button>
            </div>
          ) : (
            <div>
              {/* кнопка удаления  */}
              <Button variant="outline-dark" onClick={() => deleteTodo(item.id)} > Удалить</Button>
              {/* Кнопка чтоб редактировать задачу */}
              <Button variant="outline-dark" onClick={() => editTodo(item.id, item.title)} className={s.btn}>
                Редактировать
              </Button>
            
            </div>
          )}
        </div>
      ))}
      <div className={s.title}>
        {todo.length == 0 ? 'Выберите пользователя!' : null}
      </div>
      
    </div>
  );
}

export default TodoList;
