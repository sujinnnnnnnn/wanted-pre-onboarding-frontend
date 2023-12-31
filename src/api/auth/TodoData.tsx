import {
  CreateTodoData,
  ModifyTodoInputData,
  TodoData,
  UpdateTodoData,
} from '../../type/Todostype';
import { api } from './User';

export const getTodo = () => {
  return api.get<TodoData[]>('todos');
};
export const createTodo = (data: CreateTodoData) => {
  return api.post('todos', data);
};
export const deleteTodo = (id: number) => {
  return api.delete(`todos/${id}`);
};
export const updateTodo = (
  id: number,
  data: UpdateTodoData | ModifyTodoInputData
) => {
  return api.put<TodoData>(`todos/${id}`, data);
};
