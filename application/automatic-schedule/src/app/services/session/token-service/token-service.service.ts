import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  user2 : any = {}
  token : any = ''
  constructor() {

  }

  getToken(): string | null {
    return this.token
  }

  setToken(token: string): void {
    this.token = token;
  }

  removeToken(): void {
    this.token = ''
  }

  setUser(user: any): void {
    this.user2 = user
  }

  getUser(): any | null {
    return this.user2
  }

  removeUser(): void {
    this.user2 = {}
  }
}
