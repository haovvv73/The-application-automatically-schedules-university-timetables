import { Noti } from "../models/notification.js"
import Dbconnection from "./dbConnection.js"


class Notification {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'notification'
    }

    // READ
    async getNotification(id) {
        const query = `SELECT * FROM ${this.table} WHERE lectureID = ? AND deleted = ?`
        const [row] = await this.connection.execute(query, [id, 0])
        const result = []
        
        if (row.length > 0) {
            for (let noti of row) {
                result.push(
                    new Noti(
                        noti.notiID,
                        noti.lecturerID,
                        noti.title,
                        noti.notiType,
                        noti.description,
                        noti.sender,
                        noti.time,
                        noti.date,
                    )
                )
            }
        }

        return result
    }

    // DELETE
    async deleteById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET deleted = ? WHERE notiID = ?`
            const result = await this.connection.execute(query, [1, id])

            await this.connection.query('COMMIT');
            return result[0].affectedRows;
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // CREATE
    async saveNotification(noti) {
        try {
            await this.connection.query('START TRANSACTION');

            const {lecturerID, title, notiType, description, sender, time, date} = noti

            const query = `INSERT INTO ${this.table}(lecturerID, title, notiType, description, sender, time, date) 
            VALUES(?,?,?,?,?,?,?)`
            const result = await this.connection.execute(query, [lecturerID, title, notiType, description, sender, time, date])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

}

const notification = new Notification()
export default notification