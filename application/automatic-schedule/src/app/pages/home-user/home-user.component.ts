import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { format } from 'date-fns';
import { RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [NgFor, NgxChartsModule, RouterLink],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {
  url = EnvUrl.scheduleView_user
  data2: any[] = []
  data3: any[] = []
  data4: any[] = []
  data5: any[] = []
  data6: any[] = []
  data7: any[] = []

  constructor(private courseServiceService: CourseServiceService) { }
  ngOnInit(): void {
    this.getAll()
  }

  getMax() {
    let n = Math.max(
      this.data2.length,
      this.data3.length,
      this.data4.length,
      this.data5.length,
      this.data6.length,
      this.data7.length,
    );
    let arr = []
    for (let i = 0; i < n; ++i) {
      arr.push(i)
    }
    return arr
  }

  // time
  formatTimeHourMinute(time: any) {
    return format(time, 'HH:mm');
  }

  getAll() {
    this.courseServiceService.getCourseAndRoom('8').subscribe({
      next: (result: any) => {
        if (result.status) {
          // this.data = result.data

          for (let cou of result.data) {
            switch (cou.day) {
              case 'mon':
                this.data2.push(cou)
                break;
              case 'tue':
                this.data3.push(cou)
                break;
              case 'wed':
                this.data4.push(cou)
                break;
              case 'thu':
                this.data5.push(cou)
                break;
              case 'fri':
                this.data6.push(cou)
                break;
              case 'sat':
                this.data7.push(cou)
                break;
            }
          }

          console.log(this.data5);

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
