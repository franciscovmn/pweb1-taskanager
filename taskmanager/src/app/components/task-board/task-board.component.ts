import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {
  tasks = this.taskService.getAll();

  // editingTaskId usado para abrir o form em modo edição via binding
  editingTaskId: string | null = null;
  // show/hide form
  showForm = false;

  constructor(private taskService: TaskService) {}

  openForm(editId?: string) {
    this.editingTaskId = editId ?? null;
    this.showForm = true;
  }

  closeForm() {
    this.editingTaskId = null;
    this.showForm = false;
  }

  onAdd(task: Omit<Task,'id'>) {
    this.taskService.addTask(task);
    this.closeForm();
  }

  onUpdate(id: string, patch: Partial<Task>) {
    this.taskService.updateTask(id, patch);
    this.closeForm();
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id);
  }

  onDragStart(ev: DragEvent, id: string) {
    ev.dataTransfer?.setData('text/plain', id);
    // opcional: add efeito
  }

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
  }

  onDrop(ev: DragEvent, status: Task['status']) {
    ev.preventDefault();
    const id = ev.dataTransfer?.getData('text/plain');
    if (id) this.taskService.moveTaskTo(id, status);
  }
}
