import Group from "../models/Group.js"

const get = async () => {
    const groups = await Group.get();

    if (!groups) throw Error('no se encontraron grupos');

    return groups;
}

export default {
    get
}