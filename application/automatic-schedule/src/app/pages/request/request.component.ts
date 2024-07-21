import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [NgFor, NgClass, PopupComponent, NgIf],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent {
  title = "Request History"
  borderColor = 'border-sky-400'
  statusSelect = 0
  statusList = ['All','Wait','Accept','Cancel','Reject']

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
    Wait: 'bg-gray-400',
    Accept: 'bg-green-400',
    Reject: 'bg-red-400',
    Cancel: 'bg-orange-400',
    All: 'bg-sky-400'
  }

  borderColorMap = {
    All: 'border-sky-400',
    Wait: 'border-gray-400',
    Accept: 'border-green-400',
    Reject: 'border-red-400',
    Cancel: 'border-orange-400'
  }

  data: any[] = [
    {
      Id: 'request01',
      request: 'Change Time Toan Roi Rac',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h30p',
      date: '20/05/2002',
      status: 'Wait',
    },
    {
      Id: 'request02',
      request: 'lorem request asdaosdihoi',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h40p',
      date: '20/05/2002',
      status: 'Accept',
    },
    {
      Id: 'request03',
      request: 'lorem request oo1oasd',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h30p',
      date: '20/05/2002',
      status: 'Wait',
    },
    {
      Id: 'request04',
      request: 'lorem request asdaosdihoi',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h40p',
      date: '20/05/2002',
      status: 'Accept',
    },
    {
      Id: 'request05',
      request: 'lorem request oo1oasd',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h30p',
      date: '20/05/2002',
      status: 'Reject',
    },
    {
      Id: 'request06',
      request: 'lorem request asdaosdihoi',
      requestDescription: 'lorem request to give salkdalsdk aslkdnjasl',
      time: '12h40p',
      date: '20/05/2002',
      status: 'Cancel',
    },
  ]

  getStatusColor(status: string) {
    switch (status) {
      case 'Wait':
        return this.statusColor.Wait
      case 'Accept':
        return this.statusColor.Accept
      case 'Reject':
        return this.statusColor.Reject
      case 'Cancel':
        return this.statusColor.Cancel
      case 'All':
        return this.statusColor.All
      default:
        return this.statusColor.Wait
    }
  }

  getBorderColor(status: string){
    switch (status) {
      case 'Wait':
        this.borderColor = this.borderColorMap.Wait
        break
      case 'Accept':
        this.borderColor =  this.borderColorMap.Accept
        break
      case 'Reject':
        this.borderColor =  this.borderColorMap.Reject
        break
      case 'Cancel':
        this.borderColor =  this.borderColorMap.Cancel
        break
      default:
        this.borderColor =  this.borderColorMap.All
    }
  }

  onSelectStatus(index : number){
    // set color border
    this.getBorderColor(this.statusList[index])
    // set statusColor
    this.statusSelect = index
  }
}
