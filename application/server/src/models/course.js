export class Course {
    constructor(
        courseID = '',
        className = '',
        cohort = '',
        classSize = '',
        timeStart = '',
        timeEnd = '',
        day = '',
        type = '',
        location = '',
        lecturerID = [],
        subjectID = '',
        roomID = '',
        scheduleID = '',
        duration = 0,
        roomName = ''
    ){
        this.courseID = courseID
        this.className = className
        this.cohort = cohort
        this.classSize = classSize
        this.timeStart = timeStart
        this.timeEnd = timeEnd
        this.day = day
        this.type = type
        this.location = location
        this.lecturerID = lecturerID
        this.subjectID = subjectID
        this.roomID = roomID
        this.scheduleID = scheduleID
        this.duration = duration
        this.roomName = roomName
    }
}
