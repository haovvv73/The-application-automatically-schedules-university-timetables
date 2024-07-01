import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-schedule-generate',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf, PopupComponent],
  templateUrl: './schedule-generate.component.html',
  styleUrl: './schedule-generate.component.css'
})
export class ScheduleGenerateComponent implements OnInit {
  titlePage = 'Schedule Generate'
  scheduleForm!: FormGroup

  columnsKeyRoom: any[] = [
    ' ',
    'Id',
    'Room',
    'Room Description',
    'Location',
    'Capacity',
    'Type',
    'Action'
  ]

  columnsKeyCourse : any[] = [
    ' ',
    'Lesson',
    'Duration',
    'Type',
    'location',
    'Action'
  ]

  columnsKeyTeacher : any[] = [
    ' ',
    'Teacher',
    'Gender',
    'Falculty',
    'Email',
    'Action'
  ]

  dataTeacher : any[] = [
    {
      Id:'teacher001',
      Teacher:'nguyen van a',
      Gender: 'male',
      Falculty: 'Math',
      Birthday: '20/01/2002', 
      Address: 'lorem street',
      Email: 'lorem@gmail.com',
      Phone: '091234567',
    },
    {
      Id:'teacher002',
      Teacher:'nguyen van b',
      Gender: 'female',
      Falculty: 'Alogorythm',
      Birthday: '20/01/2001', 
      Address: 'lorem street',
      Email: 'lorem2@gmail.com',
      Phone: '091230567',
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

  dataCourse : any[] = [
    {
      Id:'lesson1',
      lesson:'sinh',
      lessonDescription: 'mon hoc lien quan toi moi truong va dong vat',
      duration: '4',
      location: 'L.Trung',
      type: 'ly thuyet',
    },
    {
      Id:'lesson12',
      lesson:'toan',
      lessonDescription: 'hieu kien thuc toan dai so',
      duration: '3',
      location: 'NVC',
      type: 'ly thuyet',
    },
  ]

  dataRoomSelect : any[] = []

  ngOnInit(): void {
    this.scheduleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      semester: new FormControl('', [Validators.required]),
      yearStart: new FormControl('', [Validators.required]),
      yearEnd: new FormControl('', [Validators.required]),
    })
  }

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

  getForm() {
    return {
      title: this.scheduleForm.value.title,
      semester: this.scheduleForm.value.semester,
      yearStart: this.scheduleForm.value.yearStart,
      yearEnd: this.scheduleForm.value.yearEnd,
    }
  }

  clearForm() {
    this.scheduleForm.get('title')?.setValue('')
    this.scheduleForm.get('semester')?.setValue('')
    this.scheduleForm.get('yearStart')?.setValue('')
    this.scheduleForm.get('yearEnd')?.setValue('')
  }

  onClickValidate() {
    this.scheduleForm.get('title')?.markAsTouched()
    this.scheduleForm.get('semester')?.markAsTouched()
    this.scheduleForm.get('yearStart')?.markAsTouched()
    this.scheduleForm.get('yearEnd')?.markAsTouched()
  }

  onCheckboxChange(event: Event, id:string){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      let roomSelect = this.dataRoom.find(item => item.Id == id)
      if(roomSelect){
        this.dataRoomSelect.push(roomSelect)
      }
    }else{
      this.dataRoomSelect = this.dataRoomSelect.filter(item => item.Id != id)
    }
  }

  onUnselectRoom(id:string){
    this.dataRoomSelect = this.dataRoomSelect.filter(item => item.Id != id)
  }

  onChecked(id:string){
    let roomSelect = this.dataRoomSelect.find(item => item.Id == id)
    if(roomSelect){
      return true
    }else{
      return false
    }
  }

  onGenerate() {
    this.onClickValidate()

  }
}
