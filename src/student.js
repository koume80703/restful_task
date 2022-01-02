'use strict'

class Student {
    name; age; grade;
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    update(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    set_name(name) {
        this.name = name;
    }

    set_age(age) {
        this.age = age;
    }

    set_grade(grade) {
        this.grade = grade;
    }

    get_name() {
        return this.name;
    }

    get_age() {
        return this.age;
    }

    get_grade() {
        return this.grade;
    }
}

module.exports = Student;