import bcrypt from 'bcrypt';
import User from '../models/User.js';

async function createUser(username, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({username, password: hashedPassword, role});

    try {
        await user.insert();
        console.log('usuario creado con exito');
    } catch (error) {
        console.error(error);
    }
}