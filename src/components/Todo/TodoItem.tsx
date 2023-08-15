import React from 'react';
import { TodoData } from '../../type/Todostype';
type TodoItemProps = {
  todo: TodoData;
  onDeleteBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setTodoInTodos: (todo: TodoData) => void;
};

export default function TodoItem({
  todo,
  onDeleteBtnClick,
  setTodoInTodos,
}: TodoItemProps) {
  return <li>{todo.todo}</li>;
}
