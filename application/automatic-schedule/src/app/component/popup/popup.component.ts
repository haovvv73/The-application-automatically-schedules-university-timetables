import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() popupTitle = ''
  @Output() callbackWhenClose =  new EventEmitter<boolean>()
  openPopup = false

  onOpenPopup(){
    this.openPopup = true
    // console.log("hello");
    
  }

  onClosePopup(){
    this.openPopup = false
    this.callbackWhenClose.emit(true);
  }
}
