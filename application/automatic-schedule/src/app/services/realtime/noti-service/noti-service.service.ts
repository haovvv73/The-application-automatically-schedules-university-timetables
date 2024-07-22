import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotiServiceService {
  private socket: any;
  isUserConnect = false
  isAdminConnect = false
  private url = 'http://localhost:4133'; // Your server URL
  public message: Subject<any> = new Subject<any>();
  public messageAdmin: Subject<any> = new Subject<any>();

  constructor() {
    this.socket = io(this.url);

    this.socket.on('notification', (data: any) => {
      this.message.next(data);
    });

    this.socket.on('notification-admin', (data: any) => {
      this.message.next(data);
    });
  }

  register(lecID: string) {
    if( !this.isUserConnect ){
      this.socket.emit('register', lecID);
      this.isUserConnect = true
    }else{
      console.log('user connected');
    }
  }

  registerAdmin(accID: string) {
    if( !this.isAdminConnect ){
      this.socket.emit('register-admin', accID);
      this.isAdminConnect = true
    }else{
      console.log('admin connected');
    }
  }
}
