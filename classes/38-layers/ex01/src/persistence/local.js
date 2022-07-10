const operations = []

async function save(data) {
    await operations.push(data)
    return operations
}

async function get() {
    return operations
}

module.exports = {
    save,
    get
}