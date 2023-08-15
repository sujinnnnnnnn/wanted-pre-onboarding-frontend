import React, { useState } from 'react';
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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(todo.isCompleted);
  const [modifyInput, setModifyInput] = useState<string>(todo.todo);
  const handleCilckCheckBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const checked = e.target.checked;
  };
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleCilckCheckBtn}
        />
        <span>{todo.todo}</span>
      </label>
      {todo.todo}
    </li>
  );
}
