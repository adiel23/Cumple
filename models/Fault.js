import pool from "../config/db.js";

class Fault {
    constructor({id, type, description}) {
        this.id = id;
        this.type = type;
        this.description = description;
    }

    static async get() { // filtros opcionales mas adelante
        const [results] = await pool.query('select * from faults');

        if (!results.length) return null;

        return results.map(row => new Fault(row));
    }

    static async getById(id) {
        const [results] = await pool.query(`select * from faults where id = ?`, [id]);

        if (!results.length) return null;

        return new Fault(results[0]);
    }
}

export default Fault;