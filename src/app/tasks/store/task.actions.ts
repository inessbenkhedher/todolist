import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const toggleCompleteTask = createAction('[Task] Toggle Complete', props<{ taskId: string }>());
export const clearTasks = createAction('[Task] Clear Tasks');
