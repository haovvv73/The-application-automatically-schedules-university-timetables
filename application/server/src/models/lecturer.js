export class Lecturer {
    constructor(
        lecturerID = '', 
        accountID = '',
        email = '', 
        lecturerName = '', 
        phone = '', 
        password = '', 
        gender = null, 
        faculty = '', 
        birthday = '0000/00/00', 
        address=''
    ){
        this.lecturerID = lecturerID,
        this.accountID = accountID
        this.email = email, 
        this.lecturerName = lecturerName, 
        this.phone = phone, 
        this.password = password, 
        this.gender = gender, 
        this.faculty = faculty, 
        this.birthday = birthday, 
        this.address = address
    }
}