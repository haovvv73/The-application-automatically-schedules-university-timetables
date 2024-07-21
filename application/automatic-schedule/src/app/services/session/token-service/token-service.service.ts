import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('MWuEaV33X9');
  }

  setToken(token: string): void {
    localStorage.setItem('MWuEaV33X9', token);
  }

  removeToken(): void {
    localStorage.removeItem('MWuEaV33X9');
  }

  setUser(user : any): void{
    localStorage.setItem('hF9ExNMjn7', JSON.stringify(user));
  }

  getUser(): any | null{
    const result = localStorage.getItem('hF9ExNMjn7');
    if(!result) return null
    return JSON.parse(result)
  }

  removeUser(): void {
    localStorage.removeItem('hF9ExNMjn7');
  }
}
