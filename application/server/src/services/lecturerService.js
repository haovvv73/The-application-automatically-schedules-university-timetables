import { Lecturer } from "../models/lecturer.js"
import Dbconnection from "./dbConnection.js"

class LecturerService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'lecturer'
        this.subTable = 'account'
        this.subTable2 = 'permission'
    }

    // GET
    async getUsers() {
        const query = `SELECT * FROM ${this.table} 
        LEFT JOIN ${this.subTable} ON ${this.table}.accountID = ${this.subTable}.accountID `
        const [row] = await this.connection.execute(query)
        const result = []

        if (row.length > 0) {
            for (let lecturer of row) {
                result.push(
                    new Lecturer(
                        lecturer.lecturerID,
                        lecturer.accountID,
                        lecturer.email,
                        lecturer.lecturerName,
                        lecturer.phone,
                        lecturer.password,
                        lecturer.gender,
                        lecturer.faculty,
                        lecturer.birthday,
                        lecturer.address
                    )
                )
            }
        }

        return result
    }

    async getUserById(id) {
        const query = `SELECT * FROM ${this.table}
        LEFT JOIN ${this.subTable} ON ${this.table}.accountID = ${this.subTable}.accountID 
        WHERE lecturerID = ?`
        const [row] = await this.connection.execute(query, [id])
        const result = []

        if (row.length > 0) {
            const lecturer = row[0]
            result.push(
                new Lecturer(
                    lecturer.lecturerID,
                    lecturer.accountID,
                    lecturer.email,
                    lecturer.lecturerName,
                    lecturer.phone,
                    lecturer.password,
                    lecturer.gender,
                    lecturer.faculty,
                    lecturer.birthday,
                    lecturer.address
                )
            )
        }

        return result
    }

    async getUserByEmail(email) {
        const query = `SELECT * FROM ${this.table}
        LEFT JOIN ${this.subTable} ON ${this.table}.accountID = ${this.subTable}.accountID 
        WHERE email = ?`
        const [row] = await this.connection.execute(query, [email])
        const result = []

        if (row.length > 0) {
            const lecturer = row[0]
            result.push(
                new Lecturer(
                    lecturer.lecturerID,
                    lecturer.accountID,
                    lecturer.email,
                    lecturer.lecturerName,
                    lecturer.phone,
                    lecturer.password,
                    lecturer.gender,
                    lecturer.faculty,
                    lecturer.birthday,
                    lecturer.address
                )
            )
        }

        return result
    }

    // DELETE
    async deleteUserById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            // get detail lecturer
            const row = getUsers(id)

            if (row.length > 0) {
                const lecturer = row[0]
                // delete account
                const query2 = `DELETE FROM ${this.subTable} WHERE accountID = ?`
                await this.connection.execute(query2, [lecturer.accountID])

                // delete lecturer
                const query = `DELETE FROM ${this.table} WHERE lecturerID = ?`
                const result = await this.connection.execute(query, [lecturer.lecturerID])

                await this.connection.query('COMMIT');
                return result[0].affectedRows;
            }
            
            await this.connection.query('COMMIT');
            return 0;
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // POST
    async saveUser(lecturer) {
        try {
            await this.connection.query('START TRANSACTION');

            // create account 
            const subQuery = `INSERT INTO ${this.subTable}(email,password) VALUES(?,?)`
            const subResult = await this.connection.execute(subQuery, [
                lecturer.email,
                lecturer.password
            ])

            const insertID = subResult[0].insertId 

            const subQuery2 = `INSERT INTO ${this.subTable2}(accountID,permissionRead,permissionCreate,permissionUpdate,permissionDelete) 
            VALUES(?,?,?,?,?)`
            await this.connection.execute(subQuery2, [insertID,0,0,0,0])

            // create info lecturer
            const query = `INSERT INTO ${this.table}(accountID,lecturerName,phone,gender,faculty,birthday,address) VALUES(?,?,?,?,?,?,?)`
            const result = await this.connection.execute(query, [
                insertID,
                lecturer.lecturerName,
                lecturer.phone,
                lecturer.gender,
                lecturer.faculty,
                lecturer.birthday,
                lecturer.address
            ])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            console.log(error);
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // PUT
    async updateUser(lecturer) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET lecturerName = ?,phone = ?,gender = ?,faculty = ?,birthday = ?,address = ? WHERE lecturerID = ?`
            const result = await this.connection.execute(query, [
                lecturer.lecturerName,
                lecturer.phone,
                lecturer.gender,
                lecturer.faculty,
                lecturer.birthday,
                lecturer.address,
                lecturer.lecturerID,
            ])

            const subQuery = `UPDATE ${this.subTable} SET email = ?`
            await this.connection.execute(subQuery, [lecturer.email,])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

}

const lecturerService = new LecturerService()
export default lecturerService