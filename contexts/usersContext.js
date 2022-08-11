const fs = require("fs");

const getUsers = (searchParams) => {
    let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'))
    if (searchParams.get("q")) {
        users = users.filter((user) => {
            return user.username.toLowerCase().includes(searchParams.get("q").toLowerCase())
        })
    }
    return users
}

module.exports = { getUsers }