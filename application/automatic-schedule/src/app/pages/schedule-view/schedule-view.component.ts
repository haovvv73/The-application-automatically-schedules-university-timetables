import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewtableComponent } from '../../component/viewtable/viewtable.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { format, parseISO, set, areIntervalsOverlapping } from 'date-fns';
import { CourseServiceService } from '../../services/http/course-service/course-service.service';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { EnvUrl } from '../../env-url';
import { ScheduleTableComponent } from '../../component/schedule-table/schedule-table.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { RequestServiceService } from '../../services/http/request-service/request-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NotiServiceService } from '../../services/realtime/noti-service/noti-service.service';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  imports: [NgFor, ViewtableComponent, RouterLink, NgIf, NgClass, ScheduleTableComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.css',
})
export class ScheduleViewComponent implements OnInit, OnDestroy {
  envUrl = EnvUrl
  currentScheduleID: string | null = null
  requestForm!: FormGroup
  title = ''
  data: any[] = []
  dataRoom: any[] = []
  dataTeacher: any[] = []
  dataTeacherCanSelect: any[] = []
  dataCourseBeforeSaveTable: any[] = []
  isAdmin = false
  requestMode = false
  data2: any[] = []
  data3: any[] = []
  data4: any[] = []
  data5: any[] = []
  data6: any[] = []
  data7: any[] = []

  userWatcher !: Subscription 

