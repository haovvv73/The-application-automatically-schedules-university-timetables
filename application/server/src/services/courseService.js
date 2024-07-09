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
        const query = `SELECT * FROM ${this.table} WHERE scheduleID = ? AND deleted = ? `
        const [row] = await this.connection.execute(query, [scheduleID,0])
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
                        course.type,
                        course.location,
                        course.lecturerID,
                        course.subjectID,
                        course.roomID,
                        course.scheduleID,
                    )
                )
            }
        }

        return result
    }

    async getCourseById(id) {
        const query = `SELECT * FROM ${this.table} WHERE courseID  = ?  AND deleted = ?  `
        const [row] = await this.connection.execute(query, [id,0])
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
                    course.type,
                    course.location,
                    course.lecturerID,
                    course.subjectID,
                    course.roomID,
                    course.scheduleID,
                )
            )
        }

        return result
    }

    // DELETE
    async deleteCourseById(id) {
        try {
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET delete = ? WHERE courseID = ?`
            const result = await this.connection.execute(query, [1,id])

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

            const {className,cohort,classSize,timeStart,timeEnd,day,type,location,lecturerID,subjectID,roomID,scheduleID} = course

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
                lecturerID,
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

            for(let course of courses){
                const {className,cohort,classSize,timeStart,timeEnd,day,location,lecturerID,subjectID,roomID,scheduleID} = course

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
                    lecturerID,
                    subjectID,
                    roomID,
                    scheduleID
                ])
            }

            await this.connection.query('COMMIT');
            return result[0].affectedRows
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
                course.lecturerID,
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