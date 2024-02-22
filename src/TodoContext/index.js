import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

// Es la forma que se utiliza normalmente en la actualidad, creado contexto personalizados
function TodoProvider({ children }) {
  // Funciones para crear los estados de un componente, son como variables donde se intercambia informacion entre componentes de React.js
  const {
    item: todos, 
    saveItem: saveTodos, 
    loading, 
    error
  } = useLocalStorage('Tareas_v1', []);
  const [searchValue, setSearchValue] = React.useState(''); 
  const [openModal, setOpenModal] = React.useState(false); 

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;
  
  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase()
    return todoText.includes(searchText)
    // return todo.text.toLowerCase().includes(searchValue.toLocaleLowerCase()) // Alternativa
  });

const addTodo = (text) => {
  const newTodos = [...todos];
  newTodos.push({
    text,
    completed: false
  });
  saveTodos(newTodos);
}

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal
    }}>
      {children}
    </TodoContext.Provider>
  )
}

// Es la forma de utilizar el provider y consumer del contexto, pero muy poco utilizado de esta forma 
// <TodoContext.Provider></TodoContext.Provider>
// <TodoContext.Consumer></TodoContext.Consumer>

export { TodoContext, TodoProvider };