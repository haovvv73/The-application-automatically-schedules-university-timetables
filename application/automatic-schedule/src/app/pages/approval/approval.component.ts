import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { EnvUrl } from '../../env-url';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent implements OnInit {
  url = EnvUrl.approvalView_admin
  title = "Approval"
  borderColor = 'border-sky-400'
  statusSelect = 0
  statusList = ['All', 'Wait', 'Accept', 'Cancel', 'Reject']

  constructor(private scheduleServiceService: ScheduleServiceService) { }

  ngOnInit(): void {
    this.getAll()
  }

  columnsKey: any[] = [
    'No',
    'Schedule name',
    'Semester',
    'Year',
    'Request',
    'action'
  ]

  data: any[] = [
    // {
    //   Id: 'scheduleRquest001',
    //   scheduleName: 'Thoi khoa bieu lop dai tra',
    //   semester: '1',
    //   year: '2024-2028',
    //   request: '5 request',
    // },
    // {
    //   Id: 'scheduleRquest002',
    //   scheduleName: 'Thoi khoa bieu lop dai tra',
    //   semester: '1',
    //   year: '2024-2028',
    //   request: '5 request',
    // },
  ]

  getAll() {
    this.scheduleServiceService.getSchedule().subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
          console.log(this.data);
          
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
