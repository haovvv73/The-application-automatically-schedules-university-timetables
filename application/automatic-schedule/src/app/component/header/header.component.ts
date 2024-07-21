import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {ngSkipHydration: 'true'},
})
export class HeaderComponent {
  showSubmenu = false
  envUrl = EnvUrl
  goToNotification = this.envUrl.notification_user
  userName = ''

  constructor(private router: Router,private tokenServiceService : TokenServiceService) { }
  ngOnInit(): void {
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    this.goToNotification = userPathSegment == 'user' ? this.envUrl.notification_user : this.envUrl.notification_admin

    // console.log(this.url);
    const user = this.tokenServiceService.getUser()
    // console.log(user);
    setTimeout(()=>{
      this.userName = user.email.split('@')[0]
    },1000)
  }


  onShowSubmenu(){
    this.showSubmenu = true
  }

  onHideSubmenu(){
    this.showSubmenu = false
  }
}
