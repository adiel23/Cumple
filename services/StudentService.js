console.log('Cargando StudentService...');

import Student from "../models/Student.js";
import StudentFault from "../models/StudentFault.js";

const getByFilters = async (filters) => {
    const {NIE, name} = filters || {};

    let query = `select * from students where 1 = 1`;
    let params = [];

    if (NIE) {
        query += ' AND NIE like ?';
        params.push(`${NIE}%`);
    }
    if (name) {
        query += ' AND name like ?';
        params.push(`${decodeURIComponent(name)}%`);
    }

    console.log(query)
    console.log(params)

    const students = await Student.getByFilters(query, params);

    if (!students) throw Error('sin coincidencias');

    return students;
}

const getById = async (id) => {
    const student = await Student.getById(id);

    if (!student) throw Error('estudiante no encontrado');

    return student;
}

const getFaults = async (studentId, filters) => {
    const faults = await StudentFault.findByStudentId(studentId, filters);

    if (!faults) throw Error('no se encontraron faltas');

    return faults;
}

export default {
    getByFilters,
    getFaults,
    getById
}