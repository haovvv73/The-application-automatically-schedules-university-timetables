import { Course } from "../models/course.js"
import { Lecturer } from "../models/lecturer.js"
import Dbconnection from "./dbConnection.js"

class CourseService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'course'
    }

    // READ
    async getCourses(scheduleID) {
        const query = `SELECT * FROM ${this.table} 
        LEFT JOIN subject as su ON su.subjectID = ${this.table}.subjectID
        LEFT JOIN schedule as s ON ${this.table}.scheduleID = s.scheduleID
        WHERE ${this.table}.scheduleID = ? AND s.deleted = ? `
        const [row] = await this.connection.execute(query, [scheduleID, 0])
        const result = []

        if (row.length > 0) {
            for (let course of row) {
                result.push(
                    new Course(
                        course.courseID,
                        course.className,
                        course.cohort,
                        course.classSize,
                        course.timeStart,
                        course.timeEnd,
                        course.day,
                        course.type.readUInt8(0),
                        course.location.readUInt8(0),
                        JSON.parse(course.lecturerID),
                        course.subjectID,
                        course.roomID,
                        course.scheduleID,
                        course.duration
                    )
                )
            }
        }

        return result
    }

    async getCourseById(id) {
        const query = `SELECT * FROM ${this.table} 
        LEFT JOIN subject as su ON su.subjectID = ${this.table}.subjectID
        LEFT JOIN schedule as s ON ${this.table}.scheduleID = s.scheduleID
        WHERE ${this.table}.courseID = ? AND s.deleted = ? `
        const [row] = await this.connection.execute(query, [id, 0])
        const result = []

        if (row.length > 0) {
            const course = row[0]
            result.push(
                new Course(
                    course.courseID,
                    course.className,
                    course.cohort,
                    course.classSize,
                    course.timeStart,
                    course.timeEnd,
                    course.day,
                    course.type.readUInt8(0),
                    course.location.readUInt8(0),
                    JSON.parse(course.lecturerID),
                    course.subjectID,
                    course.roomID,
                    course.scheduleID,
                )
            )
        }

        return result
    }

    async getCourseByTeacher(lecturerID) {
        const result = []
        for (let lecID of lecturerID) {
            const query = `SELECT * FROM ${this.table} 
            LEFT JOIN schedule as s
            ON ${this.table}.scheduleID = s.scheduleID
            WHERE lecturerID LIKE ? OR  lecturerID LIKE ? OR  lecturerID LIKE ?  OR  lecturerID LIKE ? AND s.deleted = ?  `
            const [row] = await this.connection.execute(query, [`%[${lecID},%`, `%,${lecID},%`, `%,${lecID}]%`, `%[${lecID}]%`, 0])
            if (row.length > 0) {
                for (let course of row) {
                    result.push(
                        new Course(
                            course.courseID,
                            course.className,
                            course.cohort,
                            course.classSize,
                            course.timeStart,
                            course.timeEnd,
                            course.day,
                            course.type.readUInt8(0),
                            course.location.readUInt8(0),
                            JSON.parse(course.lecturerID),
                            course.subjectID,
                            course.roomID,
                            course.scheduleID,
                        )
                    )
                }
            }
        }

        return result
    }

    async getCourseByRoom(roomID) {
        const result = []
        for (let roomId of roomID) {
            const query = `SELECT * FROM ${this.table} 
            LEFT JOIN schedule as s
            ON ${this.table}.scheduleID = s.scheduleID
            WHERE roomID = ? AND s.deleted = ? `
            const [row] = await this.connection.execute(query, [roomId, 0])
            if (row.length > 0) {
                const course = row[0]
                result.push(
                    new Course(
                        course.courseID,
                        course.className,
                        course.cohort,
                        course.classSize,
                        course.timeStart,
                        course.timeEnd,
                        course.day,
                        course.type.readUInt8(0),
                        course.location.readUInt8(0),
                        JSON.parse(course.lecturerID),
                        course.subjectID,
                        course.roomID,
                        course.scheduleID,
                    )
                )
            }
        }

        return result
    }

    // DELETE
    async deleteCourseById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET delete = ? WHERE courseID = ?`
            const result = await this.connection.execute(query, [1, id])

            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // CREATE
    async saveCourse(course) {
        try {
            await this.connection.query('START TRANSACTION');

            const { className, cohort, classSize, timeStart, timeEnd, day, type, location, lecturerID, subjectID, roomID, scheduleID } = course
            const query = `INSERT INTO ${this.table}(className,cohort,classSize,timeStart,timeEnd,day,type,location,lecturerID,subjectID,roomID,scheduleID) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`
            const result = await this.connection.execute(query, [
                className,
                cohort,
                classSize,
                timeStart,
                timeEnd,
                day,
                type,
                location,
                JSON.stringify(lecturerID),
                subjectID,
                roomID,
                scheduleID
            ])


            await this.connection.query('COMMIT');
            return result[0].affectedRows
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    async saveCourses(courses) {
        try {
            await this.connection.query('START TRANSACTION');
            let allResult = 0
            for (let course of courses) {
                const { className, cohort, classSize, timeStart, timeEnd, day, location, lecturerID, subjectID, type, roomID, scheduleID } = course

                const query = `INSERT INTO ${this.table}(className,cohort,classSize,timeStart,timeEnd,day,type,location,lecturerID,subjectID,roomID,scheduleID) 
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`
                const result = await this.connection.execute(query, [
                    className,
                    cohort,
                    classSize,
                    timeStart,
                    timeEnd,
                    day,
                    type,
                    location,
                    JSON.stringify(lecturerID),
                    subjectID,
                    roomID,
                    scheduleID
                ])

                allResult += result[0].affectedRows
            }

            await this.connection.query('COMMIT');
            return allResult
        } catch (error) {
            await this.connection.query('ROLLBACK');
            throw error;
        }
    }

    // UPDATE
    async updateCourse(course) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET className = ?,cohort = ?,classSize = ?,timeStart = ?,timeEnd = ?,day = ?, type = ?,location = ?,lecturerID = ?,subjectID = ?,roomID = ?,scheduleID = ? WHERE courseID = ? AND deleted = ?`
            const result = await this.connection.execute(query, [
                course.className,
                course.cohort,
                course.classSize,
                course.timeStart,
                course.timeEnd,
                course.day,
                course.type,
                course.location,
                JSON.stringify(course.lecturerID),
                course.subjectID,
                course.roomID,
                course.scheduleID,
                course.courseID,
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

const courseService = new CourseService()
export default courseService