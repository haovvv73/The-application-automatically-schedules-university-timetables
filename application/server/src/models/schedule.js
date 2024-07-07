export class Schedule {
    constructor(
        scheduleID   = '', 
        title = '',
        yearStart = '', 
        yearEnd = '', 
        semester = '', 
        course = []
    ){
        this.scheduleID = scheduleID,
        this.title = title
        this.yearStart = yearStart, 
        this.yearEnd = yearEnd, 
        this.semester = semester,
        this.course = course
    }
}