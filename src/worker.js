'use strict'

const Queue = require('bee-queue');
const Student = require('./student');
const queue = new Queue('Q1');

queue.process((job, done) => {
    console.log(`Processing job ${job.id}`);

    if (job.data[0] === "create") {
        const req_b = job.data[1];
        let students = job.data[2];

        for (const s of students) {
            if (s.name === req_b.name) {
                return done(null, { "status": "existed", "students": students })
            }
        }
        const id = students[students.length - 1].id + 1;
        let student = new Student(id, req_b.name, req_b.age, req_b.grade);
        students.push(student);

        return done(null, { "status": "done", "students": students })
    }
    else if (job.data[0] === "update") {
        const req_b = job.data[1];
        let students = job.data[2];
        let student = null;
        for (const s of students) {
            if (s.id === req_b.id) {
                student = s;
                break;
            }
        }
        if (student === null) {
            return done(null, { "status": "failed", "students": students })
        }

        const new_name = req_b.name;
        const new_age = req_b.age;
        const new_grade = req_b.grade;

        if (new_name !== null) {
            student.name = new_name;
        }
        if (new_age !== null) {
            student.age = new_age;
        }
        if (new_grade !== null) {
            student.grade = new_grade;
        }

        return done(null, { "status": "done", "students": students })
    }
    else if (job.data[0] === "delete") {
        const req_b = job.data[1];
        let students = job.data[2];

        const id = req_b.id;

        const is_include = students.some((student) => {
            return student.id == id;
        })
        if (!is_include) {
            return done(null, { "status": "Not existed", "students": students })
        }

        students = students.filter((student) => {
            return (student.id != id);
        })
        return done(null, { "status": "done", "students": students })
    }
});