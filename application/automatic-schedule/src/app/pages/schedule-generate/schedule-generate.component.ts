import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { PopupComponent } from '../../component/popup/popup.component';
import { SubjectServiceService } from '../../services/http/subject-service/subject-service.service';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';
import { ScheduleServiceService } from '../../services/http/schedule-service/schedule-service.service';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';
import { ScheduleTableComponent } from '../../component/schedule-table/schedule-table.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EnvUrl } from '../../env-url';

@Component({
  selector: 'app-schedule-generate',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf, PopupComponent, NgClass, ScheduleTableComponent],
  templateUrl: './schedule-generate.component.html',
  styleUrl: './schedule-generate.component.css'
})
export class ScheduleGenerateComponent implements OnInit {
  envUrl = EnvUrl
  titlePage = 'Schedule Generate'
  scheduleForm!: FormGroup
  courseForm!: FormGroup
  roomConflictMode = false
  courseConflictMode = false
  scheduleBeforeSave = false
  isTableView = false
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  constructor(
    private subjectServiceService: SubjectServiceService,
    private lecturerServiceService: LecturerServiceService,
    private scheduleServiceService: ScheduleServiceService,
    private roomServiceService: RoomServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  // key data show
  columnsKeyRoom: any[] = [
    ' ',
    'room ID',
    'room Name',
    'Room Description',
    'Location',
    'Capacity',
    'room Type',
    // 'Action'
  ]
  columnsKeySubject: any[] = [
    ' ',
    'subject Name',
    'Credits',
    'Description',
    'Duration'
  ]
  columnsKeyTeacher: any[] = [
    ' ',
    'Id',
    'Teacher',
    'Gender',
    'Faculty',
    'Birthday',
    'Address',
    'Email',
    'Phone',
  ]

  // data show
  dataTeacher: any[] = []
  dataSubject: any[] = []
  dataRoom: any[] = []
  courseMissing: any[] = []
  courseMissingMessage: any[] = []
  dataCourseBeforeSave = {
    mon: [] as any[],
    tue: [] as any[],
    wed: [] as any[],
    thu: [] as any[],
    fri: [] as any[],
    sat: [] as any[],
  }
  dataCourseBeforeSaveTable: any[] = []

  // data generate
  indexCourse: number | undefined
  dataCourse: any[] = []
  dataRoomSelect: any[] = []

  getTeacher(Id: string) {
    let teacher = this.dataTeacher.find(teacher => teacher.lecturerID == Id)
    if (teacher) return teacher.lecturerName
    return "_null_"
  }

  ngOnInit(): void {
    this.scheduleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      semester: new FormControl('', [Validators.required]),
      yearStart: new FormControl('', [Validators.required]),
      yearEnd: new FormControl('', [Validators.required]),
    })

