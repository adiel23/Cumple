import GroupService from "../services/GroupService.js";

const get = async (req, res) => {
    try {
        const groups = await GroupService.get();
        res.status(200).json({groups});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export default {
    get
}