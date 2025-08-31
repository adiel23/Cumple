import Fault from "../models/Fault.js";
import FaultService from "../services/FaultService.js";

const get = async (req, res) => {
    // filtros opcionales

    try {
        const faults = await FaultService.get();
        res.status(200).json({faults});
    } catch (error) {
        console.error(error);
    }
}

// const showCreateView = async (req, res) => {
//     try {
//         const faults = await Fault.getAll();

//         if (!faults) return res.status('404').json({error: 'No hay faltas'});

//         res.render('faults/create', {faults});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: error.message});
//     }
// }

// const create = async (req, res) => {
//     const {studentId, faultId} = req.body;

//     try {
//         await FaultService.create({studentId, faultId});
//         res.status(201).json({message: 'Falta registrada Exitosamente'});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: error.message});
//     }
// }

// const getByFilters = async (req, res) => {
//     const filters = {...req.body};

//     try {
//         const faults = await FaultService.getByFilters(filters);
//         res.status(200).json({faults});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: error.message});
//     }
// }

export default {
    get
}