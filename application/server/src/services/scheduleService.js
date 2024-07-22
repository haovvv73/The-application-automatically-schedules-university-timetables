import { Schedule } from "../models/schedule.js"
import Dbconnection from "./dbConnection.js"

class ScheduleService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'schedule'
        this.subTable = 'course'
    }

    // READ
    async getSchedule() {
        const query = `SELECT ${this.table}.*, COUNT(r.requestID) as totalRequest FROM ${this.table} 
        LEFT JOIN request as r
        ON r.scheduleID = ${this.table}.scheduleID
        WHERE  ${this.table}.deleted = ?
        GROUP BY ${this.table}.scheduleID;`
        const [row] = await this.connection.execute(query,[0])
        const result = []
        // console.log(row);
        // console.log(query);
        if (row.length > 0) {
            for (let schedule of row) {
                result.push(
                    new Schedule(
                        schedule.scheduleID,
                        schedule.title,
                        schedule.yearStart,
                        schedule.yearEnd,
                        schedule.semester,
                        [],
                        schedule.totalRequest
                    )
                )
            }
        }

        return result
    }

    async getScheduleById(id) {
        const query = `SELECT * FROM ${this.table} WHERE scheduleID = ? AND deleted = ?`
        const [row] = await this.connection.execute(query, [id,0])
        const result = []

        if (row.length > 0) {
            const schedule = row[0]
            // getCourses
            const subQuery = `SELECT * FROM ${this.subTable} WHERE scheduleID = ?`
            const [subRow] = await this.connection.execute(subQuery, [id])
            
            result.push(
                new Schedule(
                    schedule.scheduleID,
                    schedule.title,
                    schedule.yearStart,
                    schedule.yearEnd,
                    schedule.semester,
                    subRow,
                )
            )
        }

        return result
    }

    // DELETE
    async deleteSchedule(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET deleted = ? WHERE scheduleID = ?`
            const result = await this.connection.execute(query, [1,id])
            
            await this.connection.query('COMMIT');
            return result[0].affectedRows;
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // CREATE
    async saveSchedule(schedule) {
        try {
            await this.connection.query('START TRANSACTION');

            const {title,yearStart,yearEnd,semester} = schedule

            const query = `INSERT INTO ${this.table}(title,yearStart,yearEnd,semester) 
            VALUES(?,?,?,?)`
            const result = await this.connection.execute(query, [title,yearStart,yearEnd,semester])

             
            await this.connection.query('COMMIT');
            return [result[0].affectedRows,result[0].insertId]
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // UPDATE
    async updateSchedule(schedule) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET title = ?, yearStart = ?, yearEnd = ?, semester = ? WHERE scheduleID = ? AND deleted = ?`
            const result = await this.connection.execute(query, [
                schedule.title,
                schedule.yearStart,
                schedule.yearEnd,
                schedule.semester,
                schedule.scheduleID,
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

const scheduleService = new ScheduleService()
export default scheduleService