import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RequestServiceService } from '../../services/http/request-service/request-service.service';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgClass,NgxChartsModule,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  dataRequest: any[] = []

  constructor(
    // private courseServiceService: CourseServiceService,
    private requestServiceService: RequestServiceService,
    private tokenServiceService: TokenServiceService,
    private authServiceService: AuthServiceService,
  ) { }

  ngOnInit(): void {
    // const token = this.tokenServiceService.getToken()
    // this.authServiceService.checkAdmin({ token }).subscribe({
    //   next: (result: any) => {
    //     if (result.data) {
    //       console.log('success admin-user', result.data)
    //       let id = result.data.lecturerID
    //       this.getRequestByUser(id)
    //     }
    //   },
    //   error: (error: any) => {
    //     console.error('Error validating token:', error);
    //   }
    // })
  }

  // getRequestByUser(lecturerID: string) {
  //   this.requestServiceService.getRequest(lecturerID).subscribe({
  //     next: (result: any) => {
  //       if (result.status) {
  //         this.dataRequest = result.data
  //         console.log(">> request history dashboard <<", result.data)
  //       } else {
  //         alert("Something wrong")
  //       }
  //     },
  //     error: (error: any) => {
  //       console.log(">> error >>", error)
  //       alert("Something wrong")
  //     }
  //   })
  // }
}
