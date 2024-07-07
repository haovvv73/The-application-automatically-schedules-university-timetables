import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgStyle } from '@angular/common';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf, NgStyle],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  envUrl = EnvUrl
  registerForm!: FormGroup

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
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
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get lecturerName() {
    return this.registerForm.get('lecturerName')
  }

  get faculty() {
    return this.registerForm.get('faculty')
  }

  get phone() {
    return this.registerForm.get('phone')
  }

  get birthday() {    
    return this.registerForm.get('birthday')
  }

  get address() {    
    return this.registerForm.get('address')
  }

  get gender() {    
    return this.registerForm.get('gender')
  }

  getForm() {
    return {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      lecturerName: this.registerForm.value.lecturerName,
      faculty: this.registerForm.value.faculty,
      phone: this.registerForm.value.phone,
      birthday: this.registerForm.value.birthday,
      address: this.registerForm.value.address,
      gender: this.registerForm.value.gender,
    }
  }

  clearForm() {
    this.registerForm.get('email')?.setValue('')
    this.registerForm.get('password')?.setValue('')
    this.registerForm.get('lecturerName')?.setValue('')
    this.registerForm.get('faculty')?.setValue('')
    this.registerForm.get('phone')?.setValue('')
    this.registerForm.get('birthday')?.setValue('')
    this.registerForm.get('address')?.setValue('')
    this.registerForm.get('gender')?.setValue('')
  }

  onClickValidate() {
    this.registerForm.get('email')?.markAsTouched()
    this.registerForm.get('password')?.markAsTouched()
    this.registerForm.get('lecturerName')?.markAsTouched()
    this.registerForm.get('faculty')?.markAsTouched()
    this.registerForm.get('phone')?.markAsTouched()
    this.registerForm.get('birthday')?.markAsTouched()
    this.registerForm.get('address')?.markAsTouched()
    this.registerForm.get('gender')?.markAsTouched()
  }

  onSubmit() {
    this.onClickValidate()
    if (!this.registerForm.invalid) {
      console.log(this.getForm())
      this.authService.register(this.getForm()).subscribe({
        next: (result: any) => {
          console.log(">> result >> ", result);
          if (result.status) {
            this.router.navigate([this.envUrl.schedule_user])
          } else {
            alert("Register failed")
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
