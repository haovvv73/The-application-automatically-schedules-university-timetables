import { Room } from "../models/room.js"
import Dbconnection from "./dbConnection.js"


class RoomService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'room'
    }

    // READ
    async getRoom() {
        const query = `SELECT * FROM ${this.table} WHERE deleted = ?`
        const [row] = await this.connection.execute(query,[0])
        const result = []

        if (row.length > 0) {
            for (let room of row) {
                result.push(
                    new Room(
                        room.roomID,
                        room.roomName,
                        room.capacity,
                        room.roomType.readUInt8(0),
                        room.location.readUInt8(0),
                        room.description,
                    )
                )
            }
        }

        return result
    }

    async getRoomById(id) {
        const query = `SELECT * FROM ${this.table} WHERE roomID = ? AND deleted = ?`
        const [row] = await this.connection.execute(query, [id,0])
        const result = []

        if (row.length > 0) {
            const room = row[0]
            result.push(
                new Room(
                    room.roomID,
                    room.roomName,
                    room.capacity,
                    room.roomType.readUInt8(0),
                    room.location.readUInt8(0),
                    room.description,
                )
            )
        }

        return result
    }

    // DELETE
    async deleteById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET deleted = ? WHERE roomID = ?`
            const result = await this.connection.execute(query, [1,id])
            
            await this.connection.query('COMMIT');
            return result[0].affectedRows;
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // CREATE
    async saveRoom(room) {
        try {
            await this.connection.query('START TRANSACTION');

            const {roomName,capacity,roomType,location,description} = room

            const query = `INSERT INTO ${this.table}(roomName,capacity,roomType,location,description) 
            VALUES(?,?,?,?,?)`
            const result = await this.connection.execute(query, [roomName,capacity,parseInt(roomType),parseInt(location),description])


            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // UPDATE
    async updateRoom(room) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET roomName = ?,capacity = ?, roomType = ?, location = ?, description = ? WHERE roomID = ? AND deleted = ?`
            const result = await this.connection.execute(query, [
                room.roomName,
                room.capacity,
                parseInt(room.roomType),
                parseInt(room.location),
                room.description,
                room.roomID,
                0
            ])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

}

const roomService = new RoomService()
export default roomService