import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EnvUrl } from '../../env-url';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  envUrl = EnvUrl
  loginForm!: FormGroup

  constructor(
    private authService: AuthServiceService,
     private router: Router,
     private tokenServiceService : TokenServiceService,
     private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  getForm() {
    return {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
  }

  clearForm() {
    this.loginForm.get('email')?.setValue('')
    this.loginForm.get('password')?.setValue('')
  }

  onClickValidate() {
    this.loginForm.get('email')?.markAsTouched()
    this.loginForm.get('password')?.markAsTouched()
  }

  onSubmit() {
    this.onClickValidate()
    if (!this.loginForm.invalid) {
      const user = this.getForm()

      this.authService.login(this.getForm()).subscribe({
        next: (result: any) => {
          console.log(">> result >> ", result);
          if(result.status){
              // console.log(result.data);
              this.tokenServiceService.setToken(result.data)
              this.toastr.success("login success")
              this.router.navigate([this.envUrl.schedule_admin])
          }else{
            this.toastr.error("login failed")
          }
        },
        error: (error: any) => {
          console.log(">> error >>", error)
          this.toastr.error("login failed")
        }
      })
    }
  }
}
