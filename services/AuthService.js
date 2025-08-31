import User from "../models/User.js";
import bcrypt from 'bcrypt';

const login = async (username, password) => {
    //verificar que exista el usuario

    const user = await User.findByUsername(username);

    if (!user) throw Error('No se encontro el usuario');

    // comparar la contrasenia

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw Error('credenciales incorrectas');

    return user;
}

export default {
    login
}