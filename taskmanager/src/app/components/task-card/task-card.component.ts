import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
  host: {
    '[draggable]': 'true'
  }
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  @Output() dragstart = new EventEmitter<DragEvent>();

  constructor(){}

  onEdit(e: Event) {
    e.stopPropagation();
    this.edit.emit();
  }

  onDelete(e: Event) {
    e.stopPropagation();
    this.delete.emit(this.task.id);
  }

  onDragStart(ev: DragEvent) {
    this.dragstart.emit(ev);
  }

  proximityColor(dueISO: string) {
    const today = new Date();
    const due = new Date(dueISO);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000*60*60*24));
    if (diff < 0) return 'bg-gray-500';
    if (diff <= 1) return 'bg-red-500';
    if (diff <= 3) return 'bg-orange-400';
    if (diff <= 7) return 'bg-yellow-300';
    return 'bg-green-400';
  }

  levelLabel(l: Task['level']) {
    return l === 'high' ? 'Alta' : l === 'medium' ? 'Média' : 'Baixa';
  }
}
