import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [NgFor,PopupComponent,NgIf],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  title = 'Teacher Resource'
  columnsKey : any[] = [
    'STT',
    'Id',
    'Teacher',
    'Gender',
    'Faculty',
    'Birthday',
    'Address',
    'Email',
    'Phone',
    'Action'
  ]

  data : any[] = [
    {
      Id:'teacher001',
      teacher:'nguyen van a',
      gender: 'male',
      faculty: 'Math',
      birthday: '20/01/2002', 
      address: 'lorem street',
      email: 'lorem@gmail.com',
      phone: '091234567',
    },
    {
      Id:'teacher002',
      teacher:'nguyen van b',
      gender: 'female',
      faculty: 'Algorithm',
      birthday: '20/01/2001', 
      address: 'lorem street',
      email: 'lorem2@gmail.com',
      phone: '091230567',
    },
  ]
}
