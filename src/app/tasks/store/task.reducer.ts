import { createReducer, on } from '@ngrx/store';
import { addTask, updateTask, deleteTask, toggleCompleteTask, clearTasks } from './task.actions';
import { Task } from '../models/task';

export const initialState: Task[] = [];

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [...state, task]),
  on(updateTask, (state, { task }) => state.map(t => t.id === task.id ? task : t)),
  on(deleteTask, (state, { taskId }) => state.filter(t => t.id !== taskId)),
  on(toggleCompleteTask, (state, { taskId }) =>
    state.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
  ),
   on(clearTasks, state => []) 
);


export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
