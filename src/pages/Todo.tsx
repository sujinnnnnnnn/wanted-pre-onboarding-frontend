import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo, getTodo } from '../api/auth/TodoData';

import { getToken } from '../api/auth/Token';
import TodoList from '../components/Todo/TodoList';
import { CreateTodoData, TodoData } from '../type/Todostype';
export default function Todo() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');
  const navigate = useNavigate();
  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoInput(value);
  };
  const handleAddBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createTodoRequest: CreateTodoData = {
      todo: todoInput,
    };
    try {
      const res = await createTodo(createTodoRequest);
      if (res.status === 201) {
        const { id, todo, isCompleted } = res.data;
        const newTodo = { id, todo, isCompleted };
        setTodos([...todos, newTodo]);
        setTodoInput('');
      }
    } catch (err: any) {
      const { message } = err.response.data;
      alert(message);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      navigate('/signin');
    }

    const fetchTodos = async () => {
      try {
        const res = await getTodo();
        if (res.status === 200) {
          const newTodos = res.data.map(({ id, todo, isCompleted }) => ({
            id,
            todo,
            isCompleted,
          }));
          setTodos(newTodos);
        }
      } catch (err: any) {
        const { message } = err.response.data;
        alert(message);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="bg-white rounded-md p-2">
      <h1 className="text-3xl font-semibold text-center">To-Do List</h1>
      <div className="h-[60vh] w-[100%]">
        <form className="flex justify-center items-center w-full">
          <input
            data-testid="new-todo-input"
            value={todoInput}
            onChange={handleTodoInputChange}
            className="border-2 border-main1 m-4 w-3/4 p-1 rounded-sm"
          />
          <button
            className="bg-main2 text-white p-2 hover:bg-main1 rounded-sm"
            data-testid="new-todo-add-button"
            onClick={handleAddBtnClick}
          >
            추가
          </button>
        </form>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}
