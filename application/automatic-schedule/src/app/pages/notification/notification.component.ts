import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent { 
  title = "Notification"
  data:any[] =[
    {
      id:2,
      title:'Accept your request',
      description:'Yêu cầu thay đổi của bạn ở thời khóa biểu lớp tài năng HK 1 năm 2024-2028 đã thành công',
      sender:'Admin HCMUS',
      type:'Success',
      date:'19-07-2024',
      dateTime:'9:30'
    },
    {
      id:1,
      title:'Reject your request',
      description:'Lý do thay đổi môn học của bạn tại thời khóa biểu lớp đại trà HK 1 năm học 2024-2028 không chính đáng',
      sender:'Admin Hcmus',
      type:'Reject',
      date:'16-07-2024',
      dateTime:'9:30'
    },
    {
      id:1,
      title:'New schedule time-table',
      description:'Đã có thời khóa biểu mới cho lớp đại trà HK 1 năm học 2024-2028.',
      sender:'Admin HCMUS',
      type:'Message',
      date:'15-07-2024',
      dateTime:'9:30'
    },
  ]

  classTest = false
  test(){
    console.log('run');
    this.classTest = !this.classTest 
  }
}
