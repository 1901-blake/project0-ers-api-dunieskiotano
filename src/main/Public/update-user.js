
//Gets the session user
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));

//Finds link with sessionUser id
const sessionUserLink = document.getElementById('sessionUser');

//Assigns name & last name to sessionUserLink
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName}!!`

//Assigns current values to textboxes
const user = JSON.parse(localStorage.getItem('user'));
document.getElementById('id-input').value = JSON.stringify(user.userid);
document.getElementById('username-input').value = user.username;
document.getElementById('password-input').value = user.password;
document.getElementById('firstname-input').value = user.firstName;
document.getElementById('lastname-input').value = user.lastName;
document.getElementById('email-input').value = user.email;
document.getElementById('role-input').value = user.role.role;
document.getElementById('roleid-input').value = user.role.roleId;

//Finds button with id buttonBack
let buttonBack = document.getElementById('buttonGoBack');

//Adds event listeniner to buttonBack button
buttonBack.addEventListener('click', (e) => {
    window.history.back();//pages go back to previous page based on history
})

let roleid;
//finds element with id 'logout'
let logout = document.getElementById('logout');

//adds an event listener to logout link to destroy session
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }
    //redirects to home page
    window.location.href = "home.html";
})

//executes update action
function updateUser(event) {
    console.log('------------------------------------------');
    // console.log(req.session);
    console.log('------------------------------------------');
    //prevent input from rendering html (prevents html injection)
    event.preventDefault();
    let inputs = document.getElementsByTagName('input');
    let select = document.getElementById('role-input');
    let roles = select.options[select.selectedIndex].value;
    console.log(roles);
    console.log(`getSelectValue ${roles}`)
    console.log(roles);
    switch (roles) {
        case 'admin':
            roleid = 1;
            break;
        case 'finance-manager':
            roleid = 2;
            break;
        default:
            roleid = 3;

    }
    console.log(inputs);



    //Creates object userUpdated to be sent to DB
    let userUpdated = {
        userid: inputs[1].value,
        username: inputs[2].value,
        password: inputs[3].value,
        firstname: inputs[4].value,
        lastname: inputs[5].value,
        email: inputs[6].value,
        roleid: roleid,
        role: roles
    }


    //fetches the url and performs update
    fetch('http://localhost:3200/users/', {

        method: 'PATCH',
        body: JSON.stringify(userUpdated),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    }).catch(console.log());




    //if (res.status === 200) {

    //}

}





