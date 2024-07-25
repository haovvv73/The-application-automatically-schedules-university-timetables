import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';

interface LinkItem{
  title : string,
  link : string,
  icon : string,
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  host: {ngSkipHydration: 'true'},
})
export class SidebarComponent {
  envUrl = EnvUrl

  constructor(private tokenServiceService : TokenServiceService){}

  linkItems : LinkItem[] = [
    {
      title : 'Dashboard',
      link : '/app/admin',
      icon : 'fa fa-desktop'
    },
    {
      title : 'Schedule',
      link : this.envUrl.schedule_admin,
      icon : 'fa fa-calendar-alt'
    },
    {
      title : 'Lecturer',
      link : this.envUrl.teacher_admin,
      icon : 'fa fa-chalkboard-teacher'
    },
    {
      title : 'Subject',
      link : this.envUrl.lesson_admin,
      icon : 'fa fa-book'
    },
    {
      title : 'approval',
      link : this.envUrl.approval_admin,
      icon : 'fa fa-check-square'
    },
    {
      title : 'Room',
      link : this.envUrl.room_admin,
      icon : 'fa fa-store-alt'
    }
  ]

  logout(){
    this.tokenServiceService.removeToken()
    this.tokenServiceService.removeUser()
  }
}
