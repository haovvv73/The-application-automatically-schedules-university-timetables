import { Lecturer } from "../models/lecturer.js"
import Dbconnection from "./dbConnection.js"

class LecturerService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.lecturerTable = 'lecturer'
    }

    // GET
    async getUsers() {
        const query = 'SELECT * FROM ?'
        const [row] = await this.connection.execute(query, [this.lecturerTable])
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
        const query = "SELECT * FROM ? WHERE lecturerID = ?"
        const [row] = await this.connection.execute(query, [this.lecturerTable, id])
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
        const query = "SELECT * FROM ? WHERE lecturerID = ?"
        const [row] = await this.connection.execute(query, [this.lecturerTable, email])
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
        const query = 'DELETE FROM ? WHERE lecturerID = ?'
        const result = await this.connection.execute(query, [this.lecturerTable, id])

        return result[0].affectedRows;
    }

    // POST
    async saveUser(lecturer) {
        const query = 'INSERT INTO ?(email,lecturerName,phone,password,gender,faculty,birthday,address) VALUES(?,?,?,?,?,?,?,?,?)'
        const result = await this.connection.execute(query, [
            lecturer.lecturerID,
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
        const query = 'UPDATE ? SET email = ?,lecturerName = ?,phone = ?,password = ?,gender = ?,faculty = ?,birthday = ?,address = ? WHERE lecturerID = ?'
        const result = await this.connection.execute(query, [
            this.lecturerTable,
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