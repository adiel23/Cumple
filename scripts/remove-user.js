import User from "../models/User.js";

async function removeUser(username) {
    try {
        const user = await User.findByUsername(username);

        if (!user) throw Error('usuario no encontrado');

        await user.deleteByUsername(username);

        console.log('usuario eliminado con exito');
    } catch(error) {
        console.error(error);
    }
}