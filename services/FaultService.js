import Fault from "../models/Fault.js";
// import StudentFault from "../models/StudentFault.js";

const get = async () => {
    const faults = await Fault.get();

    if (!faults) throw Error('no hay faltas registradas');

    return faults;
}

export default {
    get
}