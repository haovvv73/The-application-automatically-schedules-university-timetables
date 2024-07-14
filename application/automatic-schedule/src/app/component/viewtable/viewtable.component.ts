import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-viewtable',
  standalone: true,
  imports: [NgIf,NgFor,NgClass,RouterLink],
  templateUrl: './viewtable.component.html',
  styleUrl: './viewtable.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ViewtableComponent {
  // PROPERTY
  openViewtable = false
  @Input() dataCourse : any [] = []
  weekDay = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  courses : any[] = []

  ngOnChanges(changes: SimpleChanges): void {
    this.courses = changes['dataCourse'].currentValue
    // console.log(this.courses);
  }

  formatTimeHourMinute(time: any) {
    return format(time, 'HH:mm');
  }

  slicePatternWithComma(text : string, comma:string){
    const words = text.split(comma)
    return words
  }

  // METHOD
  onCloseViewtable(){
    this.openViewtable = false
  }

  onOpenViewtable(){
    this.openViewtable = true    
  }
}
