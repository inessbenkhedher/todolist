import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from '../models/task';

export const selectTasksState = createFeatureSelector<Task[]>('tasks');

export const selectTasksByUser = (email: string) =>
  createSelector(selectTasksState, (tasks: Task[]) =>
    tasks ? tasks.filter(task => task.userEmail === email) : []
  );

export const selectTaskById = (id: string) =>
  createSelector(selectTasksState, (tasks: Task[]) =>
    tasks ? tasks.find(task => task.id === id) : undefined
  );