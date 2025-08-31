import pool from "../config/db.js";

class User {
    constructor({id, username, password, role}) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    async insert() {
        await pool.query('insert into users (username, password, role) values (?, ?, ?)', [this.username, this.password, this.role]);
    }

    static async findByUsername(username) {
        const [rows] = await pool.query('select * from users where username = ?', [username]);

        if (!rows.length) return null;

        return new User(rows[0]);
    }

    async deleteByUsername() {
        await pool.query('delete from users where username = ?', [this.username]);
    }
}

export default User;