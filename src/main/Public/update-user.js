const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
const sessionUserLink = document.getElementById('sessionUser');
sessionUserLink.innerHTML = sessionUser.username;

let logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }
    window.location.href = "home.html";
})
const user = JSON.parse(localStorage.getItem('user'));

document.getElementById('id-input').value = JSON.stringify(user.userid);
document.getElementById('username-input').value = user.username;
document.getElementById('password-input').value = user.password;
document.getElementById('firstname-input').value = user.firstName;
document.getElementById('lastname-input').value = user.lastName;
document.getElementById('email-input').value = user.email;
document.getElementById('role-input').value = user.role.role;
document.getElementById('roleid-input').value = user.role.roleId;

//find button with id buttonSubmit
let buttonSubmit = document.getElementById('buttonSubmit');
buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let inputs = document.getElementsByTagName('input');
    let userUpdated = {
        userid: inputs[1].value,
        username: inputs[2].value,
        password: inputs[3].value,
        firstname: inputs[4].value,
        lastname: inputs[5].value,
        email: inputs[6].value,
        role: inputs[7].value,
        roleid: inputs[8].value,
    }


    patch('http://localhost:3200/users/', {
        credentials: 'include'
    }).then(resp => resp.json())
        .then(users => {


            console.log(userUpdated.userid);
        }
        )



}
)
