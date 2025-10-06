import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { addTask, updateTask, deleteTask, toggleCompleteTask, clearTasks } from '../../store/task.actions';
import { selectTasksByUser } from '../../store/task.selectors';
import { AuthServiceService } from 'src/app/core/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
 tasks$: Observable<Task[]>;
  currentUser: string | null = '';

  constructor(private store: Store, private authService: AuthServiceService,private router: Router) {
    this.tasks$ = new Observable<Task[]>();
  }

ngOnInit() {
  this.currentUser = this.authService.getCurrentUser();
  if (!this.currentUser) {
    this.router.navigate(['/login'], { replaceUrl: true });
  } else {
    this.tasks$ = this.store.select(selectTasksByUser(this.currentUser));
  }
}

  deleteTask(taskId: string) {
    this.store.dispatch(deleteTask({ taskId }));
  }

  toggleComplete(taskId: string) {
    this.store.dispatch(toggleCompleteTask({ taskId }));
  }

  logout() {
  this.authService.logout(); 
   this.store.dispatch(clearTasks());    // Supprime l'utilisateur courant
  this.router.navigate(['/login']); // Redirige vers la page de login
}
}