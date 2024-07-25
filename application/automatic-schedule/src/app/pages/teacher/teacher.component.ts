import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LecturerServiceService } from '../../services/http/lecturer-service/lecturer-service.service';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [NgFor, PopupComponent, NgIf, FormsModule, ReactiveFormsModule,],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  title = 'Lecturer Resource'
  lecturerForm!: FormGroup
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;
  currentID: string = ''

  constructor(private lecturerServiceService: LecturerServiceService) { }

  ngOnInit(): void {
    this.lecturerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lecturerName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]),
      faculty: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")],),
      gender: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")],),
    })

    this.getAll()
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

  clearForm(success: boolean) {
    if (success) {
      this.lecturerForm.get('email')?.setValue('')
      this.lecturerForm.get('password')?.setValue('')
      this.lecturerForm.get('lecturerName')?.setValue('')
      this.lecturerForm.get('faculty')?.setValue('')
      this.lecturerForm.get('phone')?.setValue('')
      this.lecturerForm.get('birthday')?.setValue('')
      this.lecturerForm.get('address')?.setValue('')
      this.lecturerForm.get('gender')?.setValue('')
    }
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

  columnsKey: any[] = [
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

  data: any[] = []
  dataBackup: any[] = []

  // save
  saveLecturer(data: any) {
    this.lecturerServiceService.saveLecturer(data).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.getAll()
          this.clearForm(true)
          this.popupComponent.onClosePopup()
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

  // update
  updateLecturer(data: any) {
    this.lecturerServiceService.updateLecturer(data).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.getAll()
          this.clearForm(true)
          this.popupComponent.onClosePopup()
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

  // get
  getAll() {
    this.lecturerServiceService.getLecturer().subscribe({
      next: (result: any) => {
        if (result.status) {
          this.data = result.data
          this.dataBackup = result.data
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

  getDetail(id: string) {
    this.lecturerServiceService.getLecturerDetail(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.currentID = result.data[0].lecturerID
          this.lecturerForm.get('email')?.setValue(result.data[0].email)
          this.lecturerForm.get('password')?.setValue('000000000000')
          this.lecturerForm.get('lecturerName')?.setValue(result.data[0].lecturerName)
          this.lecturerForm.get('faculty')?.setValue(result.data[0].faculty)
          this.lecturerForm.get('phone')?.setValue(result.data[0].phone)
          this.lecturerForm.get('birthday')?.setValue(result.data[0].birthday)
          this.lecturerForm.get('address')?.setValue(result.data[0].address)
          this.lecturerForm.get('gender')?.setValue(result.data[0].gender)
          this.popupComponent.onOpenPopup()
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

  // delete
  deleteRoom(id: string) {
    this.lecturerServiceService.deleteLecturer(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.getAll()
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

  onSubmit() {
    this.onClickValidate()
    if (!this.lecturerForm.invalid) {
      if (!this.currentID) {
        this.saveLecturer(this.getForm())
      } else if (this.currentID) {
        let formData = this.getForm()
        const lecturerUpdate = {
          lecturerID: this.currentID,
          ...formData
        }

        this.updateLecturer(lecturerUpdate)
      }
    }
  }

  // search
  onSearch(text : string){
    console.log("text",text);
    this.data = this.dataBackup.filter(item => item.lecturerName.toLowerCase().includes(text.toLowerCase().trim()) )
  }

}