    this.courseForm = new FormGroup({
      className: new FormControl('', [Validators.required]),
      coHort: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      classSize: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      location: new FormControl('', [Validators.required]),
      subjectID: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    })
  }

  // scheduleForm >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  get title() {
    return this.scheduleForm.get('title')
  }

  get semester() {
    return this.scheduleForm.get('semester')
  }

  get yearStart() {
    return this.scheduleForm.get('yearStart')
  }

  get yearEnd() {
    return this.scheduleForm.get('yearEnd')
  }

  getScheduleForm() {
    return {
      title: this.scheduleForm.value.title,
      semester: this.scheduleForm.value.semester,
      yearStart: this.scheduleForm.value.yearStart,
      yearEnd: this.scheduleForm.value.yearEnd,
    }
  }

  clearScheduleForm() {
    this.scheduleForm.get('title')?.setValue('')
    this.scheduleForm.get('semester')?.setValue('')
    this.scheduleForm.get('yearStart')?.setValue('')
    this.scheduleForm.get('yearEnd')?.setValue('')
  }

  onClickValidateScheduleForm() {
    this.scheduleForm.get('className')?.markAsTouched()
    this.scheduleForm.get('coHort')?.markAsTouched()
    this.scheduleForm.get('yearStart')?.markAsTouched()
    this.scheduleForm.get('yearEnd')?.markAsTouched()
  }

  // courseForm >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  get className() {
    return this.courseForm.get('className')
  }

  get coHort() {
    return this.courseForm.get('coHort')
  }

  get classSize() {
    return this.courseForm.get('classSize')
  }

  get location() {
    return this.courseForm.get('location')
  }

  get subjectID() {
    return this.courseForm.get('subjectID')
  }

  get type() {
    return this.courseForm.get('type')
  }

  getCourseForm() {
    return {
      className: this.courseForm.value.className,
      coHort: this.courseForm.value.coHort,
      classSize: this.courseForm.value.classSize,
      location: this.courseForm.value.location,
      subjectID: this.courseForm.value.subjectID,
      type: this.courseForm.value.type,
    }
  }

  clearCourseForm(success: boolean) {
    if (success) {
      this.courseForm.get('className')?.setValue('')
      this.courseForm.get('coHort')?.setValue('')
      this.courseForm.get('classSize')?.setValue('')
      this.courseForm.get('subjectID')?.setValue('')
      this.courseForm.get('location')?.setValue('')
      this.courseForm.get('type')?.setValue('')
    }
  }

  onClickValidateCourseForm() {
    this.courseForm.get('className')?.markAsTouched()
    this.courseForm.get('coHort')?.markAsTouched()
    this.courseForm.get('classSize')?.markAsTouched()
    this.courseForm.get('subjectID')?.markAsTouched()
    this.courseForm.get('location')?.markAsTouched()
    this.courseForm.get('type')?.markAsTouched()
  }

  // room function  
  onSelectRoom(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      let roomSelect = this.dataRoom.find(item => item.roomID == id)
      if (roomSelect) {
        this.dataRoomSelect.push(roomSelect)
      }
    } else {
      this.dataRoomSelect = this.dataRoomSelect.filter(item => item.roomID != id)
    }
  }

  onUnselectRoom(id: string) {
    this.dataRoomSelect = this.dataRoomSelect.filter(item => item.roomID != id)
  }

  onRoomChecked(id: string) {
    let roomSelect = this.dataRoomSelect.find(item => item.roomID == id)
    if (roomSelect) {
      return true
    } else {
      return false
    }
  }

  getRoomName(id:string){
    let roomFind = this.dataRoomSelect.find(r => r.roomID == id)
    if (roomFind) return roomFind.roomName
    return '_null_'
  }
  // subjectName function
  onSelectSubject(id: string) {
    let subject = this.dataSubject.find(item => item.subjectID == id)
    if (subject) {
      this.courseForm.get('subjectID')?.setValue(subject.subjectID)
      this.courseForm.get('className')?.setValue(subject.subjectName)
    }
  }

  // teacher function
  onSelectTeacher(id: string) {
    if (this.indexCourse || this.indexCourse == 0) {
      const teacherList = this.dataCourse[this.indexCourse].lecturerID
      const result = teacherList.find((Id: string) => Id === id)
      if (!result) {
        this.dataCourse[this.indexCourse].lecturerID.push(id)
      } else {
        this.dataCourse[this.indexCourse].lecturerID = this.dataCourse[this.indexCourse].lecturerID.filter((Id: string) => Id != id)
      }
    }
  }

  onTeacherChecked(id: string) {
    if (this.indexCourse == undefined) return false
    const teacherList = this.dataCourse[this.indexCourse].lecturerID
    const result = teacherList.find((Id: string) => Id == id)
    if (result) {
      return true
    } else {
      return false
    }
  }

  onUnSelectTeacher() {
    if (this.indexCourse != undefined) {
      this.dataCourse[this.indexCourse].lecturerID = []
    }
  }

  // course function
  onSaveIndex(index: number | undefined) {
    this.indexCourse = index
  }

  onSaveCourse() {
    this.onClickValidateCourseForm()
    if (!this.courseForm.invalid) {
      const newCourse = this.getCourseForm();

      if (this.indexCourse != undefined) {
        this.dataCourse[this.indexCourse] = {
          lecturerID: this.dataCourse[this.indexCourse].lecturerID,
          ...newCourse
        }
      } else {
        this.dataCourse.push({
          lecturerID: [],
          ...newCourse
        })
      }

      // close popup
      this.clearCourseForm(true)
      this.popupComponent.onClosePopup()
    }
  }

  deleteCourse(ind: any) {
    this.dataCourse = this.dataCourse.filter((item, index) => index != ind)
    this.onSaveIndex(undefined)
  }

  viewCourse(ind: number) {
    const courseFound = this.dataCourse.find((item, index) => index == ind)

    this.courseForm.get('className')?.setValue(courseFound.className)
    this.courseForm.get('coHort')?.setValue(courseFound.coHort)
    this.courseForm.get('classSize')?.setValue(courseFound.classSize)
    this.courseForm.get('subjectID')?.setValue(courseFound.subjectID)
    this.courseForm.get('location')?.setValue(courseFound.location)
    this.courseForm.get('type')?.setValue(courseFound.type)
  }

  // CRUD
  getSubject() {
    this.subjectServiceService.getSubject().subscribe({
      next: (result: any) => {
        if (result.status) {
          this.dataSubject = result.data
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

  // navigate
  rollback() {
    this.roomConflictMode = false
    this.courseConflictMode = false
    this.scheduleBeforeSave = false
  }

  goRoomConflict() {
    this.roomConflictMode = true
    this.courseConflictMode = false
    this.scheduleBeforeSave = false
  }

  goCourseConflict() {
    this.roomConflictMode = false
    this.courseConflictMode = true
    this.scheduleBeforeSave = false
  }

  goScheduleBeforeUpdate() {
    this.roomConflictMode = false
    this.courseConflictMode = false
    this.scheduleBeforeSave = true
  }

  // schedule table 
  onTableView() {
    this.isTableView = true
  }

  offTableView() {
    this.isTableView = false
  }

  bindingScheduleTable(data: any) {
    const mockData = []
    // dataRoomSelect_roomID
    for (let key in data) {
      for (let item of data[key]) {
        let obj = {
          className: item.className,
          day: item.day,
          timeStart: item.timeStart,
          timeEnd: item.timeEnd,
          location: item.location,
          room: '',
          teacher: ''
        }
        let roomFind = this.dataRoomSelect.find(r => r.roomID == item.roomID)
        if (roomFind) obj.room = roomFind.roomName

        for(let id of item.lecturerID){
          let name = this.getTeacher(id)
          if(obj.teacher.length > 0){
            obj.teacher += (',' + name)
          }else{
            obj.teacher += name
          }
        }
        mockData.push(obj)
      }
    }

    this.dataCourseBeforeSaveTable = mockData
  }

  // time
  formatTimeHourMinute(time: any) {
    return format(time, 'HH:mm');
  }

  onGenerate() {
    this.onClickValidateScheduleForm()
    if (!this.scheduleForm.invalid) {
      // prepare data
      let dataPost = {
        course: [...this.dataCourse],
        schedule: this.getScheduleForm(),
        room: this.dataRoomSelect,
      }

      // validate course
      let checkRoom = dataPost.room.length > 0
      let checkCourse = dataPost.course.length > 0 ? true : false
      for (let cou of dataPost.course) {
        if (cou.lecturerID.length < 1) {
          checkCourse = false
          break
        }
      }

      if (dataPost.course.length < 1) {
        alert('Missing Course !')
      } else if (!checkCourse && dataPost.course.length > 0) {
        alert('Course missing lecturer, fill in please!')
      } else if (!checkRoom) {
        alert('Schedule missing room, fill in please!')
      }

      if (checkCourse && checkRoom) {
        this.scheduleServiceService.saveSchedule(dataPost).subscribe({
          next: (result: any) => {
            if (result.status) {
              // clear data
              // this.clearScheduleForm()
              // this.dataCourse = []
              // this.dataRoomSelect = []

              if (result.data) {
                console.log(result.data);
                const objJson = result.data

                // check conflict
                if (objJson.courseMissing.length > 0) {
                  this.courseMissing = [...objJson.courseMissing]
                  this.toastr.error("Schedule conflict")
                  this.goCourseConflict()
                } else if (objJson.courseMissingRoom.length > 0) {
                  // courseMissingMessage
                  let arr = []
                  for (let msg in objJson.roomMessage) arr.push(objJson.roomMessage[msg])
                  this.courseMissingMessage = arr
                  this.toastr.error("Schedule conflict")
                  this.goRoomConflict()
                } else {
                  this.dataCourseBeforeSave = objJson.scheduleGenerate
                  this.bindingScheduleTable(objJson.scheduleGenerate)
                  this.toastr.success("Generate Schedule success")
                  this.goScheduleBeforeUpdate()
                }

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
    }
  }

  onSaveSchedule() {
    const course = [
      ...this.dataCourseBeforeSave.mon,
      ...this.dataCourseBeforeSave.tue,
      ...this.dataCourseBeforeSave.wed,
      ...this.dataCourseBeforeSave.thu,
      ...this.dataCourseBeforeSave.fri,
      ...this.dataCourseBeforeSave.sat,
    ]
    const data = {
      schedule: this.getScheduleForm(),
      course
    }
    console.log("asdadasdsad >>>><<<",data);
    
    this.scheduleServiceService.continueSchedule(data).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.toastr.success(result.message)
          setTimeout(()=>{
            this.router.navigate([this.envUrl.schedule_admin])
          },1000)
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
