import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [NgFor,PopupComponent,NgIf, FormsModule, ReactiveFormsModule,],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  title = 'Lecturer Resource'
  lecturerForm!: FormGroup
  ngOnInit(): void {
    this.lecturerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lecturerName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]),
      faculty: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9 ]+$")],),
      gender: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")],),
    })
  }

  get email() {
    return this.lecturerForm.get('email')
  }

  get password() {
    return this.lecturerForm.get('password')
  }

  get lecturerName() {
    return this.lecturerForm.get('lecturerName')
  }

  get faculty() {
    return this.lecturerForm.get('faculty')
  }

  get phone() {
    return this.lecturerForm.get('phone')
  }

  get birthday() {    
    return this.lecturerForm.get('birthday')
  }

  get address() {    
    return this.lecturerForm.get('address')
  }

  get gender() {    
    return this.lecturerForm.get('gender')
  }

  getForm() {
    return {
      email: this.lecturerForm.value.email,
      password: this.lecturerForm.value.password,
      lecturerName: this.lecturerForm.value.lecturerName,
      faculty: this.lecturerForm.value.faculty,
      phone: this.lecturerForm.value.phone,
      birthday: this.lecturerForm.value.birthday,
      address: this.lecturerForm.value.address,
      gender: this.lecturerForm.value.gender,
    }
  }

  clearForm() {
    this.lecturerForm.get('email')?.setValue('')
    this.lecturerForm.get('password')?.setValue('')
    this.lecturerForm.get('lecturerName')?.setValue('')
    this.lecturerForm.get('faculty')?.setValue('')
    this.lecturerForm.get('phone')?.setValue('')
    this.lecturerForm.get('birthday')?.setValue('')
    this.lecturerForm.get('address')?.setValue('')
    this.lecturerForm.get('gender')?.setValue('')
  }

  onClickValidate() {
    this.lecturerForm.get('email')?.markAsTouched()
    this.lecturerForm.get('password')?.markAsTouched()
    this.lecturerForm.get('lecturerName')?.markAsTouched()
    this.lecturerForm.get('faculty')?.markAsTouched()
    this.lecturerForm.get('phone')?.markAsTouched()
    this.lecturerForm.get('birthday')?.markAsTouched()
    this.lecturerForm.get('address')?.markAsTouched()
    this.lecturerForm.get('gender')?.markAsTouched()
  }

  onSubmit() {
    console.log('run');
    this.onClickValidate()
    if (!this.lecturerForm.invalid) {
      console.log("🚀 ~ RoomComponent ~ onSubmit ~ this.getForm():", this.getForm())
    }
  }

  columnsKey : any[] = [
    'STT',
    'Id',
    'Lecturer',
    'Gender',
    'Faculty',
    'Birthday',
    'Address',
    'Email',
    'Phone',
    'Action'
  ]

  data : any[] = [
    {
      Id:'Lecturer001',
      Lecturer:'nguyen van a',
      gender: 'male',
      faculty: 'Math',
      birthday: '20/01/2002', 
      address: 'lorem street',
      email: 'lorem@gmail.com',
      phone: '091234567',
    },
    {
      Id:'Lecturer002',
      Lecturer:'nguyen van b',
      gender: 'female',
      faculty: 'Algorithm',
      birthday: '20/01/2001', 
      address: 'lorem street',
      email: 'lorem2@gmail.com',
      phone: '091230567',
    },
  ]
}
