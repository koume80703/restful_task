'use strict'

const restify = require('restify');
const Queue = require('bee-queue');
const queue = new Queue('Q1');

const Student = require('./student');

function get_func(req, res, next) {
    console.log("GET called");

    const res_data = list_student;
    res.send(200, res_data);
}

function post_func(req, res, next) {
    console.log("POST called");

    const data = ["create", req.body, list_student];

    const job = queue.createJob(data);

    job.save();
    job.on('succeeded', (result) => {
        console.log('done');
        list_student = result.students;
        if (result.status == "done") {
            res.send(201, { "status": result.status });
        }
        else if (result.status == "existed") {
            res.send(204, { " status": result.status });
        }

        next();
    })
}

function put_func(req, res, next) {
    console.log("PUT called");

    const data = ["update", req.body, list_student];

    const job = queue.createJob(data);

    job.save();
    job.on('succeeded', (result) => {
        console.log('done');
        list_student = result.students;
        if (result.status == "done") {
            res.send(200, { "status": result.status });
        }
        else if (result.status == "failed") {
            res.send(404, { "status": result.status });
        }

        next();
    })
}

function delete_func(req, res, next) {
    console.log("DELETE called");

    const data = ["delete", req.body, list_student];

    const job = queue.createJob(data);

    job.save();
    job.on('succeeded', (result) => {
        console.log('done');
        list_student = result.students;
        if (result.status == "done") {
            res.send(200, { "status": result.status });
        }
        else if (result.status == "Not existed") {
            res.send(404, { "status": result.status });
        }

        next();
    })
}

let list_student = [];
list_student.push(new Student(0, "taro", 23, "freshman"));

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.post("/student", post_func);
server.get('/student', get_func);
server.put('/student', put_func);
server.del('/student', delete_func);


server.listen(8080, "0.0.0.0", () => {
    console.log(`${server.name} listening at ${server.url}`);
})