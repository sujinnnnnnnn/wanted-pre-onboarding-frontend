import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
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
    } catch {}
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
      } catch (e: unknown) {
        //오류처리하기
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>투두리스트</h1>
      <form>
        <input
          data-testid="new-todo-input"
          value={todoInput}
          onChange={handleTodoInputChange}
        />
        <button data-testid="new-todo-add-button" onClick={handleAddBtnClick}>
          추가
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
