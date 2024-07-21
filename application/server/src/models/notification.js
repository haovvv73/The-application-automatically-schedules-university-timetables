export class Noti {
    constructor(
        notiID = '',
        lectureID = '',
        title = '',
        notiType = '',
        description = '',
        sender = '',
        time = '',
        date = '',
    ){
        this.notiID = notiID 
        this.lectureID = lectureID 
        this.title = title 
        this.notiType = notiType 
        this.description = description 
        this.sender = sender 
        this.time = time 
        this.date = date 
    }
}
