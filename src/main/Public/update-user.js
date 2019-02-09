const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
const sessionUserLink = document.getElementById('sessionUser');
sessionUserLink.innerHTML = sessionUser.username;

const user = JSON.parse(localStorage.getItem('user'));
document.getElementById('id-input').value = JSON.stringify(user.userid);
document.getElementById('username-input').value = user.username;
document.getElementById('password-input').value = user.password;
document.getElementById('firstname-input').value = user.firstName;
document.getElementById('lastname-input').value = user.lastName;
document.getElementById('email-input').value = user.email;
document.getElementById('role-input').value = user.role.role;
document.getElementById('roleid-input').value = user.role.roleId;


let buttonBack=document.getElementById('buttonGoBack');
buttonBack.addEventListener('click', (e) =>{
    window.history.back();
})
let role;

function getSelectValue() {
    role = document.getElementById('role-input').value;
}
let logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }
    window.location.href = "home.html";
})

async function updateUser(event) {
    //find button with id buttonSubmit
    event.preventDefault();
    let inputs = document.getElementsByTagName('input');
    let userUpdated = {
        userid: inputs[1].value,
        username: inputs[2].value,
        password: inputs[3].value,
        firstname: inputs[4].value,
        lastname: inputs[5].value,
        email: inputs[6].value,
        role: inputs[7].value,
        //roleid: inputs[8].value
    }
    //console.log(role, roleid)
    console.log(userUpdated);

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





