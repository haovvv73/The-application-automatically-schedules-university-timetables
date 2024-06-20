import { Lecturer } from "../models/lecturer.js"
import Dbconnection from "./dbConnection.js"

class LecturerService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'lecturer'
        this.subTable = 'account'
    }

    // GET
    async getUsers() {
        const query = `SELECT * FROM ${this.table}`
        const [row] = await this.connection.execute(query)
        const result = []

        if (row.length > 0) {
            for (let lecturer of row) {
                result.push(new Lecturer(
                    lecturer.lecturerID,
                    lecturer.email,
                    lecturer.lecturerName,
                    lecturer.phone,
                    lecturer.password,
                    lecturer.gender,
                    lecturer.faculty,
                    lecturer.birthday,
                    lecturer.address)
                )
            }
        }

        return result
    }

    async getUserById(id) {
        const query = `SELECT * FROM ${this.table} WHERE lecturerID = ?`
        const [row] = await this.connection.execute(query, [id])
        const result = []

        if (row.length > 0) {
            const lecturer = row[0]
            result.push(new Lecturer(
                lecturer.lecturerID,
                lecturer.email,
                lecturer.lecturerName,
                lecturer.phone,
                lecturer.password,
                lecturer.gender,
                lecturer.faculty,
                lecturer.birthday,
                lecturer.address)
            )
        }

        return result
    }

    async getUserByEmail(email) {
        const query = `SELECT * FROM ${this.table} WHERE email = ?`
        const [row] = await this.connection.execute(query, [email])
        const result = []

        if (row.length > 0) {
            const lecturer = row[0]
            result.push(new Lecturer(
                lecturer.lecturerID,
                lecturer.email,
                lecturer.lecturerName,
                lecturer.phone,
                lecturer.password,
                lecturer.gender,
                lecturer.faculty,
                lecturer.birthday,
                lecturer.address)
            )
        }

        return result
    }

    // DELETE
    async deleteUserById(id) {
        const query = `DELETE FROM ${this.table} WHERE lecturerID = ?`
        const result = await this.connection.execute(query, [id])

        return result[0].affectedRows;
    }

    // POST
    async saveUser(lecturer) {
        const query = `INSERT INTO ${this.table}(email,lecturerName,phone,password,gender,faculty,birthday,address) VALUES(?,?,?,?,?,?,?,?)`
        const result = await this.connection.execute(query, [
            lecturer.email,
            lecturer.lecturerName,
            lecturer.phone,
            lecturer.password,
            lecturer.gender,
            lecturer.faculty,
            lecturer.birthday,
            lecturer.address
        ])

        return result[0].affectedRows
    }

    // PUT
    async updateUser(lecturer) {
        const query = `UPDATE ${this.table} SET email = ?,lecturerName = ?,phone = ?,password = ?,gender = ?,faculty = ?,birthday = ?,address = ? WHERE lecturerID = ?`
        const result = await this.connection.execute(query, [
            lecturer.email,
            lecturer.lecturerName,
            lecturer.phone,
            lecturer.password,
            lecturer.gender,
            lecturer.faculty,
            lecturer.birthday,
            lecturer.address,
            lecturer.lecturerID,
        ])
        
        return result[0].affectedRows
    }

}

const lecturerService = new LecturerService()
export default lecturerService