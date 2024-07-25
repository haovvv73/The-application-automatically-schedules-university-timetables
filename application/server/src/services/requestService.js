import { Request } from "../models/request.js"
import Dbconnection from "./dbConnection.js"


class RequestService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'request'
    }

    // READ
    // get by lecturer
    async getRequest(id) {
        console.log(id);
        const query = `SELECT * FROM ${this.table} 
        WHERE ${this.table}.lecturerID = ? AND ${this.table}.deleted = ?`
        const [row] = await this.connection.execute(query, [id,0])
        const result = []

        if (row.length > 0) {
            for(let request of row){
                result.unshift(
                    request
                )
            }
        }

        return result
    }

    // get detail request
    async getRequestDetailById(id) {
        const query = `SELECT * FROM ${this.table} 
        WHERE requestID = ?`
        const [row] = await this.connection.execute(query, [id])
        const result = []

        if (row.length > 0) {
            for(let request of row){
                result.unshift(
                    request
                )
            }
        }

        return result
    }

    // get by schedule
    async getRequestSchedule(id) {
        const query = `SELECT * FROM ${this.table} 
        LEFT JOIN lecturer as l ON l.lecturerID = ${this.table}.lecturerID 
        WHERE scheduleID = ? AND replace(${this.table}.status,' ','')  = ?`

        const [row] = await this.connection.execute(query, [id,'wait'])
        const result = []

        if (row.length > 0) {
            for(let request of row){
                result.unshift(request)
            }
        }

        return result
    }

    // get by schedule - history
    async getRequestedSchedule(id) {
        const query = `SELECT * FROM ${this.table} 
        LEFT JOIN lecturer as l ON l.lecturerID = ${this.table}.lecturerID 
        WHERE scheduleID = ? AND STATUS = ? OR STATUS = ?`

        const [row] = await this.connection.execute(query, [id,'success','reject'])
        const result = []

        if (row.length > 0) {
            for(let request of row){
                result.unshift(request)
            }
        }

        return result
    }

    // DELETE
    async deleteById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET deleted = ? WHERE requestID = ?`
            const result = await this.connection.execute(query, [1,id])
            
            await this.connection.query('COMMIT');
            return result[0].affectedRows;
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // CREATE
    async saveRequest(request) {
        try {
            await this.connection.query('START TRANSACTION');

            const {lecturerID,scheduleID,courseID, title, content, status, time, time2, reason, date} = request

            const query = `INSERT INTO ${this.table}(lecturerID,scheduleID,courseID, title, content, status, time, time2, reason, date) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const result = await this.connection.execute(query, [lecturerID,scheduleID,courseID, title, content, status, time, time2, reason, date])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // UPDATE
    async updateRequest(request) {
        // console.log(request);
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET status = ?, timeSelect = ? WHERE requestID  = ?`
            const result = await this.connection.execute(query, [
                request.status,
                request.timeSelect,
                request.requestID
            ])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

}

const requestService = new RequestService()
export default requestService