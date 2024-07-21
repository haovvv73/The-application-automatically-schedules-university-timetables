export class Request {
    constructor(
        requestID = '',
        lecturerID = '',
        title = '',
        content = '',
        status = '',
        time = '',
        time2 = '',
        reason = '',
        date = '',
        timeSelect = 0
    ){
        this.requestID  = requestID
        this.lectureID  = lecturerID
        this.title  = title
        this.content  = content
        this.status  = status
        this.time  = time
        this.time2  = time2
        this.reason  = reason
        this.date  = date
        this.timeSelect = timeSelect
    }
}
