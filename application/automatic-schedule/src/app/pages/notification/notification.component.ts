import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../../services/http/notification-service/notification-service.service';
import { Router, RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';
import { NotiServiceService } from '../../services/realtime/noti-service/noti-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  title = "Notification"
  envUrl = EnvUrl
  currentUser: any | null = null
  goToSchedule = ''
  isAdmin = false
  constructor(
    private router: Router,
    private notificationServiceService: NotificationServiceService,
    private tokenServiceService : TokenServiceService,
    private authServiceService : AuthServiceService,
    private notiServiceService : NotiServiceService,
    private toastr: ToastrService,
  ) { }


  ngOnInit(): void {
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    // this.goToSchedule = userPathSegment == 'user' ? this.envUrl.scheduleView_user : this.envUrl.approvalView_admin
    this.isAdmin = userPathSegment == 'user' ? false : true

    const token = this.tokenServiceService.getToken()
    this.authServiceService.checkAuth({ token }).subscribe({
      next: (result: any) => {
        if (result.data) {
          // binding
          console.log('noti success', result.data)

          // save local
          this.currentUser = result.data
          this.tokenServiceService.setUser(result.data)

          // get view list
          this.getAll(this.currentUser.lecturerID)

          // register noti real time
          if (this.isAdmin) {
            // this.registerNotiAdmin(this.currentUser.accountID)
            // this.onNotiAdmin()
          } else {
            // this.registerNoti(this.currentUser.lecturerID)
            // this.onNoti()
          }
        }
      },
      error: (error: any) => {
        console.error('Error validating token:', error);
      }
    })

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
  getAll(lecturerID: string) {
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

  delete(id: string) {
    this.notificationServiceService.deleteNotification(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          console.log(result);
          this.getAll(this.currentUser.lecturerID)
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

  registerNoti(lecID : string){
    this.notiServiceService.register(lecID);
  }

  onNoti(){
    this.notiServiceService.message.subscribe((msg: any) => {
      console.log("user2 >>",msg);
      // this.toastr.info('New Message !!')
      if(this.currentUser.lecturerID){
        this.getAll(this.currentUser.lecturerID)
      }
    });
  }

  registerNotiAdmin(lecID : string){
    this.notiServiceService.registerAdmin(lecID);
  }

  onNotiAdmin(){
    this.notiServiceService.messageAdmin.subscribe((msg: any) => {
      console.log("admin2 >>",msg);
      // this.toastr.info('New Message !!')
      if(this.currentUser.lecturerID){
        this.getAll(this.currentUser.lecturerID)
      }
    });
  }
}
