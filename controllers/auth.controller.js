import AuthService from "../services/AuthService.js";

const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await AuthService.login(username, password);
        req.session.user = {id: user.id, role: user.role};
        res.status(200).json({
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export default {
    login
}