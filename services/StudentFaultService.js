import StudentFault from "../models/StudentFault.js";

const get = async (filters) => {
    const faults = await StudentFault.get(filters);

    if (!faults) throw Error('No hay coincidencias');

    return faults;
}

const create = async (studentId, faultId) => {
    const studentFault = new StudentFault({studentId, faultId});
    await studentFault.insert();
}

export default {
    create,
    get
}