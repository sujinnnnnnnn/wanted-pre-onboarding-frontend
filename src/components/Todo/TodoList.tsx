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
        const newTodos = todos.filter((todo) => todo.id !== id); // 204 반환되면 서버에서 삭제된 것이므로, 굳이 refetch할 필요 없이 클라이언트에서만 삭제해줘도 됨
        setTodos(newTodos);
      }
    } catch {}
  };
  const setTodoInTodos = (newTodo: TodoData) => {
    const newTodos = todos.map((todo) =>
      todo.id === newTodo.id ? newTodo : todo
    );
    setTodos(newTodos);
  };

  return (
    <ul>
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
