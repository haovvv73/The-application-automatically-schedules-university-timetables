import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';

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

  constructor(private router: Router) { }
  ngOnInit(): void {
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    this.goToNotification = userPathSegment == 'user' ? this.envUrl.notification_user : this.envUrl.notification_admin

    // console.log(this.url);
  }


  onShowSubmenu(){
    this.showSubmenu = true
  }

  onHideSubmenu(){
    this.showSubmenu = false
  }
}
