function get(variable) {
    const ref = document.getElementById(variable)
    if (!ref) {
        console.warn(variable + " is not defined.")
        return null;
    }
    else {

        return ref
    }
}

function createButton(text, style, user, eventHandler) {
    let button = document.createElement("button");
    button.innerText = text;
    button.setAttribute('class', style);
    button.onclick = () => eventHandler(user);
    return button;
}
function deleteUser(userToDelete) {

    var usersList = JSON.parse(localStorage.getItem('users')) || [];


    usersList = usersList.filter(user => user._id !== userToDelete._id);


    localStorage.setItem('users', JSON.stringify(usersList));


    document.getElementById('table').innerHTML = '';

    updateView(usersList);
}

function updateView(users) {
    const table = document.getElementById('table');

    let counter = 1;

    users.forEach((user) => {
        const tr = document.createElement('tr');
        const tdCounter = document.createElement('td');

        tdCounter.innerText = counter + '.';

        tr.appendChild(tdCounter);

        Object.values(user).forEach((value) => {

            const td = document.createElement('td');
            td.innerText = value;
            tr.appendChild(td);

        });

        const editButton = createButton('Edit', 'btn btn-primary', () => console.log('Edit'));
        const deleteButton = createButton('Delete', 'btn btn-danger ms-3', user, () => deleteUser(user));

        tr.appendChild(editButton);
        tr.appendChild(deleteButton);

        table.appendChild(tr);

        counter++;
    });
}
function addNewUser() {

    const image = get('image')
    const name = get('name')
    const email = get('email')
    const date = get('date')
    const mobile = get('phoneNumber')
    const password = get('password')
    const _id = Date.now()

    let userData = {
        '_id': _id,
        'Image': image.value,
        'Name': name.value,
        'Email': email.value,
        'Date of Birth': date.value,
        'Mobile Number': `+91${mobile.value}`,
        'Password': password.value,
    };


    Object.keys(userData).forEach((key) => {

        if (userData[key] === '') {
            alert(`Please fill out the field: "${key}"`);
            throw new Error("Field cannot be empty");
        }
    });

    var usersList = JSON.parse(localStorage.getItem('users')) || [];
    usersList.push(userData);

    localStorage.setItem('users', JSON.stringify(usersList));

    document.getElementById('table').innerHTML = '';

    updateView(usersList);
}
window.onload = function () {
    var usersList = JSON.parse(localStorage.getItem('users')) || [];
    updateView(usersList);
};
function searchUsers() {
    var usersList = JSON.parse(localStorage.getItem('users')) || [];
    const searchInput = document.getElementById('SearchInput')

    return usersList.filter(user => user?.Name.toLowerCase().includes(searchInput.value.toLowerCase()));
}

function removeAll() {
    localStorage.clear()
    document.getElementById('table').innerHTML = '';
}
document.getElementById('SearchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (searchUsers().length > 0) {

            document.getElementById('table').innerHTML = '';
            updateView(searchUsers())
        }
        else {
            var usersList = JSON.parse(localStorage.getItem('users')) || [];
            updateView(usersList);
        }


    }
});