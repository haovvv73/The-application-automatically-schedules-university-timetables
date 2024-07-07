import { Room } from "../models/room"
import Dbconnection from "./dbConnection"


class RoomService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'room'
    }

    // READ
    async getRoom() {
        const query = `SELECT * FROM ${this.table}`
        const [row] = await this.connection.execute(query)
        const result = []

        if (row.length > 0) {
            for (let room of row) {
                result.push(
                    new Room(
                        room.roomID,
                        room.roomName,
                        room.roomType,
                        room.location,
                        room.description,
                    )
                )
            }
        }

        return result
    }

    async getRoomById(id) {
        const query = `SELECT * FROM ${this.table} WHERE roomID = ?`
        const [row] = await this.connection.execute(query, [id])
        const result = []

        if (row.length > 0) {
            const room = row[0]
            result.push(
                new Room(
                    room.roomID,
                    room.roomName,
                    room.roomType,
                    room.location,
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

            const query = `DELETE FROM ${this.table} WHERE roomID = ?`
            const result = await this.connection.execute(query, [id])
            
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

            const {roomName,roomType,location,description} = room

            const query = `INSERT INTO ${this.table}(roomName,roomType,location,description) 
            VALUES(?,?,?,?)`
            const result = await this.connection.execute(query, [roomName,roomType,location,description])


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

            const query = `UPDATE ${this.table} SET roomName = ?, roomType = ?, location = ?, description = ? WHERE roomID = ?`
            const result = await this.connection.execute(query, [
                room.roomName,
                room.roomType,
                room.location,
                room.description,
                room.roomID,
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