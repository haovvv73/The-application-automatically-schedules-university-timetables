import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-schedule-generate',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf, PopupComponent, NgClass],
  templateUrl: './schedule-generate.component.html',
  styleUrl: './schedule-generate.component.css'
})
export class ScheduleGenerateComponent implements OnInit {
  titlePage = 'Schedule Generate'
  scheduleForm!: FormGroup
  courseForm!: FormGroup
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  // key data show
  columnsKeyRoom: any[] = [
    ' ',
    'Id',
    'Room',
    'Room Description',
    'Location',
    'Capacity',
    'Type',
    // 'Action'
  ]

  columnsKeySubject: any[] = [
    ' ',
    'Subject',
    'Credits',
    'Description',
    'Subject-Type',
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
  dataTeacher: any[] = [
    {
      Id: 'teacher001',
      teacher: 'nguyen van a',
      gender: 'male',
      faculty: 'Math',
      birthday: '20/01/2002',
      address: 'lorem street',
      email: 'lorem@gmail.com',
      phone: '091234567',
    },
    {
      Id: 'teacher002',
      teacher: 'nguyen van b',
      gender: 'female',
      faculty: 'Algorithm',
      birthday: '20/01/2001',
      address: 'lorem street',
      email: 'lorem2@gmail.com',
      phone: '091230567',
    },
  ]

  dataRoom: any[] = [
    {
      Id: 'room001',
      room: 'F023',
      roomDescription: 'Phong hoi truong',
      location: 'NVC',
      capacity: '150',
      type: 'ly thuyet',
    },
    {
      Id: 'room002',
      room: 'F033',
      roomDescription: 'Phong may tinh',
      location: 'Linh Trung',
      capacity: '100',
      type: 'thuc hanh',
    },

  ]

  dataSubject: any[] = [
    {
      Id: 'lesson1',
      subject: 'sinh',
      description: 'mon hoc lien quan toi moi truong va dong vat',
      duration: '4',
      credits: '3',
      subjectType: 'ly thuyet',
    },
    {
      Id: 'lesson12',
      subject: 'toan',
      description: 'hieu kien thuc toan dai so',
      duration: '3',
      credits: '2',
      subjectType: 'ly thuyet',
    }
  ]

  // data generate
  indexCourse : number | undefined
  dataCourse: any[] = [
    {
      className: 'Toan Roi Rac',
      coHort: 'K20',
      classSize: '125',
      location: 'Linh Trung',
      subjectID: 'lesson1',
      teacherID: ['teacher001', 'teacher002']
    },
    {
      className: 'Toan Roi Rac',
      coHort: 'K20',
      classSize: '125',
      location: 'Linh Trung',
      subjectID: 'lesson1',
      teacherID: []
    }
  ]
  dataRoomSelect: any[] = []

  getTeacher(Id: string) {
    let teacher = this.dataTeacher.find(teacher => teacher.Id == Id)
    if (teacher) return teacher.teacher
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
      classSize: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      subjectID: new FormControl('', [Validators.required]),
    })
  }

  // scheduleForm
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

  // courseForm
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

  getCourseForm() {
    return {
      className: this.courseForm.value.className,
      coHort: this.courseForm.value.coHort,
      classSize: this.courseForm.value.classSize,
      location: this.courseForm.value.location,
      subjectID: this.courseForm.value.subjectID,
    }
  }

  clearCourseForm( success : boolean) 
  { 
    if(success){
      this.courseForm.get('className')?.setValue('')    
      this.courseForm.get('coHort')?.setValue('')
      this.courseForm.get('classSize')?.setValue('')
      this.courseForm.get('subjectID')?.setValue('')
      this.courseForm.get('location')?.setValue('')
    }
  }

  onClickValidateCourseForm() {
    this.courseForm.get('className')?.markAsTouched()
    this.courseForm.get('coHort')?.markAsTouched()
    this.courseForm.get('classSize')?.markAsTouched()
    this.courseForm.get('subjectID')?.markAsTouched()
    this.courseForm.get('location')?.markAsTouched()
  }

  // room function  
  onSelectRoom(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      let roomSelect = this.dataRoom.find(item => item.Id == id)
      if (roomSelect) {
        this.dataRoomSelect.push(roomSelect)
      }
    } else {
      this.dataRoomSelect = this.dataRoomSelect.filter(item => item.Id != id)
    }
  }

  onUnselectRoom(id: string) {
    this.dataRoomSelect = this.dataRoomSelect.filter(item => item.Id != id)
  }

  onRoomChecked(id: string) {
    let roomSelect = this.dataRoomSelect.find(item => item.Id == id)
    if (roomSelect) {
      return true
    } else {
      return false
    }
  }

  // subject function
  onSelectSubject(id: string) {
    let subject = this.dataSubject.find(item => item.Id == id)
    if(subject){
      this.courseForm.get('subjectID')?.setValue(subject.Id)
      this.courseForm.get('className')?.setValue(subject.subject)
    }
  }

  // teacher function
  onSelectTeacher(id: string) {
    if(this.indexCourse){
      const teacherList =this.dataCourse[this.indexCourse].teacherID
      const result =teacherList.find( (Id: string) => Id === id)
      if(!result){
        this.dataCourse[this.indexCourse].teacherID.push(id)
      }
    }
  }

  onTeacherChecked(id: string) {
    if(!this.indexCourse) return false
    const teacherList =this.dataCourse[this.indexCourse].teacherID
    const result =teacherList.find( (Id: string) => Id === id)
    if (result) {
      return true
    } else {
      return false
    }
  }

  onUnSelectTeacher(){
    if(this.indexCourse){
      this.dataCourse[this.indexCourse].teacherID = []
    }
  }

  // course function
  onSaveIndex(index : number){
    this.indexCourse = index
  }

  onSaveCourse() {
    this.onClickValidateCourseForm()
    if(!this.courseForm.invalid){
      const newCourse = this.getCourseForm();
      this.dataCourse.push({
        teacherID : [],
        ...newCourse
      })
      // close popup
      this.clearCourseForm(true)
      this.popupComponent.onClosePopup()
    }
  }

  onGenerate() {


  }
}
