import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { ScheduleTableComponent } from '../../component/schedule-table/schedule-table.component';
import { RequestServiceService } from '../../services/http/request-service/request-service.service';

@Component({
  selector: 'app-approval-view',
  standalone: true,
  imports: [NgFor, NgIf, NgClass,ScheduleTableComponent],
  templateUrl: './approval-view.component.html',
  styleUrl: './approval-view.component.css'
})
export class ApprovalViewComponent implements OnInit {
  title = ''
  currentScheduleID : string | null = null
  test = false

  data: any[] = []
  dataRequest : any[] = []
  dataCourseBeforeSaveTable: any[] = []
  dataRoom: any[] = []
  dataTeacher: any[] = []

  constructor(
    private courseServiceService: CourseServiceService,
    private route: ActivatedRoute,
    private lecturerServiceService: LecturerServiceService,
    private roomServiceService: RoomServiceService,
    private scheduleServiceService: ScheduleServiceService,
    private requestServiceService: RequestServiceService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.currentScheduleID = this.route.snapshot.paramMap.get('id');

    // console.log(id);
    if (this.currentScheduleID) {
      this.getSchedule(this.currentScheduleID)
      this.getRoom()
      this.getRequestByAdmin(this.currentScheduleID)
      // this.getAll(this.currentScheduleID)
      // this.getLecturer()
      
    }
  }

  // api call
  getAll(id: string) {
    this.courseServiceService.getCourse(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
          this.bindingScheduleTable(this.data)
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

  getLecturer() {
    this.lecturerServiceService.getLecturer().subscribe({
      next: (result: any) => {
        if (result.status) {
          this.dataTeacher = result.data
          if(this.currentScheduleID){
            this.getAll(this.currentScheduleID)
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

  getRoom() {
    this.roomServiceService.getRoom().subscribe({
      next: (result: any) => {
        if (result.status) {
          this.dataRoom = result.data
          this.getLecturer()
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

  getSchedule(id: string) {
    this.scheduleServiceService.getScheduleDetail(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.title = result.data[0].title
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

  getRequestByAdmin(scheduleID : string){
    this.requestServiceService.getRequestByAdmin(scheduleID).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.dataRequest = result.data
          console.log(">><<",result.data)
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

  getRequestedByAdmin(scheduleID : string){
    this.requestServiceService.getRequestedByAdmin(scheduleID).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.dataRequest = result.data
          console.log(">>history<<",result.data)
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

  rejectRequest(requestID : string){
    const send = {
      requestID,
      status : 'reject',
      timeSelect : '0'
    }

    this.requestServiceService.updateRequest(send).subscribe({
      next: (result: any) => {
        if (result.status) {
          if (this.currentScheduleID) {
            this.getRequestByAdmin(this.currentScheduleID)
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

  acceptRequest(requestID : string, timeSelect : string){
    const send = {
      requestID,
      status : 'success',
      timeSelect
    }

    this.requestServiceService.updateRequest(send).subscribe({
      next: (result: any) => {
        if (result.status) {
          if (this.currentScheduleID) {
            this.getRequestByAdmin(this.currentScheduleID)
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
  getTeacher(Id: string) {
    let teacher = this.dataTeacher.find(teacher => teacher.lecturerID == Id)
    if (teacher) return teacher.lecturerName
    return "_null_"
  }

  getRoomName(id: string) {
    let roomFind = this.dataRoom.find(r => r.roomID == id)
    if (roomFind) return roomFind.roomName
    return '_null_'
  }

  bindingScheduleTable(data: any) {
    const mockData = []
    // dataRoomSelect_roomID
    for (let item of data) {
      let obj = {
        className: item.className,
        day: item.day,
        timeStart: item.timeStart,
        timeEnd: item.timeEnd,
        location: item.location,
        room: '',
        teacher: ''
      }
      let roomFind = this.dataRoom.find(r => r.roomID == item.roomID)
      if (roomFind) obj.room = roomFind.roomName

      for (let id of item.lecturerID) {
        let name = this.getTeacher(id)
        if (obj.teacher.length > 0) {
          obj.teacher += (',' + name)
        } else {
          obj.teacher += name
        }
      }
      mockData.push(obj)
    }

    this.dataCourseBeforeSaveTable = mockData
  }

  formatDateTime(dateTimeStr : string){
    const dayMap : any = {
      mon:'Monday',
      tue:'Tuesday',
      wed:'Wednesday',
      thu:'Thursday',
      fri:'Friday',
      sat:'Saturday',
    }
    const dateSplit = dateTimeStr.split('_')
    const day = dateSplit[0]
    const time = dateSplit[1]

    return dayMap[day] + ' ' + time
  }


  // change view
  onChangeViewRequested = ()=>{
    if(this.currentScheduleID){
      this.getRequestedByAdmin(this.currentScheduleID)
      this.test = true
    }
  }

  onUnChangeViewRequested = ()=>{
    if(this.currentScheduleID){
      this.getRequestByAdmin(this.currentScheduleID)
      this.test = false
    }
  }

}
