import { format, addMinutes, subMinutes, set, getHours, getMinutes, areIntervalsOverlapping, compareAsc, isAfter, isEqual, min, max, differenceInMinutes, isBefore } from 'date-fns'

let courses = [
    // { name: 'Pháp luật đại cương', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', LecturerID: 'lorem' },
    // { name: 'Anh văn 1', duration: 1, location: 1, type: 'LT', timeStart: 0, timeEnd: 0, day: '', room: '', LecturerID: 'lorem2' },
];

let teacherSameCourse = [
    // {
    //     name: 'Pháp luật đại cương', duration: 4, type: 'LT', room: '',
    //     timeStart: set(new Date(), { hours: 7, minutes: 30, seconds: 0, milliseconds: 0 }),
    //     timeEnd: set(new Date(), { hours: 8, minutes: 20, seconds: 0, milliseconds: 0 }),
    //     day: 'mon', teacher: 'lorem', location: 1,
    // },
]

let schedule = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    // sun: [],
}

let dump = []

const coursePhanLoai = {
    LT: [],
    NVC: []
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
        { hour: 7, minute: 30 },
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
        { hour: 17, minutes: 0 },
    ]
    const nvcTime = [
        // morning
        { hour: 7, minutes: 0 },
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
        { hour: 18, minutes: 0 },
    ]

    const course = {
        timeStart: set(new Date(), {
            hours: coursePara.timeStart.getHours(),
            minutes: coursePara.timeStart.getMinutes(),
            seconds: coursePara.timeStart.getSeconds(),
            milliseconds: coursePara.timeStart.getMilliseconds()
        }),
        timeEnd: set(new Date(), {
            hours: coursePara.timeEnd.getHours(),
            minutes: coursePara.timeEnd.getMinutes(),
            seconds: coursePara.timeEnd.getSeconds(),
            milliseconds: coursePara.timeEnd.getMilliseconds()
        }),
        ...coursePara
    }

    // break time mock
    // morning
    let timeMorningHour1 = course.location ? 10 : 9
    let timeMorningMinute1 = course.location ? 0 : 30
    const breaktimeMorning = set(new Date(), { hours: timeMorningHour1, minutes: timeMorningMinute1, seconds: 0, milliseconds: 0 })
    // afternoon
    let timeAfternoongHour1 = 15
    let timeAfternoonMinute1 = course.location ? 10 : 20
    const breaktimeAfternoon = set(new Date(), { hours: timeAfternoongHour1, minutes: timeAfternoonMinute1, seconds: 0, milliseconds: 0 })


    const timesFit = course.location ? linhtrungTime : nvcTime
    const breakTime = 10
    const hours = getHours(course.timeStart);
    const minutes = getMinutes(course.timeStart);
    const durationTime = 50
    // console.log(minutes);
    // fit execute
    for (let i = 0; i < timesFit.length; ++i) {
        if (timesFit[i].hour == hours) {
            //  < minutes => set == minute
            if (minutes <= timesFit[i].minutes) {
                // time start generate
                course.timeStart = set(new Date(), { hours: timesFit[i].hour, minutes: timesFit[i].minutes, seconds: 0, milliseconds: 0 });
                // time end generate
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

    // breaktime morning
    if (isBefore(course.timeStart, breaktimeMorning) && isAfter(course.timeEnd, breaktimeMorning)) {
        course.timeEnd = addMinutes(course.timeEnd, breakTime)
    }

    // breaktime afternoon
    if (isBefore(course.timeStart, breaktimeAfternoon) && isAfter(course.timeEnd, breaktimeAfternoon)) {
        course.timeEnd = addMinutes(course.timeEnd, breakTime)
    }

    return course
}

// check overlap
const isOverlap = (cou1, cou2) => {
    const interval1 = {
        start: set(new Date(), {
            hours: cou1.timeStart.getHours(),
            minutes: cou1.timeStart.getMinutes(),
            seconds: cou1.timeStart.getSeconds(),
            milliseconds: cou1.timeStart.getMilliseconds()
        }),
        end: set(new Date(), {
            hours: cou1.timeEnd.getHours(),
            minutes: cou1.timeEnd.getMinutes(),
            seconds: cou1.timeEnd.getSeconds(),
            milliseconds: cou1.timeEnd.getMilliseconds()
        }),
    };

    const interval2 = {
        start: set(new Date(), {
            hours: cou2.timeStart.getHours(),
            minutes: cou2.timeStart.getMinutes(),
            seconds: cou2.timeStart.getSeconds(),
            milliseconds: cou2.timeStart.getMilliseconds()
        }),
        end: set(new Date(), {
            hours: cou2.timeEnd.getHours(),
            minutes: cou2.timeEnd.getMinutes(),
            seconds: cou2.timeEnd.getSeconds(),
            milliseconds: cou2.timeEnd.getMilliseconds()
        }),
    };

    const result = areIntervalsOverlapping(interval1, interval2)
    return result
}

const getTime = (day, coursePara) => {
    // preference
    // @time = minute
    const course = {
        courseID: "",
        className: coursePara.className,
        cohort: coursePara.cohort,
        classSize: coursePara.cohort,
        timeStart: set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
        timeEnd: set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
        day: day,
        type: coursePara.type,
        location: coursePara.location,
        lecturerID: coursePara.lecturerID,
        subjectID: coursePara.subjectID,
        roomID: coursePara.roomID,
        scheduleID: coursePara.scheduleID,
        duration: coursePara.duration,
    }

    const breakTime = 10
    const durationTime = 50
    const distanceTime = 100
    const breakTimeLinhTrungMorning = set(new Date(), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 });
    const breakTimeLinhTrungAfternoon = set(new Date(), { hours: 15, minutes: 10, seconds: 0, milliseconds: 0 });
    const breakTimeNVCMorning = set(new Date(), { hours: 9, minutes: 30, seconds: 0, milliseconds: 0 });
    const breakTimeNVCAfternoon = set(new Date(), { hours: 15, minutes: 20, seconds: 0, milliseconds: 0 });
    let addBreakTimeMorning = true;
    let addBreakTimeAfternoon = true;

    let lunchTimeStart = set(new Date(), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 });
    let lunchTimeEnd = set(new Date(), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 });
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

    // filter courses morning ~ afternoon
    const courseDays = schedule[day]
    const courseMorning = courseDays.filter(item => {
        const checklunchTimeStartLT = set(new Date(), { hours: 11, minutes: 51, seconds: 0, milliseconds: 0 });
        const checklunchTimeStartNVC = set(new Date(), { hours: 12, minutes: 11, seconds: 0, milliseconds: 0 });

        // linh trung morning
        if (isBefore(item.timeStart, checklunchTimeStartLT) && isBefore(item.timeEnd, checklunchTimeStartLT)) {
            return item
        }
        // nvc morning
        if (isBefore(item.timeStart, checklunchTimeStartNVC) && isBefore(item.timeEnd, checklunchTimeStartNVC)) {
            return item
        }
    })
    const courseAfternoon = courseDays.filter(item => {
        const checklunchTimeEndLT = set(new Date(), { hours: 12, minutes: 39, seconds: 0, milliseconds: 0 });
        const checklunchTimeEndNVC = set(new Date(), { hours: 12, minutes: 49, seconds: 0, milliseconds: 0 });

        // linh trung afternoon
        if (isAfter(item.timeStart, checklunchTimeEndLT) && isAfter(item.timeEnd, checklunchTimeEndLT)) {
            return item
        }
        // nvc afternoon
        if (isAfter(item.timeStart, checklunchTimeEndNVC) && isAfter(item.timeEnd, checklunchTimeEndNVC)) {
            return item
        }
    })

    // morning generate - check >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (courseMorning.length != 0) {
        // generate
        course.timeStart = set(course.timeStart, {
            hours: courseMorning[courseMorning.length - 1].timeEnd.getHours(),
            minutes: courseMorning[courseMorning.length - 1].timeEnd.getMinutes(),
            seconds: courseMorning[courseMorning.length - 1].timeEnd.getSeconds(),
            milliseconds: courseMorning[courseMorning.length - 1].timeEnd.getMilliseconds()
        })
        const timeEnd = course.duration * durationTime
        course.timeEnd = addMinutes(course.timeStart, timeEnd)

        // time location
        const locationDiff = courseMorning[courseMorning.length - 1].location !== course.location
        if (locationDiff) {
            course.timeStart = addMinutes(course.timeStart, distanceTime)
            course.timeEnd = addMinutes(course.timeEnd, distanceTime)

            // format time location
            let courseTimeFitLocation = timefitLocation(course)
            if (courseTimeFitLocation) {
                addBreakTimeMorning = false

                course.timeStart = set(course.timeStart, {
                    hours: courseTimeFitLocation.timeStart.getHours(),
                    minutes: courseTimeFitLocation.timeStart.getMinutes(),
                    seconds: courseTimeFitLocation.timeStart.getSeconds(),
                    milliseconds: courseTimeFitLocation.timeStart.getMilliseconds()
                })
                course.timeEnd = set(course.timeEnd, {
                    hours: courseTimeFitLocation.timeEnd.getHours(),
                    minutes: courseTimeFitLocation.timeEnd.getMinutes(),
                    seconds: courseTimeFitLocation.timeEnd.getSeconds(),
                    milliseconds: courseTimeFitLocation.timeEnd.getMilliseconds()
                })
            }

        }

        // timebreak
        // breaktime morning
        if (addBreakTimeMorning) {
            if (course.location) { // linh trung 
                if (isAfter(course.timeEnd, breakTimeLinhTrungMorning) && isBefore(course.timeEnd, lunchTimeStart)) {
                    if (isBefore(course.timeStart, breakTimeLinhTrungMorning)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        // add breaktime end
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
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }
            }
        }

    } else {
        // generate
        course.timeStart = set(course.timeStart, { hours: 7, minutes: 30, seconds: 0, milliseconds: 0 });
        if (!course.location) course.timeStart = subMinutes(course.timeStart, 30)
        const timeEnd = course.duration * durationTime
        course.timeEnd = addMinutes(course.timeStart, timeEnd)

        // timebreak
        // breaktime morning
        if (addBreakTimeMorning) {
            if (course.location) { // linh trung 
                if (isAfter(course.timeEnd, breakTimeLinhTrungMorning) && isBefore(course.timeEnd, lunchTimeStart)) {
                    if (isBefore(course.timeStart, breakTimeLinhTrungMorning)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        // add breaktime end
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

    // conflict generate morning

    const thisTeacherCourse = teacherSameCourse.filter(cou => {
        let check = false
        for(let i of cou.lecturerID){
            if(course.lecturerID.includes(i)){
                check = true;
                break;
            }
        }

        if( check && cou.day == course.day){
            return true
        }else{
            return false
        }
    })
    
    if (thisTeacherCourse.length > 0) {
        const teacherSameCourseMorning = thisTeacherCourse.filter(item => {
            const checklunchTimeStartLT = set(new Date(), { hours: 11, minutes: 51, seconds: 0, milliseconds: 0 });
            const checklunchTimeStartNVC = set(new Date(), { hours: 12, minutes: 11, seconds: 0, milliseconds: 0 });

            // linh trung morning
            if (isBefore(item.timeStart, checklunchTimeStartLT) && isBefore(item.timeEnd, checklunchTimeStartLT)) {
                return item
            }
            // nvc morning
            if (isBefore(item.timeStart, checklunchTimeStartNVC) && isBefore(item.timeEnd, checklunchTimeStartNVC)) {
                return item
            }
        })

        // conflict morning time
        if (teacherSameCourseMorning.length > 0) {

            let check = false
            for (let i = 0; i < teacherSameCourseMorning.length; ++i) {
                // check is overlap 
                if (isOverlap(course, teacherSameCourseMorning[i])) {
                    check = true;
                    break;
                }
                // check location
                if (course.location != teacherSameCourseMorning[i].location) {
                    check = true;
                    break;
                }
            }

            // push to afternoon
            if (check) {
                course.timeStart = set(course.timeStart, {
                    hours: lunchTimeStart.getHours(),
                    minutes: lunchTimeStart.getMinutes(),
                    seconds: lunchTimeStart.getSeconds(),
                    milliseconds: lunchTimeStart.getMilliseconds()
                })
                course.timeEnd = set(course.timeEnd, {
                    hours: lunchTimeEnd.getHours(),
                    minutes: lunchTimeEnd.getMinutes(),
                    seconds: lunchTimeEnd.getSeconds(),
                    milliseconds: lunchTimeEnd.getMilliseconds()
                })
            }

        }
    }

    // afternoon generate  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const interval1 = {
        start: set(new Date(), {
            hours: course.timeStart.getHours(),
            minutes: course.timeStart.getMinutes(),
            seconds: course.timeStart.getSeconds(),
            milliseconds: course.timeStart.getMilliseconds()
        }),
        end: set(new Date(), {
            hours: course.timeEnd.getHours(),
            minutes: course.timeEnd.getMinutes(),
            seconds: course.timeEnd.getSeconds(),
            milliseconds: course.timeEnd.getMilliseconds()
        }),
    };

    const interval2 = {
        start: addMinutes(lunchTimeStart, 0),
        end: subMinutes(lunchTimeEnd, 0)
    };

    // inlunch
    if (areIntervalsOverlapping(interval1, interval2)) {
        if (courseAfternoon.length == 0) {
            // generate
            course.timeStart = set(course.timeStart, {
                hours: lunchTimeEnd.getHours(),
                minutes: lunchTimeEnd.getMinutes(),
                seconds: lunchTimeEnd.getSeconds(),
                milliseconds: lunchTimeEnd.getMilliseconds()
            })
            const timeEnd = course.duration * durationTime
            course.timeEnd = addMinutes(course.timeStart, timeEnd)
        } else {
            // generate
            course.timeStart = set(course.timeStart, {
                hours: courseAfternoon[courseAfternoon.length - 1].timeEnd.getHours(),
                minutes: courseAfternoon[courseAfternoon.length - 1].timeEnd.getMinutes(),
                seconds: courseAfternoon[courseAfternoon.length - 1].timeEnd.getSeconds(),
                milliseconds: courseAfternoon[courseAfternoon.length - 1].timeEnd.getMilliseconds()
            })
            const timeEnd = course.duration * durationTime
            course.timeEnd = addMinutes(course.timeStart, timeEnd)

            // time location
            const locationDiff = courseAfternoon[courseAfternoon.length - 1].location !== course.location
            if (locationDiff) {
                course.timeStart = addMinutes(course.timeStart, distanceTime)
                course.timeEnd = addMinutes(course.timeEnd, distanceTime)

                // format time location
                let courseTimeFitLocation = timefitLocation(course)
                if (courseTimeFitLocation) {
                    addBreakTimeAfternoon = false

                    course.timeStart = set(course.timeStart, {
                        hours: courseTimeFitLocation.timeStart.getHours(),
                        minutes: courseTimeFitLocation.timeStart.getMinutes(),
                        seconds: courseTimeFitLocation.timeStart.getSeconds(),
                        milliseconds: courseTimeFitLocation.timeStart.getMilliseconds()
                    })
                    course.timeEnd = set(course.timeEnd, {
                        hours: courseTimeFitLocation.timeEnd.getHours(),
                        minutes: courseTimeFitLocation.timeEnd.getMinutes(),
                        seconds: courseTimeFitLocation.timeEnd.getSeconds(),
                        milliseconds: courseTimeFitLocation.timeEnd.getMilliseconds()
                    })
                }

            }
        }

        // timebreak
        // breaktime afternoon
        if (addBreakTimeAfternoon) {
            if (course.location) { // linh trung 
                if (isAfter(course.timeEnd, breakTimeLinhTrungAfternoon) && isBefore(course.timeEnd, lunchTimeStart)) {
                    if (isBefore(course.timeStart, breakTimeLinhTrungAfternoon)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }

            } else { // Nguyen Van Cu
                if (isAfter(course.timeEnd, breakTimeNVCAfternoon) && isBefore(course.timeEnd, lunchTimeStart)) {
                    if (isBefore(course.timeStart, breakTimeNVCAfternoon)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }
            }
        }
    }

    // not inlunch
    if (!areIntervalsOverlapping(interval1, interval2) && isAfter(course.timeStart, interval2.end) && isAfter(course.timeEnd, interval2.end)) {
        if (courseAfternoon.length > 0) {
            // generate
            course.timeStart = set(course.timeStart, {
                hours: courseAfternoon[courseAfternoon.length - 1].timeEnd.getHours(),
                minutes: courseAfternoon[courseAfternoon.length - 1].timeEnd.getMinutes(),
                seconds: courseAfternoon[courseAfternoon.length - 1].timeEnd.getSeconds(),
                milliseconds: courseAfternoon[courseAfternoon.length - 1].timeEnd.getMilliseconds()
            })
            const timeEnd = course.duration * durationTime
            course.timeEnd = addMinutes(course.timeStart, timeEnd)

            // time location
            const locationDiff = courseAfternoon[courseAfternoon.length - 1].location !== course.location
            if (locationDiff) {
                course.timeStart = addMinutes(course.timeStart, distanceTime)
                course.timeEnd = addMinutes(course.timeEnd, distanceTime)

                // format time location
                let courseTimeFitLocation = timefitLocation(course)
                if (courseTimeFitLocation) {
                    addBreakTimeAfternoon = false

                    course.timeStart = set(course.timeStart, {
                        hours: courseTimeFitLocation.timeStart.getHours(),
                        minutes: courseTimeFitLocation.timeStart.getMinutes(),
                        seconds: courseTimeFitLocation.timeStart.getSeconds(),
                        milliseconds: courseTimeFitLocation.timeStart.getMilliseconds()
                    })
                    course.timeEnd = set(course.timeEnd, {
                        hours: courseTimeFitLocation.timeEnd.getHours(),
                        minutes: courseTimeFitLocation.timeEnd.getMinutes(),
                        seconds: courseTimeFitLocation.timeEnd.getSeconds(),
                        milliseconds: courseTimeFitLocation.timeEnd.getMilliseconds()
                    })
                }

            }
        }

        // breaktime
        if (addBreakTimeAfternoon) {
            if (course.location) { // linh trung 
                if (isAfter(course.timeEnd, breakTimeLinhTrungAfternoon) && isBefore(course.timeEnd, lunchTimeStart)) {
                    if (isBefore(course.timeStart, breakTimeLinhTrungAfternoon)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }

            } else { // Nguyen Van Cu
                if (isAfter(course.timeEnd, breakTimeNVCAfternoon) && isBefore(course.timeEnd, lunchTimeStart)) {
                    if (isBefore(course.timeStart, breakTimeNVCAfternoon)) {
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    } else {
                        // add breaktime start
                        course.timeStart = addMinutes(course.timeStart, breakTime)
                        // add breaktime end
                        course.timeEnd = addMinutes(course.timeEnd, breakTime)
                    }
                }
            }
        }
    }

    // conflict generate afternoon
    if (thisTeacherCourse.length > 0) {
        const teacherSameCourseAfternoon = thisTeacherCourse.filter(item => {
            const checklunchTimeEndLT = set(new Date(), { hours: 12, minutes: 39, seconds: 0, milliseconds: 0 });
            const checklunchTimeEndNVC = set(new Date(), { hours: 12, minutes: 49, seconds: 0, milliseconds: 0 });

            // linh trung afternoon
            if (isAfter(item.timeStart, checklunchTimeEndLT) && isAfter(item.timeEnd, checklunchTimeEndLT)) {
                return item
            }
            // nvc afternoon
            if (isAfter(item.timeStart, checklunchTimeEndNVC) && isAfter(item.timeEnd, checklunchTimeEndNVC)) {
                return item
            }
        })

        // conflict afternoon time
        if (teacherSameCourseAfternoon.length > 0) {
            let check = false
            for (let i = 0; i < teacherSameCourseAfternoon.length; ++i) {
                // check is overlap 
                if (isOverlap(teacherSameCourseAfternoon[i], course)) {
                    check = true;
                    break;
                }
                // check location
                if (course.location != teacherSameCourseAfternoon[i].location) {
                    check = true;
                    break;
                }

            }

            // push to end
            if (check) {
                course.timeStart = set(course.timeStart, {
                    hours: 18,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                })
                course.timeEnd = set(course.timeEnd, {
                    hours: 18,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                })
            }
        }
    }

    return course
}

const scheduleGenerate = (rawCourses, rawTeacherSameCourse) => {
    courses = [...rawCourses]
    teacherSameCourse = [...rawTeacherSameCourse]

    // 1 : LINH TRUNG
    // 0 : NGUYEN VAN CU
    coursePhanLoai.LT = courses.filter(item => item.location == 1)
    coursePhanLoai.NVC = courses.filter(item => item.location == 0)

    // generate course
    coursePhanLoai.LT = shuffleArray(coursePhanLoai.LT) // linh trung
    coursePhanLoai.NVC = shuffleArray(coursePhanLoai.NVC) // Nguyen Van Cu

    // linh trung group
    // nvc group
    // linh trung >= nvc
    // nvc > linh trung 
    if (coursePhanLoai.LT.length > 0 && coursePhanLoai.NVC.length == 0) {
        for (let course of coursePhanLoai.LT) {
            const courseTimeMon = getTime('mon', course)
            const courseTimeTue = getTime('tue', course)
            const courseTimeWed = getTime('wed', course)
            const courseTimeThu = getTime('thu', course)
            const courseTimeFri = getTime('fri', course)
            const courseTimeSat = getTime('sat', course)

            let courseTime6Day = []
            if (checkCanImport(courseTimeMon)) courseTime6Day.push(courseTimeMon)
            if (checkCanImport(courseTimeTue)) courseTime6Day.push(courseTimeTue)
            if (checkCanImport(courseTimeWed)) courseTime6Day.push(courseTimeWed)
            if (checkCanImport(courseTimeThu)) courseTime6Day.push(courseTimeThu)
            if (checkCanImport(courseTimeFri)) courseTime6Day.push(courseTimeFri)
            if (checkCanImport(courseTimeSat)) courseTime6Day.push(courseTimeSat)

            // course have free time big => push
            const earliestStartTime = min(courseTime6Day.map(range => new Date(range["timeEnd"])));
            const earliestStartObject = courseTime6Day.find(range => new Date(range["timeEnd"]).getTime() === earliestStartTime.getTime());

            // push
            if (earliestStartObject) {
                const dayCanImport = earliestStartObject.day
                schedule[dayCanImport].push(earliestStartObject)
            } else {
                dump.push(course)
            }
        }
    } else if (coursePhanLoai.LT.length == 0 && coursePhanLoai.NVC.length > 0) {
        for (let course of coursePhanLoai.NVC) {
            // get time 6 day

            const courseTimeMon = getTime('mon', course)
            const courseTimeTue = getTime('tue', course)
            const courseTimeWed = getTime('wed', course)
            const courseTimeThu = getTime('thu', course)
            const courseTimeFri = getTime('fri', course)
            const courseTimeSat = getTime('sat', course)

            const courseTime6Day = []
            if (checkCanImport(courseTimeMon)) courseTime6Day.push(courseTimeMon)
            if (checkCanImport(courseTimeTue)) courseTime6Day.push(courseTimeTue)
            if (checkCanImport(courseTimeWed)) courseTime6Day.push(courseTimeWed)
            if (checkCanImport(courseTimeThu)) courseTime6Day.push(courseTimeThu)
            if (checkCanImport(courseTimeFri)) courseTime6Day.push(courseTimeFri)
            if (checkCanImport(courseTimeSat)) courseTime6Day.push(courseTimeSat)

            // course have free time big => push
            const earliestStartTime = min(courseTime6Day.map(range => new Date(range["timeEnd"])));
            const earliestStartObject = courseTime6Day.find(range => new Date(range["timeEnd"]).getTime() === earliestStartTime.getTime());

            // push
            if (earliestStartObject) {
                const dayCanImport = earliestStartObject.day
                schedule[dayCanImport].push(earliestStartObject)
            } else {
                dump.push(course)
            }
        }
    } else if (coursePhanLoai.LT.length >= coursePhanLoai.NVC.length) {
        for (let course of coursePhanLoai.NVC) {
            const courseTimeMon = getTime('mon', course)
            const courseTimeTue = getTime('tue', course)
            const courseTimeWed = getTime('wed', course)
            const courseTimeThu = getTime('thu', course)
            const courseTimeFri = getTime('fri', course)
            const courseTimeSat = getTime('sat', course)

            const courseTime6Day = []
            if (checkCanImport(courseTimeMon)) courseTime6Day.push(courseTimeMon)
            if (checkCanImport(courseTimeTue)) courseTime6Day.push(courseTimeTue)
            if (checkCanImport(courseTimeWed)) courseTime6Day.push(courseTimeWed)
            if (checkCanImport(courseTimeThu)) courseTime6Day.push(courseTimeThu)
            if (checkCanImport(courseTimeFri)) courseTime6Day.push(courseTimeFri)
            if (checkCanImport(courseTimeSat)) courseTime6Day.push(courseTimeSat)

            // course have free time big => push
            const earliestStartTime = max(courseTime6Day.map(range => new Date(range["timeEnd"])));
            const earliestStartObject = courseTime6Day.find(range => new Date(range["timeEnd"]).getTime() === earliestStartTime.getTime());

            // push
            if (earliestStartObject) {
                const dayCanImport = earliestStartObject.day
                schedule[dayCanImport].push(earliestStartObject)
            } else {
                dump.push(course)
            }
        }

        for (let course of coursePhanLoai.LT) {
            const courseTimeMon = getTime('mon', course)
            const courseTimeTue = getTime('tue', course)
            const courseTimeWed = getTime('wed', course)
            const courseTimeThu = getTime('thu', course)
            const courseTimeFri = getTime('fri', course)
            const courseTimeSat = getTime('sat', course)

            let courseTime6Day = []
            if (checkCanImport(courseTimeMon)) courseTime6Day.push(courseTimeMon)
            if (checkCanImport(courseTimeTue)) courseTime6Day.push(courseTimeTue)
            if (checkCanImport(courseTimeWed)) courseTime6Day.push(courseTimeWed)
            if (checkCanImport(courseTimeThu)) courseTime6Day.push(courseTimeThu)
            if (checkCanImport(courseTimeFri)) courseTime6Day.push(courseTimeFri)
            if (checkCanImport(courseTimeSat)) courseTime6Day.push(courseTimeSat)

            // course have free time big => push
            const earliestStartTime = min(courseTime6Day.map(range => new Date(range["timeEnd"])));
            const earliestStartObject = courseTime6Day.find(range => new Date(range["timeEnd"]).getTime() === earliestStartTime.getTime());

            // push
            if (earliestStartObject) {
                const dayCanImport = earliestStartObject.day
                schedule[dayCanImport].push(earliestStartObject)
            } else {
                dump.push(course)
            }
        }
    } else if (coursePhanLoai.LT.length < coursePhanLoai.NVC.length) {
        for (let course of coursePhanLoai.LT) {
            const courseTimeMon = getTime('mon', course)
            const courseTimeTue = getTime('tue', course)
            const courseTimeWed = getTime('wed', course)
            const courseTimeThu = getTime('thu', course)
            const courseTimeFri = getTime('fri', course)
            const courseTimeSat = getTime('sat', course)

            let courseTime6Day = []
            if (checkCanImport(courseTimeMon)) courseTime6Day.push(courseTimeMon)
            if (checkCanImport(courseTimeTue)) courseTime6Day.push(courseTimeTue)
            if (checkCanImport(courseTimeWed)) courseTime6Day.push(courseTimeWed)
            if (checkCanImport(courseTimeThu)) courseTime6Day.push(courseTimeThu)
            if (checkCanImport(courseTimeFri)) courseTime6Day.push(courseTimeFri)
            if (checkCanImport(courseTimeSat)) courseTime6Day.push(courseTimeSat)

            // course have free time big => push
            const earliestStartTime = max(courseTime6Day.map(range => new Date(range["timeEnd"])));
            const earliestStartObject = courseTime6Day.find(range => new Date(range["timeEnd"]).getTime() === earliestStartTime.getTime());

            // push
            if (earliestStartObject) {
                const dayCanImport = earliestStartObject.day
                schedule[dayCanImport].push(earliestStartObject)
            } else {
                dump.push(course)
            }
        }

        for (let course of coursePhanLoai.NVC) {
            const courseTimeMon = getTime('mon', course)
            const courseTimeTue = getTime('tue', course)
            const courseTimeWed = getTime('wed', course)
            const courseTimeThu = getTime('thu', course)
            const courseTimeFri = getTime('fri', course)
            const courseTimeSat = getTime('sat', course)

            const courseTime6Day = []
            if (checkCanImport(courseTimeMon)) courseTime6Day.push(courseTimeMon)
            if (checkCanImport(courseTimeTue)) courseTime6Day.push(courseTimeTue)
            if (checkCanImport(courseTimeWed)) courseTime6Day.push(courseTimeWed)
            if (checkCanImport(courseTimeThu)) courseTime6Day.push(courseTimeThu)
            if (checkCanImport(courseTimeFri)) courseTime6Day.push(courseTimeFri)
            if (checkCanImport(courseTimeSat)) courseTime6Day.push(courseTimeSat)

            // course have free time big => push
            const earliestStartTime = min(courseTime6Day.map(range => new Date(range["timeEnd"])));
            const earliestStartObject = courseTime6Day.find(range => new Date(range["timeEnd"]).getTime() === earliestStartTime.getTime());

            // push
            if (earliestStartObject) {
                const dayCanImport = earliestStartObject.day
                schedule[dayCanImport].push(earliestStartObject)
            } else {
                dump.push(course)
            }
        }
    }
    // console.log(rawTeacherSameCourse);
    for (let days in schedule) {
        for (let cou of schedule[days]) {
            console.log("daysss2 ======", cou.day);
            console.log('name:', cou.className);
            console.log('duration:', cou.duration);
            console.log('location', cou.location);
            console.log('start = ', format(cou.timeStart, 'HH:mm'));
            console.log('end = ', format(cou.timeEnd, 'HH:mm'));
            console.log('room = ', cou.roomID);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        }
    }
    
    let scheduleResult = {...schedule}
    let courseMissing = [...dump]
    // reset data
    courses = []
    teacherSameCourse = []
    dump = []
    schedule = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        // sun: [],
    }
    return [scheduleResult,courseMissing]
}

const roomOverlapRooms = (room,roomUsed)=>{
    for(let rUsed of roomUsed){
        let check = isOverlap(rUsed,room)
        if(check &&  rUsed.day == room.day){ return true }
    }
    return false
}

const roomGenerate = (room, roomUsed, scheduleClone)=>{
    // generate room
    const courseMissingRoom = []
    const message = {
        theory_LT : '',
        theory_NVC : '',
        practice_LT : '',
        practice_NVC : '',
    } 
    for (let days in scheduleClone) {

        // linh trung
        let arrRoomLT_LT = room.filter(r => r.location == 1 &&  r.roomType == 1 )
        let arrRoomTH_LT = room.filter(r => r.location == 1  && r.roomType == 0)
        // nguyen van cu
        let arrRoomLT_NVC = room.filter(r => r.location == 0 &&  r.roomType == 1)
        let arrRoomTH_NVC = room.filter(r => r.location == 0 && r.roomType == 0)

        // course prepare
        const courseLT = scheduleClone[days].filter(item => item.type == 1)
        const courseTH = scheduleClone[days].filter(item => item.type == 0)

        // filter thuc hanh
        const courseThucHanhLT = courseTH.filter(item => item.location == 1)
        const courseThucHanhNVC = courseTH.filter(item => item.location == 0)
        // filter ly thuyet
        const courseLyThuyetLT = courseLT.filter(item => item.location == 1)
        const courseLyThuyetNVC = courseLT.filter(item => item.location == 0)

        // linh trung get room
        // LT
        for (let cou of courseLyThuyetLT) {
            arrRoomLT_LT = shuffleArray(arrRoomLT_LT)
            for(let r of arrRoomLT_LT){
                cou.roomID = r.roomID
                let check = roomOverlapRooms(cou,roomUsed)
                if(!check){
                    break;
                }else{
                    cou.roomID = ''
                }
            }
            if(cou.roomID == ''){
                courseMissingRoom.push(cou)
                message.theory_LT = 'Số lượng phòng lý thuyết linh trung không đủ'
            }
        }
        // TH
        for (let cou of courseThucHanhLT) {
            arrRoomTH_LT = shuffleArray(arrRoomTH_LT)
            for(let r of arrRoomTH_LT){
                cou.roomID = r.roomID
                let check = roomOverlapRooms(cou,roomUsed)
                if(!check){
                    break;
                }else{
                    cou.roomID = ''
                }
            }
            if(cou.roomID == ''){
                courseMissingRoom.push(cou)
                message.practice_LT = 'Số lượng phòng thực hành linh trung không đủ'
            }
        }

        // nguyen van cu get room
        // LT
        for (let cou of courseLyThuyetNVC) {
            arrRoomLT_NVC = shuffleArray(arrRoomLT_NVC)
            for(let r of arrRoomLT_NVC){
                cou.roomID = r.roomID
                let check = roomOverlapRooms(cou,roomUsed)
                if(!check){
                    break;
                }else{
                    cou.roomID = ''
                }
            }
            if(cou.roomID == ''){
                courseMissingRoom.push(cou)
                message.theory_NVC = 'Số lượng phòng lý thuyết nguyễn văn cừ không đủ'
            }
        }
        // TH
        for (let cou of courseThucHanhNVC) {
            arrRoomTH_NVC = shuffleArray(arrRoomTH_NVC)
            for(let r of arrRoomTH_NVC){
                cou.roomID = r.roomID
                let check = roomOverlapRooms(cou,roomUsed)
                if(!check){
                    break;
                }else{
                    cou.roomID = ''
                }
            }
            if(cou.roomID == ''){
                courseMissingRoom.push(cou)
                message.practice_NVC = 'Số lượng phòng thực hành nguyễn văn cừ không đủ'
            }
        }
    }
    // console.log(scheduleClone);
    // console.log(courseMissingRoom);
    return [scheduleClone,courseMissingRoom,message]
}
export { scheduleGenerate, roomGenerate }