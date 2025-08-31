import StudentFaultService from "../services/StudentFaultService.js";

const get = async (req, res) => {
    const filters = {...req.query};

    try {
        const faults = await StudentFaultService.get(filters);
        res.status(200).json({faults});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

const create = async (req, res) => {
    const {studentId, faultId} = req.body;

    try {
        await StudentFaultService.create(studentId, faultId);
        res.status(201).json({message: 'Falta agregada con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export default {
    create,
    get
}