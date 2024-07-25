export class Account {
    constructor(
        accountID = 0,
        email = '',
        password = '',
        permissionRead = 0,
        permissionCreate = 0,
        permissionUpdate = 0,
        permissionDelete = 0,
        lecturerID = ''
    ){
        this.accountID = accountID
        this.email = email
        this.password = password
        this.permissionRead = permissionRead
        this.permissionCreate = permissionCreate
        this.permissionUpdate = permissionUpdate
        this.permissionDelete = permissionDelete
        this.lecturerID = lecturerID
    }
}