import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';
import { NotiServiceService } from '../../services/realtime/noti-service/noti-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {ngSkipHydration: 'true'},
})
export class HeaderComponent {
  currentUser : any = {}
  showSubmenu = false
  envUrl = EnvUrl
  goToNotification = this.envUrl.notification_user
  userName = ''
  newMessage = false

  constructor(
    private router: Router,
    private tokenServiceService : TokenServiceService,
    private authServiceService : AuthServiceService,
    private notiServiceService : NotiServiceService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    this.goToNotification = userPathSegment == 'user' ? this.envUrl.notification_user : this.envUrl.notification_admin

    const token = this.tokenServiceService.getToken()
    this.authServiceService.checkAuth({token}).subscribe({
      next: (result : any) =>{
        if(result.data){
          // binding
          console.log('success',result.data)
          this.userName = result.data.email.split('@')[0]

          // save local
          this.currentUser = result.data
          this.tokenServiceService.setUser(result.data)

          // register noti real time
          this.registerNoti(this.currentUser.lecturerID)
          this.onNoti()
        }
      },
      error :(error : any)=>{
        console.error('Error validating token:', error);
      }
    })
  }

  registerNoti(lecID : string){
    this.notiServiceService.register(lecID);
  }

  onNoti(){
    this.notiServiceService.message.subscribe((msg: any) => {
      console.log(msg);
      this.toastr.info('New Message !!')
      this.newMessage = true
    });
  }

  onShowSubmenu(){
    this.showSubmenu = true
  }

  onHideSubmenu(){
    this.showSubmenu = false
  }
}
