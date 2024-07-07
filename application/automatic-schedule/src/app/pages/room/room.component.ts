import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgFor,PopupComponent,NgIf, FormsModule, ReactiveFormsModule,],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  title = 'Room Resource'
  roomForm!: FormGroup

  ngOnInit(): void {
    this.roomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      capacity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      location: new FormControl('', [Validators.required,]),
      roomType: new FormControl('', [Validators.required,]),
      description: new FormControl('', [Validators.required, Validators.maxLength(254)])
    })
  }

  get roomName() {
    return this.roomForm.get('roomName')
  }

  get capacity() {
    return this.roomForm.get('capacity')
  }
  
  get location() {
    return this.roomForm.get('location')
  }

  get roomType() {
    return this.roomForm.get('roomType')
  }

  get description() {
    return this.roomForm.get('description')
  }

  getForm() {
    return {
      roomName: this.roomForm.value.roomName,
      capacity: this.roomForm.value.capacity,
      location: this.roomForm.value.location,
      roomType: this.roomForm.value.roomType,
      description: this.roomForm.value.description,
    }
  }

  clearForm() {
    this.roomForm.get('roomName')?.setValue('')
    this.roomForm.get('capacity')?.setValue('')
    this.roomForm.get('location')?.setValue('')
    this.roomForm.get('roomType')?.setValue('')
    this.roomForm.get('description')?.setValue('')
  }

  onClickValidate() {
    this.roomForm.get('roomName')?.markAsTouched()
    this.roomForm.get('capacity')?.markAsTouched()
    this.roomForm.get('location')?.markAsTouched()
    this.roomForm.get('roomType')?.markAsTouched()
    this.roomForm.get('description')?.markAsTouched()
  }

  onSubmit() {
    console.log('run');
    this.onClickValidate()
    if (!this.roomForm.invalid) {
      console.log("🚀 ~ RoomComponent ~ onSubmit ~ this.getForm():", this.getForm())
    }
  }

  columnsKey : any[] = [
    'STT',
    'Id',
    'Room',
    'Room Description',
    'Location',
    'Capacity',
    'Type',
    'Action'
  ]

  data : any[] = [
    {
      Id:'room001',
      room:'F023',
      roomDescription: 'Phong hoi truong',
      location: 'NVC',
      capacity: '150', 
      type: 'ly thuyet',
    },
    {
      Id:'room002',
      room:'F033',
      roomDescription: 'Phong may tinh',
      location: 'Linh Trung',
      capacity: '100', 
      type: 'thuc hanh',
    },
  ]
}
