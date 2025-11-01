import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
}
function addDaysISO(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0,10);
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private initial: Task[] = [
    {
      id: uid(),
      title: 'Ler capítulo 3 de Algoritmos',
      due: addDaysISO(2),
      level: 'high',
      desc: 'Priorizar exercícios 3.1-3.5',
      status: 'todo'
    },
    {
      id: uid(),
      title: 'Resolver lista de TS',
      due: addDaysISO(5),
      level: 'medium',
      desc: 'Atenção a generics',
      status: 'doing'
    },
    {
      id: uid(),
      title: 'Revisão rápida: HTML/CSS',
      due: addDaysISO(10),
      level: 'low',
      desc: '30 minutos',
      status: 'done'
    }
  ];

  // Signal que mantém o array de tarefas
  public tasks = signal<Task[]>(this.initial);

  constructor() {}

  getAll() {
    return this.tasks;
  }

  addTask(task: Omit<Task,'id'>) {
    const t: Task = { ...task, id: uid() };
    this.tasks.update(prev => [...prev, t]);
  }

  updateTask(id: string, patch: Partial<Task>) {
    this.tasks.update(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }

  deleteTask(id: string) {
    this.tasks.update(prev => prev.filter(t => t.id !== id));
  }

  moveTaskTo(id: string, status: Task['status']) {
    this.updateTask(id, { status });
  }

  findById(id: string) {
    return this.tasks().find(t => t.id === id) || null;
  }
}
