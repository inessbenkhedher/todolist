import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../models/task';




@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

    @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  submit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskToSave: Task = {
        id: this.task ? this.task.id : Math.random().toString(36).substr(2, 9),
        completed: this.task ? this.task.completed : false,
        userEmail: this.task ? this.task.userEmail : '',
        ...formValue
      };
      this.save.emit(taskToSave);
      this.taskForm.reset({ priority: 1 });
    }
  }

}


