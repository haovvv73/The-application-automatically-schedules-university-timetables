import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { RequestServiceService } from '../../services/http/request-service/request-service.service';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [NgFor, NgClass, PopupComponent, NgIf],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent implements OnInit {
  title = "Request History"
  borderColor = 'border-sky-400'
  statusSelect = 0
  currentLecturerID : string | null = null
  statusList = ['all', 'wait', 'accept', 'cancel', 'reject']

  constructor(
    private requestServiceService: RequestServiceService,
    private tokenServiceService : TokenServiceService,
    private authServiceService : AuthServiceService,
  ) { }

  ngOnInit(): void {
    const token = this.tokenServiceService.getToken()
    this.authServiceService.checkAuth({token}).subscribe({
      next: (result : any) =>{
        if(result.data){
          // binding
          console.log('request success',result.data)
          this.currentLecturerID = result.data.lecturerID
          this.getRequestByUser(result.data.lecturerID)
        }
      },
      error :(error : any)=>{
        console.error('Error validating token:', error);
      }
    })
  }

  columnsKey: any[] = [
    'STT',
    'request',
    'schedule',
    'time change',
    'date',
    'status',
    'Action'
  ]

  statusColor = {
    wait: 'bg-gray-400',
    accept: 'bg-green-400',
    reject: 'bg-red-400',
    cancel: 'bg-orange-400',
    all: 'bg-sky-400'
  }

  borderColorMap = {
    all: 'border-sky-400',
    wait: 'border-gray-400',
    accept: 'border-green-400',
    reject: 'border-red-400',
    cancel: 'border-orange-400'
  }

  data: any[] = [
    {
      Id: 'request01',
      request: 'Change Time Toan Roi Rac',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h30p',
      date: '20/05/2002',
      status: 'wait',
    },
  ]

  // call api
  getRequestByUser(lecturerID: string) {
    this.requestServiceService.getRequest(lecturerID).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
          console.log(">>request history<<", result.data)
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

  cancelRequest(requestID: string) {
    const send = {
      requestID,
      status: 'cancel',
      timeSelect : 0
    }

    this.requestServiceService.updateRequest(send).subscribe({
      next: (result: any) => {
        if (result.status) {
          if (this.currentLecturerID) {
            this.getRequestByUser(this.currentLecturerID)
          }
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

  deleteRequest(requestID: string,) {
    const send = {
      requestID,
      status: 'success',
      timeSelect: 0
    }

    this.requestServiceService.updateRequest(send).subscribe({
      next: (result: any) => {
        if (result.status) {
          if (this.currentLecturerID) {
            this.getRequestByUser(this.currentLecturerID)
          }
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

  // binding
  getStatusColor(status: string) {
    switch (status) {
      case 'wait':
        return this.statusColor.wait
      case 'accept':
        return this.statusColor.accept
      case 'reject':
        return this.statusColor.reject
      case 'cancel':
        return this.statusColor.cancel
      case 'all':
        return this.statusColor.all
      default:
        return this.statusColor.wait
    }
  }

  getBorderColor(status: string) {
    switch (status) {
      case 'wait':
        this.borderColor = this.borderColorMap.wait
        break
      case 'accept':
        this.borderColor = this.borderColorMap.accept
        break
      case 'reject':
        this.borderColor = this.borderColorMap.reject
        break
      case 'cancel':
        this.borderColor = this.borderColorMap.cancel
        break
      default:
        this.borderColor = this.borderColorMap.all
    }
  }

  onSelectStatus(index: number) {
    // set color border
    this.getBorderColor(this.statusList[index])
    // set statusColor
    this.statusSelect = index
  }

  formatDateTime(dateTimeStr: string) {
    const dayMap: any = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
    }
    const dateSplit = dateTimeStr.split('_')
    const day = dateSplit[0]
    const time = dateSplit[1]

    return dayMap[day] + ' ' + time
  }
}
