import React, { useCallback, useState } from 'react';
import { updateTodo } from '../../api/auth/TodoData';
import { TodoData } from '../../type/Todostype';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
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
  const handleCilckCheckBtn = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const checked = e.target.checked;
    const { id, todo: todoText } = todo;
    const updateTodoRequest = {
      todo: todoText,
      isCompleted: checked,
    };
    try {
      const res = await updateTodo(id, updateTodoRequest);
      if (res.status === 200) {
        const { id, todo: todoText, isCompleted } = res.data;
        const newTodo = { id, todo: todoText, isCompleted };
        setTodoInTodos(newTodo);
      }
    } catch (err) {
      alert('체크가 이루어지지않았습니다');
    }
  };
  const handleModifyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit(true);
  };
  const handleModifyCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit(false);
  };
  const handleEdit = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyInput(e.target.value);
  }, []);
  const handleModifySubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id, isCompleted } = todo;

    const updateTodoRequest = {
      todo: modifyInput,
      isCompleted,
    };
    try {
      const res = await updateTodo(id, updateTodoRequest);
      if (res.status === 200) {
        const { id, todo: todoText, isCompleted } = res.data;
        const newTodo = { id, todo: todoText, isCompleted };
        setTodoInTodos(newTodo);
        setIsEdit(!isEdit);
      }
    } catch (err) {
      alert('수정에 실패했습니다');
    }
  };
  return (
    <li className="flex justify-between mb-2 items-center ">
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleCilckCheckBtn}
        />
      </label>

      {!isEdit ? (
        <>
          <span>{todo.todo}</span>
          <div className="flex">
            <button
              className="flex items-center mr-2 text-sm"
              onClick={handleModifyClick}
            >
              <AiOutlineEdit />
              수정
            </button>
            <button
              className="flex items-center text-sm  rounded-sm hover:bg-red-500 p-1.5 "
              onClick={onDeleteBtnClick}
            >
              <BsFillTrashFill />
              삭제
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            className="border-2 border-gray-400 p-1 rounded-sm"
            data-testid="modify-input"
            onChange={handleEdit}
            value={modifyInput}
          />
          <div className="flex gap-1">
            <button
              className="bg-main2  text-white px-2 rounded-sm hover:bg-main1 text-sm"
              data-testid="submit-button"
              onClick={handleModifySubmit}
            >
              제출
            </button>
            <button
              className="bg-red-100 px-2 rounded-sm hover:bg-red-500 text-sm "
              data-testid="cancel-button"
              onClick={handleModifyCancelClick}
            >
              취소
            </button>
          </div>
        </>
      )}
    </li>
  );
}
