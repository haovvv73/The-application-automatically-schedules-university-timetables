import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { format } from 'date-fns';
import { RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { RequestServiceService } from '../../services/http/request-service/request-service.service';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [NgFor, NgxChartsModule, RouterLink, NgIf],
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
  dataRequest: any[] = []

  constructor(
    private courseServiceService: CourseServiceService,
    private requestServiceService: RequestServiceService,
    private tokenServiceService: TokenServiceService,
    private authServiceService: AuthServiceService,
  ) { }
  ngOnInit(): void {
    const token = this.tokenServiceService.getToken()
    this.authServiceService.checkAuth({ token }).subscribe({
      next: (result: any) => {
        if (result.data) {
          console.log('success home-user', result.data)
          let id = result.data.lecturerID
          this.getAll(id)
          this.getRequestByUser(id)
        }
      },
      error: (error: any) => {
        console.error('Error validating token:', error);
      }
    })

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

  getAll(id: string) {
    this.courseServiceService.getCourseAndRoom(id).subscribe({
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

  // call api
  getRequestByUser(lecturerID: string) {
    this.requestServiceService.getRequest(lecturerID).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.dataRequest = result.data
          console.log(">> request history dashboard <<", result.data)
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

  getCountRequest(type: string) {
    let count = []
    switch (type) {
      case 'wait':
        count = this.dataRequest.filter(item => item.status == 'wait')
        break
      case 'success':
        count = this.dataRequest.filter(item => item.status == 'success')
        break
      case 'reject':
        count = this.dataRequest.filter(item => item.status == 'reject')
        break
      case 'cancel':
        count = this.dataRequest.filter(item => item.status == 'cancel')
        break
    }

    return count.length
  }
}
