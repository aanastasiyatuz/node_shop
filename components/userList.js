const { getUsers } = require("../contexts/usersContext");

const renderUserList = (url) => {
    let users = getUsers(url.searchParams)

    return `
        <div class="col-sm-3 d-flex w-100 justify-content-around">
            ${users.map((user)=>{
                return `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.id}</h5>
                        <p class="card-text">${user.username}</p>
                    </div>
                </div>
                `
            }).join("")}
        </div>
    `
}

module.exports = { renderUserList }