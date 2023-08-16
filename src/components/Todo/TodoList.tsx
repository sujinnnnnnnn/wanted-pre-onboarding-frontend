import React from 'react';
import { deleteTodo } from '../../api/auth/TodoData';
import { TodoData } from '../../type/Todostype';
import TodoItem from './TodoItem';
type TodoListProps = {
  todos: TodoData[];
  setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>;
};
export default function TodoList({ todos, setTodos }: TodoListProps) {
  const handleDeleteBtnClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    try {
      const res = await deleteTodo(id);
      if (res.status === 204) {
        alert('삭제되었습니다.');
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      }
    } catch {
      alert('삭제실패. 다시 시도해주세요');
    }
  };
  const setTodoInTodos = (newTodo: TodoData) => {
    const newTodos = todos.map((todo) =>
      todo.id === newTodo.id ? newTodo : todo
    );
    setTodos(newTodos);
  };
  return (
    <ul className="h-[85%] w-[50vw] p-2 overflow-y-scroll">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteBtnClick={(e) => handleDeleteBtnClick(e, todo.id)}
          setTodoInTodos={setTodoInTodos}
        />
      ))}
    </ul>
  );
}
