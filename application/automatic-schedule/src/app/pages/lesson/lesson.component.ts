import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [NgFor,PopupComponent,NgIf],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
  host: {ngSkipHydration: 'true'},
})
export class LessonComponent {
  title = 'Lesson Resource'
  columnsKey : any[] = [
    'STT',
    'Id',
    'Lesson',
    'Lesson Description',
    'Duration',
    'Type',
    'location',
    'Action'
  ]

  data : any[] = [
    {
      Id:'lesson1',
      lesson:'sinh',
      lessonDescription: 'mon hoc lien quan toi moi truong va dong vat',
      duration: '4',
      location: 'L.Trung',
      type: 'ly thuyet',
    },
    {
      Id:'lesson12',
      lesson:'toan',
      lessonDescription: 'hieu kien thuc toan dai so',
      duration: '3',
      location: 'NVC',
      type: 'ly thuyet',
    },
  ]
}
