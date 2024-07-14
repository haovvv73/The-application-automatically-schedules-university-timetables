import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [NgClass,NgIf,NgFor],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.css'
})
export class ScheduleTableComponent implements OnChanges {
  @Input() dataCourse : any [] = []
  weekDay = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  courses : any[] = [
    // {
    //   className: 'xu ly bien hinh va xu ly anh',
    //   day: 'monday',
    //   timeStart: '9h',
    //   timeEnd: '10h',
    //   location: 'LT',
    //   room: 'E304',
    //   teacher:'vo tran gia haoooo'
    // },
  ]

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
}
