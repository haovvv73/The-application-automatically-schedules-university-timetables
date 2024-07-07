import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [NgFor,PopupComponent,NgIf, FormsModule, ReactiveFormsModule,],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
  host: {ngSkipHydration: 'true'},
})
export class LessonComponent {
  title = 'Subject Resource'
  subjectForm!: FormGroup

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      subject: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      duration: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      credit: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      subjectType: new FormControl('', [Validators.required,]),
      description: new FormControl('', [Validators.required, Validators.maxLength(254)])
    })
  }
  get subject() {
    return this.subjectForm.get('subject')
  }

  get duration() {
    return this.subjectForm.get('duration')
  }
  
  get credit() {
    return this.subjectForm.get('credit')
  }

  get subjectType() {
    return this.subjectForm.get('subjectType')
  }

  get description() {
    return this.subjectForm.get('description')
  }

  getForm() {
    return {
      subject: this.subjectForm.value.subject,
      duration: this.subjectForm.value.duration,
      credit: this.subjectForm.value.credit,
      subjectType: this.subjectForm.value.subjectType,
      description: this.subjectForm.value.description,
    }
  }

  clearForm() {
    this.subjectForm.get('subject')?.setValue('')
    this.subjectForm.get('duration')?.setValue('')
    this.subjectForm.get('credit')?.setValue('')
    this.subjectForm.get('subjectType')?.setValue('')
    this.subjectForm.get('description')?.setValue('')
  }

  onClickValidate() {
    this.subjectForm.get('subject')?.markAsTouched()
    this.subjectForm.get('duration')?.markAsTouched()
    this.subjectForm.get('credit')?.markAsTouched()
    this.subjectForm.get('subjectType')?.markAsTouched()
    this.subjectForm.get('description')?.markAsTouched()
  }

  onSubmit() {
    console.log('run');
    this.onClickValidate()
    if (!this.subjectForm.invalid) {
      console.log("🚀 ~ subjectForm ~ onSubmit ~ this.getForm():", this.getForm())
    }
  }


  columnsKey : any[] = [
    'STT',
    'Id',
    'Subject',
    'Credits',
    'Description',
    'Subject Type',
    'Duration',
    'Action'
  ]

  data : any[] = [
    {
      Id:'lesson1',
      Subject:'sinh',
      credit: '2',
      description: 'mon hoc lien quan toi moi truong va dong vat',
      subjectType: 'ly thuyet',
      duration: '4',
    },
    {
      Id:'lesson12',
      Subject:'toan',
      credit: '2',
      description: 'mon hoc lien quan toi moi truong va dong vat',
      subjectType: 'ly thuyet',
      duration: '4',
    },
  ]
}
