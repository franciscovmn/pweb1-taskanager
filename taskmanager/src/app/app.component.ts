import { Component } from '@angular/core';
import { TaskBoardComponent } from './components/task-board/task-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskBoardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
