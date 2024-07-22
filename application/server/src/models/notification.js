export class Noti {
    constructor(
        notiID = '',
        lecturerID = '',
        title = '',
        notiType = '',
        description = '',
        sender = '',
        time = '',
        date = '',
    ){
        this.notiID = notiID 
        this.lecturerID = lecturerID 
        this.title = title 
        this.notiType = notiType 
        this.description = description 
        this.sender = sender 
        this.time = time 
        this.date = date 
    }
}
