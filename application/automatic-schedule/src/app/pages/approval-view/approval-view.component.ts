import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-view',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './approval-view.component.html',
  styleUrl: './approval-view.component.css'
})
export class ApprovalViewComponent {
  title = 'Thoi Khoa Bieu Lop Dai Tra'

  weekDay = [
    'monday_day',
    'monday_night',
    'tuesday_day',
    'tuesday_night',
    'wednesday_day',
    'wednesday_night',
    'thursday_day',
    'thursday_night',
    'friday_day',
    'friday_night',
    'saturday_day',
    'saturday_night',
    'sunday_day',
    'sunday_night',
  ]

  courses = [
    {
      ID: 1,
      name: 'xu ly bien hinh va xu ly anh',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'vo tran gia haoooo'
    },
    {
      ID: 2,
      name: 'hoa dai cuong 2',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'tuesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'tuesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'saturday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'saturday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'tuesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'tuesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'monday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'wednesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'wednesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'wednesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'wednesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'wednesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'wednesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'tuesday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },    {
      ID: 1,
      name: 'c program 2',
      day: 'thursday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 2,
      name: 'c program 3',
      day: 'sunday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    },
    {
      ID: 3,
      name: 'c program 1',
      day: 'friday',
      timeStart: '9h',
      timeEnd: '10h',
      address: 'Linh Trung',
      room: 'E304',
      teacher:'lorem teacher'
    }
  ]

  slicePatternWithComma(text : string, comma:string){
    const words = text.split(comma)
    return words
  }
}
