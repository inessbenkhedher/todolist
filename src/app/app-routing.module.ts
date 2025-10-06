import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TaskListComponent } from './tasks/components/task-list/task-list.component';
import { TaskFormPageComponent } from './tasks/components/task-form-page/task-form-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
   { path: 'tasks/new', component: TaskFormPageComponent },
  { path: 'tasks/:id/edit', component: TaskFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
