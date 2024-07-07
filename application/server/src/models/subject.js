export class Subject {
    constructor(
        subjectID   = '', 
        subjectName = '',
        credit = '', 
        description = '', 
        subjectType = '', 
        duration = '', 
    ){
        this.subjectID = subjectID,
        this.subjectName = subjectName
        this.credit = credit, 
        this.description = description, 
        this.subjectType = subjectType,
        this.duration = duration
    }
}