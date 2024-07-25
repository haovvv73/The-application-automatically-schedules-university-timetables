import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectServiceService } from '../../services/http/subject-service/subject-service.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [NgFor, PopupComponent, NgIf, FormsModule, ReactiveFormsModule,],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
  host: { ngSkipHydration: 'true' },
})
export class LessonComponent {
  title = 'Subject Resource'
  subjectForm!: FormGroup
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;
  currentID: string = ''

  constructor(private subjectServiceService: SubjectServiceService) { }

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      subjectName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      duration: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      credit: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      description: new FormControl('', [Validators.required, Validators.maxLength(254)])
    })

    this.getAll()
  }
  get subjectName() {
    return this.subjectForm.get('subjectName')
  }

  get duration() {
    return this.subjectForm.get('duration')
  }

  get credit() {
    return this.subjectForm.get('credit')
  }

  get description() {
    return this.subjectForm.get('description')
  }

  getForm() {
    return {
      subjectName: this.subjectForm.value.subjectName,
      duration: this.subjectForm.value.duration,
      credit: this.subjectForm.value.credit,
      description: this.subjectForm.value.description,
    }
  }

  clearForm(success : boolean) {
    if(success){
      this.subjectForm.get('subjectName')?.setValue('')
      this.subjectForm.get('duration')?.setValue('')
      this.subjectForm.get('credit')?.setValue('')
      this.subjectForm.get('description')?.setValue('')
    }
  }

  onClickValidate() {
    this.subjectForm.get('subjectName')?.markAsTouched()
    this.subjectForm.get('duration')?.markAsTouched()
    this.subjectForm.get('credit')?.markAsTouched()
    this.subjectForm.get('description')?.markAsTouched()
  }

  columnsKey: any[] = [
    'STT',
    'Id',
    'Subject',
    'Credits',
    'Description',
    'Duration',
    'Action'
  ]

  data: any[] = []
  dataBackup: any[] = []

  // save
  saveSubject(data: any) {
    this.subjectServiceService.saveSubject(data).subscribe({
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
  updateSubject(data: any) {
    this.subjectServiceService.updateSubject(data).subscribe({
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
    this.subjectServiceService.getSubject().subscribe({
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
    this.subjectServiceService.getSubjectDetail(id).subscribe({
      next: (result: any) => {
        if (result.status) {
          this.currentID = result.data[0].subjectID
          this.subjectForm.get('subjectName')?.setValue(result.data[0].subjectName)
          this.subjectForm.get('duration')?.setValue(result.data[0].duration)
          this.subjectForm.get('credit')?.setValue(result.data[0].credit)
          this.subjectForm.get('description')?.setValue(result.data[0].description)
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
    this.subjectServiceService.deleteSubject(id).subscribe({
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
    if (!this.subjectForm.invalid) {
      if (!this.currentID) {
        this.saveSubject(this.getForm())

      } else if (this.currentID) {
        let formData = this.getForm()
        const subjectUpdate = {
          subjectID: this.currentID,
          ...formData
        }

        this.updateSubject(subjectUpdate)
      }
    }
  }

  // search
  onSearch(text : string){
    console.log("text",text);
    this.data = this.dataBackup.filter(item => item.subjectName.toLowerCase().includes(text.toLowerCase().trim()) )
  }

}
