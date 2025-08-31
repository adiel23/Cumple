console.log('Cargando students.controller...');

import StudentService from "../services/StudentService.js";

const getByFilters = async (req, res) => {
    const filters = {...req.query}; // filtros

    console.log(filters)

    try {
        const students = await StudentService.getByFilters(filters);
        res.status(200).json({students});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message});
    }
}

const getById = async (req, res) => {
    const {id} = req.params;

    console.log('estudiante id:', id)

    try {
        const student = await StudentService.getById(id);
        res.status(200).json({student});
    } catch(error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

const getFaults = async (req, res) => {
    const studentId = req.params.id;
    const filters = {...req.query};

    try {
        const faults = await StudentService.getFaults(studentId, filters);
        res.status(200).json({faults});
    } catch (error) {
        console.error(error);
        if (error.message === 'estudiante no encontrado') {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(500).json({error: error.message});
    }
}

export default {
    getByFilters,
    getById,
    getFaults
}