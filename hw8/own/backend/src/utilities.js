

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};



export { makeName }