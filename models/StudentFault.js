import pool from '../config/db.js';
import Fault from './Fault.js';
import Student from './Student.js';

class StudentFault {
    constructor({studentId, faultId, timestamp}) {
        this.studentId = studentId;
        this.student = null;
        this.faultId = faultId;
        this.fault = null;
        this.timestamp = (new Date(timestamp)).toLocaleString('es-SV', { timeZone: 'America/El_Salvador' });
    }

    static async create(data) {
        const fault = new StudentFault(data);

        fault.student = await Student.getById(data.student_id);
        fault.fault = await Fault.getById(data.fault_id);

        return fault;
    }

    async insert() {
        await pool.query('insert into student_faults (student_id, fault_id) values (?, ?)', [this.studentId, this.faultId]);
    }

    static async findByStudentId(studentId, filters = {}) {
        let query = `
        SELECT sf.student_id, sf.fault_id, sf.timestamp
        FROM student_faults sf
        JOIN faults f ON sf.fault_id = f.id
        WHERE sf.student_id = ?
        `;

        const params = [studentId];

        if (filters.startDate) {
            query += " AND sf.timestamp >= ?";
            params.push(filters.startDate);
        }

        if (filters.endDate) {
            query += ' and sf.timestamp <= ?';
            params.push(`${filters.endDate} 23:59:59`);
        }

        // if (filters.datetime) {
        // query += " AND sf.datetime >= ?";
        // params.push(filters.datetime);
        // }

        // if (filters.toDate) {
        // query += " AND sf.date <= ?";
        // params.push(filters.toDate);
        // }

        const [rows] = await pool.query(query, params);

        if (!rows.length) return null;

        return await Promise.all(rows.map(row => StudentFault.create(row)));
    }

    static async get(filters) {
        const {groupId, startDate, endDate} = filters;

        let query = `
            select sf.* from student_faults sf
            join students s on s.id = sf.student_id
            join \`groups\` g on g.id = s.group_id
            where 1 = 1
        `;

        let params = [];

        if (groupId) {
            query += ' AND g.id = ?';
            params.push(groupId);
        }

        if (startDate) {
            query += ' AND sf.timestamp >= ?';
            params.push(startDate);
        }

        if (endDate) {
            query += ' AND sf.timestamp <= ?';
            params.push(`${endDate} 23:59:59`);
        }
        const [rows] = await pool.query(query, params);

        if (!rows.length) return null;

        return await Promise.all(rows.map(row => StudentFault.create(row)));
    }

    // static async getFaultsByStudentId(studentId) {
    //     const [results] = await pool.query(`
    //         select 
    //         si.student_id,
    //         si.fault_id,
    //         si.timestamp
    //         from student_incidents si
    //         join faults f on f.id = si.fault_id
    //         where si.student_id = ?`, [studentId]
    //     );

    //     if (!results.length) return null;

    //     return await Promise.all(results.map(row => StudentIncident.create(row)));
    // }
}

export default StudentFault;