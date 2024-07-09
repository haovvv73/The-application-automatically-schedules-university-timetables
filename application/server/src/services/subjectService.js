import { Subject } from "../models/subject.js"
import Dbconnection from "./dbConnection.js"


class SubjectService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'subject'
    }

    // READ
    async getSubject() {
        const query = `SELECT * FROM ${this.table} WHERE deleted = ?`
        const [row] = await this.connection.execute(query,[0])
        const result = []

        if (row.length > 0) {
            for (let subject of row) {
                result.push(
                    new Subject(
                        subject.subjectID,
                        subject.subjectName,
                        subject.credit,
                        subject.description,
                        subject.duration,
                    )
                )
            }
        }

        return result
    }

    async getSubjectById(id) {
        const query = `SELECT * FROM ${this.table} WHERE subjectID = ? AND deleted = ?`
        const [row] = await this.connection.execute(query, [id,0])
        const result = []

        if (row.length > 0) {
            const subject = row[0]
            result.push(
                new Subject(
                    subject.subjectID,
                    subject.subjectName,
                    subject.credit,
                    subject.description,
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

            const query = `UPDATE ${this.table} SET deleted = ? WHERE subjectID = ?`
            const result = await this.connection.execute(query, [1,id])
            
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

            const {subjectName,credit,description,duration} = subject

            const query = `INSERT INTO ${this.table}(subjectName,credit,description,duration) 
            VALUES(?,?,?,?)`
            const result = await this.connection.execute(query, [subjectName,credit,description,duration])


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

            const query = `UPDATE ${this.table} SET subjectName = ?, credit = ?, description = ?, duration = ? WHERE subjectID = ? AND deleted = ?`
            const result = await this.connection.execute(query, [
                subject.subjectName,
                subject.credit,
                subject.description,
                subject.duration,
                subject.subjectID,
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

const subjectService = new SubjectService()
export default subjectService