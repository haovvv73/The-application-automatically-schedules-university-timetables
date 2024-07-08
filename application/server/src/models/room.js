export class Room {
    constructor(
        roomID  = '', 
        roomName = '',
        capacity = '',
        roomType = '', 
        location = '', 
        description = '', 
    ){
        this.roomID = roomID,
        this.roomName = roomName
        this.capacity = capacity
        this.roomType = roomType, 
        this.location = location, 
        this.description = description
    }
}