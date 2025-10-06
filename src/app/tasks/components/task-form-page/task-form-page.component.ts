import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task';
import { filter, take } from 'rxjs/operators'
import { selectTaskById } from '../../store/task.selectors';
import { updateTask, addTask } from '../../store/task.actions';
import { AuthServiceService } from 'src/app/core/auth-service.service';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss']
})
export class TaskFormPageComponent implements OnInit {
  task: Task | null = null;
  currentUser: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser(); // <- récupère l'utilisateur

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store
        .select(selectTaskById(id))
        .pipe(filter((t): t is Task => !!t))
        .subscribe(task => this.task = task);
    }
  }

  onSave(task: Task) {
    task.userEmail = this.currentUser!; // <- assigne l'utilisateur avant de dispatch
    if (this.task) {
      this.store.dispatch(updateTask({ task }));
    } else {
      this.store.dispatch(addTask({ task }));
    }
    this.router.navigate(['/tasks']);
  }
}