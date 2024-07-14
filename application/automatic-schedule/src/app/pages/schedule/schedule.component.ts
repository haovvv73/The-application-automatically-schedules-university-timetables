import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PopupComponent } from '../../component/popup/popup.component';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { EnvUrl } from '../../env-url';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PopupComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit {
  title = "Schedule"
  envUrl = EnvUrl
  url = ''
  isAdmin = false
  constructor(private scheduleServiceService: ScheduleServiceService,private router: Router) { }

  data: any[] = [
    // {
    //   scheduleID: 1,
    //   title: 'Lop Cu Nhan',
    //   semester: 1,
    //   yearStart: 2020,
    //   yearEnd: 2024
    // },
  ]

  ngOnInit(): void {
    this.getAll()
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    this.url = userPathSegment == 'user' ? this.envUrl.scheduleView_user : this.envUrl.scheduleView_admin
    this.isAdmin = userPathSegment == 'user' ? false : true
    // console.log(this.url);
    
  }

  // get
  getAll() {
    this.scheduleServiceService.getSchedule().subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
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
