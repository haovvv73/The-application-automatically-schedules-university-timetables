import { format, addMinutes, subMinutes, isAfter, isBefore, set, isEqual, getHours, getMinutes } from 'date-fns'
import { successResponse } from "../helpers/httpResponse.js";
import httpStatusCode from '../helpers/httpStatusCode.js';

const getSchedules = (req, res) => {

}

const deleteSchedule = (req, res) => {

}

const getScheduleDetail = (req, res) => {

}

const updateSchedule = (req, res) => {

}

const createSchedule = (req, res) => {
    // global
    const courses = [
        { name: 'Pháp luật đại cương', duration: 6, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Anh văn 1', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Thể dục 1', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Thể dục asdadasd', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Triết học Mác, Lênin', duration: 2, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Giải tích 1A', duration: 3, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Vi tích phân 1A', duration: 1, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Đại số tuyến tính', duration: 2, location: 1, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Thực hành Đại số tuyến tính', duration: 2, location: 0, type: 'TH', timeStart: 0, timeEnd: 0, day: '', room: '' },
        { name: 'Kinh tế 1', duration: 3, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '' },
        // { name: 'Kinh tế 222', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
        // { name: 'Kinh tế 333333', duration: 4, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
        // { name: 'Kinh tế qwe', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
        // { name: 'Kinh tế zzzz', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
        // { name: 'Kinh tế xxx', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
        // { name: 'Kinh tế ccccc', duration: 3, location: 0, type: 'LT', timeStart: 0, timeEnd: 0, day: '',room : '' },
    ];

    let schedule = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        // sun: [],
    }

    // shuffle mon hoc
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array
    }

    // kiem tra gio
    const checkCanImport = (course) => {
        let limitHour = course.location ? 17 : 18
        const limitTime = set(new Date(), { hours: limitHour, minutes: 0, seconds: 0, milliseconds: 0 });
        return isBefore(course.timeEnd, limitTime) || isEqual(course.timeEnd, limitTime)
    }

    // edit gio phu hop voi dia diem
    const timefitLocation = (coursePara) => {
        const linhtrungTime = [
            // morning
            // { hour: 7, minute: 30 },
            { hour: 8, minutes: 20 },
            { hour: 9, minutes: 10 },
            { hour: 10, minutes: 10 },
            { hour: 11, minutes: 0 },
            // afternoon
            { hour: 12, minutes: 40 },
            { hour: 13, minutes: 30 },
            { hour: 14, minutes: 20 },
            { hour: 15, minutes: 20 },
            { hour: 16, minutes: 10 },
            // { hour: 17, minutes: 10 },
        ]
        const nvcTime = [
            // morning
            // { hour: 7, minutes: 0 },
            { hour: 7, minutes: 50 },
            { hour: 8, minutes: 40 },
            { hour: 9, minutes: 40 },
            { hour: 10, minutes: 30 },
            { hour: 11, minutes: 20 },
            // afternoon
            { hour: 12, minutes: 50 },
            { hour: 13, minutes: 40 },
            { hour: 14, minutes: 30 },
            { hour: 15, minutes: 30 },
            { hour: 16, minutes: 20 },
            { hour: 17, minutes: 10 },
            // { hour: 18, minutes: 0 },
        ]

        const course = {
            name: coursePara.name,
            duration: coursePara.duration,
            location: coursePara.location,
            type: coursePara.type,
            timeStart: coursePara.timeStart,
            timeEnd: coursePara.timeEnd,
        }

        const timesFit = course.location ? linhtrungTime : nvcTime
        const hours = getHours(course.timeStart);
        const minutes = getMinutes(course.timeStart);
        const durationTime = 50
        // console.log(minutes);
        // fit execute
        for (let i = 0; i < timesFit.length; ++i) {
            if (timesFit[i].hour == hours) {
                //  < minutes => set == minute
                if (minutes <= timesFit[i].minutes) {
                    course.timeStart = set(new Date(), { hours: timesFit[i].hour, minutes: timesFit[i].minutes, seconds: 0, milliseconds: 0 });
                    const timeEnd = course.duration * durationTime
                    course.timeEnd = addMinutes(course.timeStart, timeEnd)
                } else {
                    // > minute => set after minute
                    if ((i + 1) === timesFit.length) break;
                    course.timeStart = set(new Date(), { hours: timesFit[i + 1].hour, minutes: timesFit[i + 1].minutes, seconds: 0, milliseconds: 0 });
                    const timeEnd = course.duration * durationTime
                    course.timeEnd = addMinutes(course.timeStart, timeEnd)
                }
                // fit done
                break;
            }
        }

        return course
    }

    // danh gio
    const getTime = (day, coursePara) => {
        // reference
        // @time = minute
        const breakTime = 10
        const durationTime = 50
        let lunchTimeStart = set(new Date(), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 });
        let lunchTimeEnd = set(new Date(), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 });
        let oclock12 = set(new Date(), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 });
        const breakTimeLinhTrungMorning = set(new Date(), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 });
        const breakTimeLinhTrungAfternoon = set(new Date(), { hours: 15, minutes: 10, seconds: 0, milliseconds: 0 });
        const breakTimeNVCMorning = set(new Date(), { hours: 9, minutes: 30, seconds: 0, milliseconds: 0 });
        const breakTimeNVCAfternoon = set(new Date(), { hours: 15, minutes: 20, seconds: 0, milliseconds: 0 });
        let addBreakTime = true;

        const distanceTime = 100
        const course = {
            name: coursePara.name,
            duration: coursePara.duration,
            location: coursePara.location,
            type: coursePara.type,
            timeStart: 0,
            timeEnd: 0,
            day: day,
            room: coursePara.room
        }
        // cacl lunch time 
        // linh trung 11:50 - 12:40
        // nguyen van cu 12:10 - 12:50
        if (course.location) { // linh trung
            lunchTimeStart = subMinutes(lunchTimeStart, 10)
            lunchTimeEnd = subMinutes(lunchTimeEnd, 20)
        } else { // nguyen van cu
            lunchTimeStart = addMinutes(lunchTimeStart, 10)
            lunchTimeEnd = subMinutes(lunchTimeEnd, 10)
        }

        // generate time 
        // get time morning or afternoon
        let courseDays = schedule[day]
        if (courseDays.length != 0) {
            // filter courses morning ~ afternoon
            let courseMorning = courseDays.filter(item => isBefore(item.timeStart, oclock12))
            let courseAfternoon = courseDays.filter(item => isAfter(item.timeStart, oclock12))

            // get time morning 
            const timeStart = courseMorning[courseMorning.length - 1].timeEnd
            course.timeStart = addMinutes(timeStart, 0)
            const timeEnd = course.duration * durationTime
            course.timeEnd = addMinutes(course.timeStart, timeEnd)

            // check time location
            let prevCourse = courseMorning[courseMorning.length - 1]
            const locationDiff = prevCourse.location !== course.location
            if (locationDiff) {
                course.timeStart = addMinutes(course.timeStart, distanceTime)
                course.timeEnd = addMinutes(course.timeEnd, distanceTime)

                // format time location
                let courseTimeFitLocation = timefitLocation(course)
                if (courseTimeFitLocation) addBreakTime = false
                course.timeStart = addMinutes(courseTimeFitLocation.timeStart, 0)
                course.timeEnd = addMinutes(courseTimeFitLocation.timeEnd, 0)
            }

            // breaktime morning
            if (addBreakTime) {
                if (course.location) { // linh trung 
                    if (isAfter(course.timeEnd, breakTimeLinhTrungMorning) && isBefore(course.timeEnd, lunchTimeStart)) {
                        if (isBefore(course.timeStart, breakTimeLinhTrungMorning)) {
                            // add breaktime end
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        } else {
                            // add breaktime start
                            course.timeStart = addMinutes(course.timeStart, breakTime)
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        }
                    }

                } else { // Nguyen Van Cu
                    if (isAfter(course.timeEnd, breakTimeNVCMorning) && isBefore(course.timeEnd, lunchTimeStart)) {
                        if (isBefore(course.timeStart, breakTimeNVCMorning)) {
                            // add breaktime end
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        } else {
                            // add breaktime start
                            course.timeStart = addMinutes(course.timeStart, breakTime)
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        }
                    }
                }
            }


            // check lunch time
            // parse to afternoon if in lunchtime
            if (
                ((isAfter(course.timeStart, lunchTimeStart) || isEqual(course.timeStart, lunchTimeStart)) && isBefore(course.timeStart, lunchTimeEnd))
                || (isBefore(course.timeStart, lunchTimeStart) && isAfter(course.timeEnd, lunchTimeStart))
            ) {
                // get time afternoon in lunch
                if (courseAfternoon.length === 0) {
                    // if empty course afternoon
                    const hours = getHours(lunchTimeEnd);
                    const minutes = getMinutes(lunchTimeEnd);

                    course.timeStart = set(new Date(), { hours: hours, minutes: minutes, seconds: 0, milliseconds: 0 });
                    const timeEnd = course.duration * durationTime
                    course.timeEnd = addMinutes(course.timeStart, timeEnd)
                } else {
                    const timeStart = courseAfternoon[courseAfternoon.length - 1].timeEnd
                    course.timeStart = addMinutes(timeStart, 0)
                    const timeEnd = course.duration * durationTime
                    course.timeEnd = addMinutes(course.timeStart, timeEnd)

                    // check time location
                    let prevCourse = courseAfternoon[courseAfternoon.length - 1]
                    const locationDiff = prevCourse.location !== course.location
                    if (locationDiff) {
                        course.timeStart = addMinutes(course.timeStart, distanceTime)
                        course.timeEnd = addMinutes(course.timeEnd, distanceTime)

                        // format time location
                        let courseTimeFitLocation = timefitLocation(course)
                        if (courseTimeFitLocation) addBreakTime = false
                        course.timeStart = addMinutes(courseTimeFitLocation.timeStart, 0)
                        course.timeEnd = addMinutes(courseTimeFitLocation.timeEnd, 0)
                    }

                }
            } else if (isAfter(course.timeStart, lunchTimeEnd)) {
                // get time afternoon is not in lunch
                if (courseAfternoon.length !== 0) {
                    const timeStart = courseAfternoon[courseAfternoon.length - 1].timeEnd
                    course.timeStart = addMinutes(timeStart, 0)
                    const timeEnd = course.duration * durationTime
                    course.timeEnd = addMinutes(course.timeStart, timeEnd)

                    // check time location
                    let prevCourse = courseAfternoon[courseAfternoon.length - 1]
                    const locationDiff = prevCourse.location !== course.location
                    if (locationDiff) {
                        course.timeStart = addMinutes(course.timeStart, distanceTime) // 
                        course.timeEnd = addMinutes(course.timeEnd, distanceTime)

                        // format time location
                        let courseTimeFitLocation = timefitLocation(course)
                        if (courseTimeFitLocation) addBreakTime = false
                        course.timeStart = addMinutes(courseTimeFitLocation.timeStart, 0)
                        course.timeEnd = addMinutes(courseTimeFitLocation.timeEnd, 0)
                    }

                } else {
                    // check time location
                    let prevCourse = courseMorning[courseMorning.length - 1]
                    const locationDiff = prevCourse.location !== course.location
                    if (locationDiff) {
                        // format time location
                        let courseTimeFitLocation = timefitLocation(course)
                        if (courseTimeFitLocation) addBreakTime = false
                        course.timeStart = addMinutes(courseTimeFitLocation.timeStart, 0)
                        course.timeEnd = addMinutes(courseTimeFitLocation.timeEnd, 0)
                    }
                }
            }

        } else {

            // !!
            if (course.duration > 5) course.duration = 5
            // !! 

            // if empty course morning
            // default LT time
            course.timeStart = set(new Date(), { hours: 7, minutes: 30, seconds: 0, milliseconds: 0 });
            if (!course.location) course.timeStart = subMinutes(course.timeStart, 30)
            const timeEnd = course.duration * durationTime
            course.timeEnd = addMinutes(course.timeStart, timeEnd)

            // breaktime morning
            if (addBreakTime) {
                if (course.location) { // linh trung 
                    if (isAfter(course.timeEnd, breakTimeLinhTrungMorning) && isBefore(course.timeEnd, lunchTimeStart)) {
                        if (isBefore(course.timeStart, breakTimeLinhTrungMorning)) {
                            // add breaktime end
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        } else {
                            // add breaktime start
                            course.timeStart = addMinutes(course.timeStart, breakTime)
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        }
                    }

                } else { // Nguyen Van Cu
                    if (isAfter(course.timeEnd, breakTimeNVCMorning) && isBefore(course.timeEnd, lunchTimeStart)) {
                        if (isBefore(course.timeStart, breakTimeNVCMorning)) {
                            // add breaktime end
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        } else {
                            // add breaktime start
                            course.timeStart = addMinutes(course.timeStart, breakTime)
                            course.timeEnd = addMinutes(course.timeEnd, breakTime)
                        }
                    }
                }
            }
        }

        // breaktime afternoon
        if (addBreakTime) {
            if (course.location) { // linh trung 
                if (isAfter(course.timeEnd, breakTimeLinhTrungAfternoon)) {
                    if (isBefore(course.timeStart, breakTimeLinhTrungAfternoon)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }
            } else { // Nguyen Van Cu
                if (isAfter(course.timeEnd, breakTimeNVCAfternoon)) {
                    if (isBefore(course.timeStart, breakTimeNVCAfternoon)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }
            }
        }

        return course
    }

    const scheduleGenerate = () => {
        const coursePhanLoai = {
            LT: [],
            NVC: []
        }

        // 1 : LINH TRUNG
        // 0 : NGUYEN VAN CU
        coursePhanLoai.LT = courses.filter(item => item.location === 1)
        coursePhanLoai.NVC = courses.filter(item => item.location === 0)

        // generate course
        coursePhanLoai.LT = shuffleArray(coursePhanLoai.LT) // linh trung
        coursePhanLoai.NVC = shuffleArray(coursePhanLoai.NVC) // Nguyen Van Cu

        // linh trung group
        // nvc group
        // linh trung >= nvc
        // nvc > linh trung 

        if (coursePhanLoai.LT.length > 0 && coursePhanLoai.NVC.length == 0) {
            for (let course of coursePhanLoai.LT) {
                // get time 6 day
                let courseTime6Day = []
                let dayMap = []
                for (let day in schedule) {
                    let courseTime = getTime(day, course)
                    if (checkCanImport(courseTime)) {
                        dayMap.push(day)
                        courseTime6Day.push(courseTime)
                    }
                }

                // course have free time big => push
                let maxCourseTime
                let dayCanImport
                for (let index in courseTime6Day) {
                    if (!maxCourseTime || isBefore(courseTime6Day[index].timeEnd, maxCourseTime.timeEnd)) {
                        maxCourseTime = courseTime6Day[index]
                        dayCanImport = dayMap[index]
                    }
                }

                // push
                schedule[dayCanImport].push(maxCourseTime)
            }
        } else if (coursePhanLoai.LT.length == 0 && coursePhanLoai.NVC.length > 0) {
            for (let course of coursePhanLoai.NVC) {
                // get time 6 day
                let courseTime6Day = []
                let dayMap = []
                for (let day in schedule) {
                    let courseTime = getTime(day, course)
                    if (checkCanImport(courseTime)) {
                        dayMap.push(day)
                        courseTime6Day.push(courseTime)
                    }
                }

                // course have free time big => push
                let maxCourseTime
                let dayCanImport
                for (let index in courseTime6Day) {
                    if (!maxCourseTime || isBefore(courseTime6Day[index].timeEnd, maxCourseTime.timeEnd)) {
                        maxCourseTime = courseTime6Day[index]
                        dayCanImport = dayMap[index]
                    }
                }

                // push
                schedule[dayCanImport].push(maxCourseTime)
            }
        } else if (coursePhanLoai.LT.length >= coursePhanLoai.NVC.length) {
            for (let course of coursePhanLoai.NVC) {
                // get time 6 day
                let courseTime6Day = []
                let dayMap = []
                for (let day in schedule) {
                    let courseTime = getTime(day, course)
                    if (checkCanImport(courseTime)) {
                        dayMap.push(day)
                        courseTime6Day.push(courseTime)
                    }
                }

                // course have free time big => push
                let maxCourseTime
                let dayCanImport
                for (let index in courseTime6Day) {
                    if (!maxCourseTime || isAfter(courseTime6Day[index].timeEnd, maxCourseTime.timeEnd)) {
                        maxCourseTime = courseTime6Day[index]
                        dayCanImport = dayMap[index]
                    }
                }

                // push
                schedule[dayCanImport].push(maxCourseTime)
            }

            for (let course of coursePhanLoai.LT) {
                // get time 6 day
                let courseTime6Day = []
                let dayMap = []
                for (let day in schedule) {
                    let courseTime = getTime(day, course)
                    if (checkCanImport(courseTime)) {
                        dayMap.push(day)
                        courseTime6Day.push(courseTime)
                    }
                }

                // course have free time big => push
                let maxCourseTime
                let dayCanImport
                for (let index in courseTime6Day) {
                    if (!maxCourseTime || isBefore(courseTime6Day[index].timeEnd, maxCourseTime.timeEnd)) {
                        maxCourseTime = courseTime6Day[index]
                        dayCanImport = dayMap[index]
                    }
                }

                // push
                schedule[dayCanImport].push(maxCourseTime)
            }
        } else if (coursePhanLoai.LT.length < coursePhanLoai.NVC.length) {
            for (let course of coursePhanLoai.LT) {
                // get time 6 day
                let courseTime6Day = []
                let dayMap = []
                for (let day in schedule) {
                    let courseTime = getTime(day, course)
                    if (checkCanImport(courseTime)) {
                        dayMap.push(day)
                        courseTime6Day.push(courseTime)
                    }
                }

                // course have free time big => push
                let maxCourseTime
                let dayCanImport
                for (let index in courseTime6Day) {
                    if (!maxCourseTime || isAfter(courseTime6Day[index].timeEnd, maxCourseTime.timeEnd)) {
                        maxCourseTime = courseTime6Day[index]
                        dayCanImport = dayMap[index]
                    }
                }

                // push
                schedule[dayCanImport].push(maxCourseTime)
            }

            for (let course of coursePhanLoai.NVC) {
                // get time 6 day
                let courseTime6Day = []
                let dayMap = []
                for (let day in schedule) {
                    let courseTime = getTime(day, course)
                    if (checkCanImport(courseTime)) {
                        dayMap.push(day)
                        courseTime6Day.push(courseTime)
                    }
                }

                // course have free time big => push
                let maxCourseTime
                let dayCanImport
                for (let index in courseTime6Day) {
                    if (!maxCourseTime || isBefore(courseTime6Day[index].timeEnd, maxCourseTime.timeEnd)) {
                        maxCourseTime = courseTime6Day[index]
                        dayCanImport = dayMap[index]
                    }
                }

                // push
                schedule[dayCanImport].push(maxCourseTime)
            }
        }

        // generate room
        // 2 room ly thuyet - 1 room thuc hanh 
        // danh chan le - phong 1 -> phong 2 -> phong 1
        for (let days in schedule) {
            let index = 0
            const roomThNVC = 'phong thuc hanh NVC'
            const roomThLT = 'phong thuc hanh LT'
            const arrRoomLT = shuffleArray(['phong 1', 'phong 2'])
            const arrRoomNVC = shuffleArray(['phong a', 'phong b'])

            // filter thuc hanh
            const courseTH = schedule[days].filter(item => item.type === 'TH')
            const courseThucHanhLT = courseTH.filter(item => item.location === 1)
            const courseThucHanhNVC = courseTH.filter(item => item.location === 0)

            // filter ly thuyet
            const courseLT = schedule[days].filter(item => item.type === 'LT')
            const courseLyThuyetLT = courseLT.filter(item => item.location === 1)
            const courseLyThuyetNVC = courseLT.filter(item => item.location === 0)

            // linh trung get room
            // LT
            for (let cou of courseLyThuyetLT) {
                if (index % 2 == 0) {
                    cou.room = arrRoomLT[0]
                } else {
                    cou.room = arrRoomLT[1]
                }
                index++
            }
            // TH
            for (let cou of courseThucHanhLT) {
                cou.room = roomThLT
            }

            // nguyen van cu get room
            // LT
            for (let cou of courseLyThuyetNVC) {
                if (index % 2 == 0) {
                    cou.room = arrRoomNVC[0]
                } else {
                    cou.room = arrRoomNVC[1]
                }
                index++
            }
            // TH
            for (let cou of courseThucHanhNVC) {
                cou.room = roomThNVC
            }
        }

        for (let days in schedule) {
            for (let cou of schedule[days]) {
                console.log("daysss2 ======", cou.day);
                console.log('name:', cou.name);
                console.log('duration:', cou.duration);
                console.log('location', cou.location);
                console.log('start = ', format(cou.timeStart, 'HH:mm'));
                console.log('end = ', format(cou.timeEnd, 'HH:mm'));
                console.log('room = ', cou.room);
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            }
        }
    }

    scheduleGenerate()

    return successResponse(res, httpStatusCode.OK.message, httpStatusCode.OK.code, schedule)
}

export { createSchedule }