import { Subject } from "../models/subject"
import Dbconnection from "./dbConnection"


class SubjectService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'subject'
    }

    // READ
    async getSubject() {
        const query = `SELECT * FROM ${this.table}`
        const [row] = await this.connection.execute(query)
        const result = []

        if (row.length > 0) {
            for (let subject of row) {
                result.push(
                    new Subject(
                        subject.subjectID,
                        subject.subjectName,
                        subject.credit,
                        subject.description,
                        subject.subjectType,
                        subject.duration,
                    )
                )
            }
        }

        return result
    }

    async getSubjectById(id) {
        const query = `SELECT * FROM ${this.table} WHERE roomID = ?`
        const [row] = await this.connection.execute(query, [id])
        const result = []

        if (row.length > 0) {
            const subject = row[0]
            result.push(
                new Subject(
                    subject.subjectID,
                    subject.subjectName,
                    subject.credit,
                    subject.description,
                    subject.subjectType,
                    subject.duration,
                )
            )
        }

        return result
    }

    // DELETE
    async deleteById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `DELETE FROM ${this.table} WHERE subjectID = ?`
            const result = await this.connection.execute(query, [id])
            
            await this.connection.query('COMMIT');
            return result[0].affectedRows;
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // CREATE
    async saveSubject(subject) {
        try {
            await this.connection.query('START TRANSACTION');

            const {subjectName,credit,description,subjectType,duration} = subject

            const query = `INSERT INTO ${this.subTable2}(subjectName,credit,description,subjectType,duration) 
            VALUES(?,?,?,?,?)`
            const result = await this.connection.execute(query, [subjectName,credit,description,subjectType,duration])


            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // UPDATE
    async updateSubject(subject) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET subjectName = ?, credit = ?, description = ?, subjectType = ?, duration = ? WHERE subjectID = ?`
            const result = await this.connection.execute(query, [
                subject.subjectName,
                subject.credit,
                subject.description,
                subject.subjectType,
                subject.duration,
                subject.subjectID,
            ])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

}

const subjectService = new SubjectService()
export default subjectService