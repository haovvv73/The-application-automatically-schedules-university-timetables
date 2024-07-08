import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../../component/popup/popup.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomServiceService } from '../../services/http/room-service/room-service.service';

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
  currentID : string = ''
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  constructor(private roomServiceService: RoomServiceService) { }

  ngOnInit(): void {
    this.roomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")]),
      capacity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      location: new FormControl('', [Validators.required,]),
      roomType: new FormControl('', [Validators.required,]),
      description: new FormControl('', [Validators.required, Validators.maxLength(254)])
    })

    this.getAll()
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
    this.currentID = ''
  }

  onClickValidate() {
    this.roomForm.get('roomName')?.markAsTouched()
    this.roomForm.get('capacity')?.markAsTouched()
    this.roomForm.get('location')?.markAsTouched()
    this.roomForm.get('roomType')?.markAsTouched()
    this.roomForm.get('description')?.markAsTouched()
  }

  columnsKey : any[] = [
    'STT',
    'room ID',
    'room Name',
    'capacity',
    'room Type',
    'location',
    'description',
    'Action'
  ]

  data : any[] = []

  // save
  saveRoom(data:any){
    this.roomServiceService.saveRoom(data).subscribe({
      next: (result: any) => {
        if(result.status){
          this.getAll()
          this.clearForm()
          this.popupComponent.onClosePopup()
        }else{
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
  updateRoom(data:any){
    this.roomServiceService.updateRoom(data).subscribe({
      next: (result: any) => {
        if(result.status){
          this.getAll()
          this.clearForm()
          this.popupComponent.onClosePopup()
        }else{
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
  getAll(){
    this.roomServiceService.getRoom().subscribe({
      next: (result: any) => {
        if(result.status){
          this.data = result.data
        }else{
          alert("Something wrong")
        }
      },
      error: (error: any) => {
        console.log(">> error >>", error)
        alert("Something wrong")
      }
    })
  }

  getDetail(id:string){
    this.roomServiceService.getRoomDetail(id).subscribe({
      next: (result: any) => {
        if(result.status){
          this.currentID = result.data[0].roomID
          this.roomForm.get('roomName')?.setValue(result.data[0].roomName)
          this.roomForm.get('capacity')?.setValue(result.data[0].capacity)
          this.roomForm.get('location')?.setValue(result.data[0].location)
          this.roomForm.get('roomType')?.setValue(result.data[0].roomType)
          this.roomForm.get('description')?.setValue(result.data[0].description)
          this.popupComponent.onOpenPopup()
        }else{
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
  deleteRoom(id:string){
    this.roomServiceService.deleteRoom(id).subscribe({
      next: (result: any) => {
        if(result.status){
          this.getAll()
        }else{
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
    if (!this.roomForm.invalid) {
      if(!this.currentID){
        this.saveRoom(this.getForm())
      }else if(this.currentID){
        let formData = this.getForm()
        const roomUpdate = {
          roomID : this.currentID,
          ...formData
        }
        
        this.updateRoom(roomUpdate)
      }
    }
  }
}