  constructor(
    private courseServiceService: CourseServiceService,
    private route: ActivatedRoute,
    private lecturerServiceService: LecturerServiceService,
    private roomServiceService: RoomServiceService,
    private scheduleServiceService: ScheduleServiceService,
    private tokenServiceService: TokenServiceService,
    private requestServiceService: RequestServiceService,
    private toastr: ToastrService,
    private router: Router,
    private notiServiceService: NotiServiceService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let href = this.router.url.split('/');
    let userPathSegment = href[2]
    this.isAdmin = userPathSegment == 'user' ? false : true
    // console.log(id);
    if (id) {
      // this.getLecturer()
      // this.getRoom()
      this.getSchedule(id)
      // this.getTeacherCourse() // re-render
      // this.getAll(id) // re-render
    }

    this.requestForm = new FormGroup({
      courseID: new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required]),
      day1: new FormControl('', [Validators.required]),
      timeStart1: new FormControl('', [Validators.required]),
      timeEnd1: new FormControl('', [Validators.required]),
      day2: new FormControl('', [Validators.required]),
      timeStart2: new FormControl('', [Validators.required]),
      timeEnd2: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required])
    })

    // listener
    this.onNoti()

  }

  ngOnDestroy(): void {
    console.log('user schedule-view >> destroy');
    if(this.userWatcher) this.userWatcher.unsubscribe()
  }

  onNoti() {
    this.userWatcher = this.notiServiceService.message.subscribe((msg: any) => {
      console.log("user schedule-view >>", msg);
      if (this.currentScheduleID) {
        this.getTeacherCourse() // re-render
        this.getAll(this.currentScheduleID) // re-render
        // this.bindingScheduleTable(this.data)
      }
    });
  }

  get courseID() {
    return this.requestForm.get('courseID')
  }

  get courseName() {
    return this.requestForm.get('courseName')
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
      courseID: this.requestForm.value.courseID,
      courseName: this.requestForm.value.courseName,
      day1: this.requestForm.value.day1,
      day2: this.requestForm.value.day2,
      timeStart1: this.requestForm.value.timeStart1,
      timeStart2: this.requestForm.value.timeStart2,
      timeEnd1: this.requestForm.value.timeEnd1,
      timeEnd2: this.requestForm.value.timeEnd2,
      reason: this.requestForm.value.reason,
    }
  }

  clearForm(success: boolean) {
    if (success) {
      this.requestForm.get('courseID')?.setValue('')
      this.requestForm.get('courseName')?.setValue('')
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
    this.requestForm.get('courseID')?.markAsTouched()
    this.requestForm.get('courseName')?.markAsTouched()
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
          this.bindingScheduleTable(this.data)
          console.log("getALL",this.data);
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
          if (this.currentScheduleID) {
            this.getTeacherCourse() // re-render
            this.getAll(this.currentScheduleID) // re-render
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
          this.currentScheduleID = result.data[0].scheduleID
          this.getRoom()
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
    const us = this.tokenServiceService.getUser()
    let id = ''
    if (us) id = us.lecturerID
    this.courseServiceService.getCourseAndRoom(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          // this.data = result.data
          this.data2 = []
          this.data3 = []
          this.data4 = []
          this.data5 = []
          this.data6 = []
          this.data7 = []
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
          console.log('teacher course',result.data);

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
    const mockData2 = []
    // dataRoomSelect_roomID
    for (let item of data) {
      let obj = {
        courseID: item.courseID,
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

        // select data
        const us = this.tokenServiceService.getUser()
        if (us) {
          if (id == us.lecturerID) mockData2.push(obj)
        }

      }
      mockData.push(obj)
    }

    this.dataCourseBeforeSaveTable = mockData
    this.dataTeacherCanSelect = mockData2
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

  onSelectCourse(course: any) {
    this.requestForm.get('courseID')?.setValue(course.courseID)
    this.requestForm.get('courseName')?.setValue(course.className)
  }

  // view
  goRequest() {
    this.requestMode = true
    this.bindingScheduleTable(this.data)
  }

  // special validate
  overlapTeacherCourseValidate(day: string, timeStart: string, timeEnd: string) {
    const arrTimeStart = timeStart.split(':')
    const arrTimeEnd = timeStart.split(':')
    console.log(arrTimeStart);
    console.log(arrTimeEnd);

    const cou1 = {
      timeStart: set(new Date(), {
        hours: parseInt(arrTimeStart[0]),
        minutes: parseInt(arrTimeStart[1]),
        seconds: 0,
        milliseconds: 0
      }),
      timeEnd: set(new Date(), {
        hours: parseInt(arrTimeEnd[0]),
        minutes: parseInt(arrTimeEnd[1]),
        seconds: 0,
        milliseconds: 0
      })
    }

    let courseCou2 = []
    switch (day) {
      case 'mon':
        courseCou2 = this.data2
        break;
      case 'tue':
        courseCou2 = this.data3
        break;
      case 'wed':
        courseCou2 = this.data4
        break;
      case 'thu':
        courseCou2 = this.data5
        break;
      case 'fri':
        courseCou2 = this.data6
        break;
      case 'sat':
        courseCou2 = this.data7
        break;
    }

    for (let item of courseCou2) {
      let cou2 = {
        timeStart: parseISO(item.timeStart),
        timeEnd: parseISO(item.timeEnd),
      }

      if (this.isOverlap(cou1, cou2)) {
        return true
      }
    }

    return false
  }
  isOverlap = (cou1: any, cou2: any) => {
    const interval1 = {
      start: set(new Date(), {
        hours: cou1.timeStart.getHours(),
        minutes: cou1.timeStart.getMinutes(),
        seconds: cou1.timeStart.getSeconds(),
        milliseconds: cou1.timeStart.getMilliseconds()
      }),
      end: set(new Date(), {
        hours: cou1.timeEnd.getHours(),
        minutes: cou1.timeEnd.getMinutes(),
        seconds: cou1.timeEnd.getSeconds(),
        milliseconds: cou1.timeEnd.getMilliseconds()
      }),
    };

    const interval2 = {
      start: set(new Date(), {
        hours: cou2.timeStart.getHours(),
        minutes: cou2.timeStart.getMinutes(),
        seconds: cou2.timeStart.getSeconds(),
        milliseconds: cou2.timeStart.getMilliseconds()
      }),
      end: set(new Date(), {
        hours: cou2.timeEnd.getHours(),
        minutes: cou2.timeEnd.getMinutes(),
        seconds: cou2.timeEnd.getSeconds(),
        milliseconds: cou2.timeEnd.getMilliseconds()
      }),
    };

    const result = areIntervalsOverlapping(interval1, interval2)
    return result
  }

  onSubmit() {
    // alert('run')
    this.onClickValidate()
    if (!this.requestForm.invalid) {
      //  get form and special validate
      console.log(this.getForm())
      const semiData = this.getForm()
      let check1 = this.overlapTeacherCourseValidate(semiData.day1, semiData.timeStart1, semiData.timeEnd1)
      let check2 = this.overlapTeacherCourseValidate(semiData.day2, semiData.timeStart2, semiData.timeEnd2)
      if (!check1 && !check2) {
        const us = this.tokenServiceService.getUser()
        const event = new Date();
        const dateTime = event.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' }).split(', ');

        const send = {
          lecturerID: us.lecturerID,
          scheduleID: this.currentScheduleID,
          courseID: semiData.courseID,
          title: 'Change Time',
          content: 'Change New Time For course: ' + semiData.courseName,
          status: 'wait',
          time: semiData.day1 + '_' + semiData.timeStart1 + '-' + semiData.timeEnd1,
          time2: semiData.day2 + '_' + semiData.timeStart2 + '-' + semiData.timeEnd2,
          reason: semiData.reason,
          date: dateTime[1] + ' ' + dateTime[0],
          sender: this.getTeacher(us.lecturerID)
        }
        console.log('>>> >>>', send)

        this.requestServiceService.postRequest(send).subscribe({
          next: (result: any) => {
            if (result.status) {
              if (this.currentScheduleID) {
                this.toastr.success('Request Success')
                this.clearForm(true)
              }
            } else {
              this.toastr.success('Cant Send Request at the moment')
            }
          },
          error: (error: any) => {
            console.log(">> error >>", error)
            this.toastr.success('Cant Send Request at the moment')
          }
        })
      } else {
        let dayToast = check1 ? semiData.day1 : semiData.day2
        switch (dayToast) {
          case 'mon':
            dayToast = 'Monday'; break;
          case 'tue':
            dayToast = 'Tuesday'; break;
          case 'wed':
            dayToast = 'Wednesday'; break;
          case 'thu':
            dayToast = 'Thursday'; break;
          case 'fri':
            dayToast = 'Friday'; break;
          case 'sat':
            dayToast = 'Saturday'; break;
        }
        this.toastr.error(`Conflict with your course ${semiData.courseName} on ${dayToast}`)
      }

    }
  }
}
