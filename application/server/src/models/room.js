export class Room {
    constructor(
        roomID  = '', 
        roomName = '',
        roomType = '', 
        location = '', 
        description = '', 
    ){
        this.roomID = roomID,
        this.roomName = roomName
        this.roomType = roomType, 
        this.location = location, 
        this.description = description
    }
}