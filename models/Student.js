import pool from "../config/db.js";
import Group from "./Group.js";

class Student {
    constructor({id, NIE, lastname, name}) {
        this.id = id;
        this.group = null;
        this.NIE = NIE,
        this.lastname = lastname,
        this.name = name;
    }

    static async create(data) {
        const group = await Group.getById(data.group_id);

        const student = new Student(data);

        student.group = group;

        return student;
    }

    static async getByFilters(query, params) {
        const [results] = await pool.query(query, params);

        if (!results.length) return null;

        return await Promise.all(results.map(row => Student.create(row)));
    }

    static async getById(id) {
        const [results] = await pool.query('select * from students where id = ?', [id]);

        if (!results.length) return null;

        return await Student.create(results[0]);
    }

}

export default Student;