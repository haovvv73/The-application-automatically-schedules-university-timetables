import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewtableComponent } from '../../component/viewtable/viewtable.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { format } from 'date-fns';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { EnvUrl } from '../../env-url';
import { ScheduleTableComponent } from '../../component/schedule-table/schedule-table.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  imports: [NgFor, ViewtableComponent, RouterLink, NgIf, NgClass,ScheduleTableComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.css',
})
export class ScheduleViewComponent implements OnInit {
  envUrl = EnvUrl
  requestForm!: FormGroup
  title = ''
  data: any[] = []
  dataRoom: any[] = []
  dataTeacher: any[] = []
  dataCourseBeforeSaveTable: any[] = []
  isAdmin = false
  requestMode = false
  data2 : any[] = []
  data3 : any[] = []
  data4 : any[] = []
  data5 : any[] = []
  data6 : any[] = []
  data7 : any[] = []

  constructor(
    private courseServiceService: CourseServiceService,
    private route: ActivatedRoute,
    private lecturerServiceService: LecturerServiceService,
    private roomServiceService: RoomServiceService,
    private scheduleServiceService: ScheduleServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    this.isAdmin = userPathSegment == 'user' ? false : true
    // console.log(id);
    if (id) {
      this.getAll(id)
      this.getLecturer()
      this.getRoom()
      this.getSchedule(id)
      this.getTeacherCourse()
    }

    this.requestForm = new FormGroup({
      day1: new FormControl('', [Validators.required]),
      timeStart1: new FormControl('', [Validators.required]),
      timeEnd1: new FormControl('', [Validators.required]),
      day2: new FormControl('', [Validators.required]),
      timeStart2: new FormControl('', [Validators.required]),
      timeEnd2: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required])
    })
  }

  get day1() {
    return this.requestForm.get('day1')
  }

  get day2() {
    return this.requestForm.get('day2')
  }

  get timeStart1() {
    return this.requestForm.get('timeStart1')
  }

  get timeStart2() {
    return this.requestForm.get('timeStart2')
  }

  get timeEnd1() {
    return this.requestForm.get('timeEnd1')
  }

  get timeEnd2() {
    return this.requestForm.get('timeEnd2')
  }

  get reason() {
    return this.requestForm.get('reason')
  }

  getForm() {
    return {
      day1: this.requestForm.value.day1,
      day2: this.requestForm.value.day2,
      timeStart1: this.requestForm.value.timeStart1,
      timeStart2: this.requestForm.value.timeStart2,
      timeEnd1: this.requestForm.value.timeEnd1,
      timeEnd2: this.requestForm.value.timeEnd2,
      reason: this.requestForm.value.reason,
    }
  }

  clearForm(success : boolean) {
    if(success){
      this.requestForm.get('day1')?.setValue('')
      this.requestForm.get('day2')?.setValue('')
      this.requestForm.get('timeStart1')?.setValue('')
      this.requestForm.get('timeStart2')?.setValue('')
      this.requestForm.get('timeEnd1')?.setValue('')
      this.requestForm.get('timeEnd2')?.setValue('')
      this.requestForm.get('reason')?.setValue('')
    }
  }

  onClickValidate() {
    this.requestForm.get('day1')?.markAsTouched()
    this.requestForm.get('day2')?.markAsTouched()
    this.requestForm.get('timeStart1')?.markAsTouched()
    this.requestForm.get('timeStart2')?.markAsTouched()
    this.requestForm.get('timeEnd1')?.markAsTouched()
    this.requestForm.get('timeEnd2')?.markAsTouched()
    this.requestForm.get('reason')?.markAsTouched()
  }

  // time
  formatTimeHourMinute(time: any) {
    if (time) {
      return format(time, 'HH:mm');
    } else {
      return "00:00"
    }
  }

  // api call
  getAll(id: string) {
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

  getTeacherCourse() {
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

  // binding
  getRoomName(id: string) {
    let roomFind = this.dataRoom.find(r => r.roomID == id)
    if (roomFind) return roomFind.roomName
    return '_null_'
  }

  getTeacher(Id: string) {
    let teacher = this.dataTeacher.find(teacher => teacher.lecturerID == Id)
    if (teacher) return teacher.lecturerName
    return "_null_"
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

  getMax(){
    let n = Math.max(
      this.data2.length,
      this.data3.length,
      this.data4.length,
      this.data5.length,
      this.data6.length,
      this.data7.length,
    );  
    let arr = []
    for(let i = 0; i < n; ++i){
      arr.push(i)
    }
    return arr
  }

  // view
  goRequest(){
    this.requestMode = true
    this.bindingScheduleTable(this.data)
  }

  onSubmit() {
    alert('run')
    this.onClickValidate()
    if (!this.requestForm.invalid) {
 
    }
  }
}
