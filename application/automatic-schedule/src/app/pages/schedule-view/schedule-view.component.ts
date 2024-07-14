import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewtableComponent } from '../../component/viewtable/viewtable.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { format } from 'date-fns';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { EnvUrl } from '../../env-url';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  imports: [NgFor, ViewtableComponent, RouterLink, NgIf],
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.css',
})
export class ScheduleViewComponent implements OnInit {
  envUrl = EnvUrl
  title = ''
  data: any[] = []
  dataRoom : any[] = []
  dataTeacher: any[] = []

  constructor(
    private courseServiceService: CourseServiceService,
    private route: ActivatedRoute,
    private lecturerServiceService: LecturerServiceService,
    private roomServiceService: RoomServiceService,
    private scheduleServiceService: ScheduleServiceService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if(id){
      this.getAll(id)
      this.getLecturer()
      this.getRoom()
      this.getSchedule(id)
    }
  }

  // time
  formatTimeHourMinute(time: any) {
    if(time){
      return format(time, 'HH:mm');
    }else{
      return "00:00"
    }
  }

  // api call
  getAll(id:string) {
    this.courseServiceService.getCourse(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
          // console.log(this.data);
          
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

  getSchedule(id:string){
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

  // 
  getRoomName(id:string){
    let roomFind = this.dataRoom.find(r => r.roomID == id)
    if (roomFind) return roomFind.roomName
    return '_null_'
  }

  getTeacher(Id: string) {
    let teacher = this.dataTeacher.find(teacher => teacher.lecturerID == Id)
    if (teacher) return teacher.lecturerName
    return "_null_"
  }

}
