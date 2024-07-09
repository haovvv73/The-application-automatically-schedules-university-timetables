export class Subject {
    constructor(
        subjectID   = '', 
        subjectName = '',
        credit = '', 
        description = '', 
        duration = '', 
    ){
        this.subjectID = subjectID,
        this.subjectName = subjectName
        this.credit = credit, 
        this.description = description, 
        this.duration = duration
    }
}