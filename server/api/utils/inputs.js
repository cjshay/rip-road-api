const verifyInputs = (lat, long) => {
    if (!lat || !long) {
        return false;
    }
    return true;
}

module.exports = {
    verifyInputs
}