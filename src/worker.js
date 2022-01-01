'use strict'

const Queue = require('bee-queue');
const queue = new Queue('Q1');

queue.process((job, done) => {
    console.log(`Processing job ${job.id}`);
    if (job.data.age >= 20)
        return done(null, 'adult');
    else
        return done(null, 'child')
});