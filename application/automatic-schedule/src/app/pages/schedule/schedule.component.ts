import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopupComponent } from '../../component/popup/popup.component';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PopupComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit {
  title = "Schedule"

  constructor(private scheduleServiceService: ScheduleServiceService) { }

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
