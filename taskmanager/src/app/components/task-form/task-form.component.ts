import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() editingTaskId: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Omit<Task,'id'>>();
  @Output() update = new EventEmitter<{ id: string; patch: Partial<Task> }>();

  title = '';
  due = '';
  level: Task['level'] = 'low';
  desc = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.editingTaskId) {
      const t = this.taskService.findById(this.editingTaskId);
      if (t) {
        this.title = t.title;
        this.due = t.due;
        this.level = t.level;
        this.desc = t.desc || '';
      }
    } else {
      // default due = today
      const d = new Date();
      this.due = d.toISOString().slice(0,10);
    }
  }

  submit() {
    if (!this.title || !this.due) return;
    if (this.editingTaskId) {
      this.update.emit({ id: this.editingTaskId, patch: { title: this.title, due: this.due, level: this.level, desc: this.desc }});
    } else {
      this.add.emit({ title: this.title, due: this.due, level: this.level, desc: this.desc, status: 'todo' });
    }
  }

  onClose() {
    this.close.emit();
  }
}
