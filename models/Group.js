import pool from "../config/db.js";

class Group {
    constructor({id, level, modality, section}) {
        this.id = id;
        this.level = level;
        this.modality = modality;
        this.section = section;
    }

    static async getById(id) {
        const [results] = await pool.query('select * from \`groups\` where id = ?', [id]);

        if (!results.length) return null;

        return new Group(results[0]);
    }

    static async get() {
        const [rows] = await pool.query(`select * from \`groups\``);

        if (!rows.length) return null;

        return rows.map(row => new Group(row));
    }
}

export default Group;