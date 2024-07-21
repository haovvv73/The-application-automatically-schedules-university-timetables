export class Schedule {
    constructor(
        scheduleID   = '', 
        title = '',
        yearStart = '', 
        yearEnd = '', 
        semester = '', 
        course = [],
        totalRequest=0,
    ){
        this.scheduleID = scheduleID,
        this.title = title
        this.yearStart = yearStart, 
        this.yearEnd = yearEnd, 
        this.semester = semester,
        this.course = course,
        this.totalRequest = totalRequest
    }
}