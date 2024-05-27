import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [NgFor,NgClass,RouterLink],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent {
  title = "Approval"
  borderColor = 'border-sky-400'
  statusSelect = 0
  statusList = ['All', 'Wait', 'Accept', 'Cancel', 'Reject']

  columnsKey: any[] = [
    'No',
    'Schedule name',
    'Semester',
    'Year',
    'Request',
    'action'
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
      Id: 'scheduleRquest001',
      scheduleName: 'Thoi khoa bieu lop dai tra',
      semester: '1',
      year: '2024-2028',
      request: '5 request',
    },
    {
      Id: 'scheduleRquest002',
      scheduleName: 'Thoi khoa bieu lop dai tra',
      semester: '1',
      year: '2024-2028',
      request: '5 request',
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

  getBorderColor(status: string) {
    switch (status) {
      case 'Wait':
        this.borderColor = this.borderColorMap.Wait
        break
      case 'Accept':
        this.borderColor = this.borderColorMap.Accept
        break
      case 'Reject':
        this.borderColor = this.borderColorMap.Reject
        break
      case 'Cancel':
        this.borderColor = this.borderColorMap.Cancel
        break
      default:
        this.borderColor = this.borderColorMap.All
    }
  }

  onSelectStatus(index: number) {
    // set color border
    this.getBorderColor(this.statusList[index])
    // set statusColor
    this.statusSelect = index
  }
}
