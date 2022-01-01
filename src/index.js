'use strict'

const restify = require('restify');
const Queue = require('bee-queue');
const queue = new Queue('Q1');

function hoge(req, res, next){
    console.log("GET called");
    /* 何らかの処理 */
    const data = {name: 'john', age: 23};
    const job = queue.createJob(data);    
    job.save();    
    job.on('succeeded', (result) => {
        console.log('done');
        res.send(200, {result: 'adult'});
        next();
    });
}



const server = restify.createServer();
server.get('/', hoge);

server.listen(8080, "0.0.0.0", () => {
    console.log(`${server.name} listening at ${server.url}`);
})