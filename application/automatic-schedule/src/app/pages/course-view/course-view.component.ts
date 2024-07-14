import { Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';
import { SubjectServiceService } from '../../services/http/subject-service/subject-service.service';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {
  course : any = {}
  room : any = {}
  subject : any = {}
  schedule : any = {}
  lecturer : any[] = []
  constructor(
    private location: Location,
    private courseServiceService : CourseServiceService,
    private lecturerServiceService : LecturerServiceService,
    private roomServiceService : RoomServiceService,
    private subjectServiceService : SubjectServiceService,
    private scheduleServiceService : ScheduleServiceService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // throw new Error('Method not implemented.');
    if(id){
      this.getCourse(id)
    }
  }

  goBack(){
    this.location.back()
  }

  getCourse(id:string){
    this.courseServiceService.getCourseDetail(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.course = result.data[0]
          console.log(this.course);
          this.getRoom(this.course.roomID)
          this.getLecturer(this.course.lecturerID)
          this.getSubject(this.course.subjectID)
          this.getSchedule(this.course.scheduleID)          
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

  getRoom(id:string){
    this.roomServiceService.getRoomDetail(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.room = result.data[0]
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

  getLecturer(ids:string){
    for(let id of ids){
      this.lecturerServiceService.getLecturerDetail(id).subscribe({
        next: (result: any) => {
          if (result.status) {
            this.lecturer.push(result.data[0])
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

  getSubject(id:string){
    this.subjectServiceService.getSubjectDetail(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.subject = result.data[0]
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
          this.schedule = result.data[0]
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

  formatTimeHourMinute(time: any) {
    if(time){
      return format(time, 'HH:mm');
    }else{
      return "00:00"
    }
  }
}
