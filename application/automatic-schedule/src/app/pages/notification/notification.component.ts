import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../../services/http/notification-service/notification-service.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  title = "Notification"
  constructor(private notificationServiceService: NotificationServiceService) { }


  ngOnInit(): void {
    this.getAll('1')
  }


  data: any[] = [
    {
      id: 2,
      title: 'Accept your request',
      description: 'Yêu cầu thay đổi của bạn ở thời khóa biểu lớp tài năng HK 1 năm 2024-2028 đã thành công',
      sender: 'Admin HCMUS',
      notiType: 'success',
      date: '19-07-2024',
      time: '9:30'
    },
    {
      id: 1,
      title: 'Reject your request',
      description: 'Lý do thay đổi môn học của bạn tại thời khóa biểu lớp đại trà HK 1 năm học 2024-2028 không chính đáng',
      sender: 'Admin Hcmus',
      notiType: 'reject',
      date: '16-07-2024',
      time: '9:30'
    },
    {
      id: 1,
      title: 'New schedule time-table',
      description: 'Đã có thời khóa biểu mới cho lớp đại trà HK 1 năm học 2024-2028.',
      sender: 'Admin HCMUS',
      notiType: 'message',
      date: '15-07-2024',
      time: '9:30'
    },
  ]

  classTest = false
  test() {
    console.log('run');
    this.classTest = !this.classTest
  }

  // api
  getAll(lecturerID:string) {
    this.notificationServiceService.getNotification(lecturerID).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
          console.log(result.data);

        } else {
          alert("Something wrong")
        }
      },
      error: (error: any) => {
        console.log(">> error >>", error)
        alert("Something wrong")
      }
    })
  }

  delete(id : string) {
    this.notificationServiceService.deleteNotification(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          console.log(result);
          this.getAll('1')
        } else {
          alert("Something wrong")
        }
      },
      error: (error: any) => {
        console.log(">> error >>", error)
        alert("Something wrong")
      }
    })
  }
}
