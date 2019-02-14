//Gets the session user
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
console.log(sessionUser);
//Finds link with sessionUser id
const sessionUserLink = document.getElementById('sessionUser');

//Assigns name & last name to sessionUserLink
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName} (${sessionUser.role.role})`;

//Assigns current values to textboxes
//const reimbursement = JSON.parse(localStorage.getItem('reimbursement'));

//Assigns values to fields that needs no input



let buttonBack = document.getElementById('buttonGoBack');
//Adds event listeniner to buttonBack button
buttonBack.addEventListener('click', (e) => {
    window.history.back();//pages go back to previous page based on history
})

let mainMenuLink = document.getElementById('mainMenu');
mainMenuLink.addEventListener('click', (e) => {
    window.location.href = `user-landing-page-${sessionUser.role.role}.html`;
})

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
function createUser(event) {

    //prevent input from rendering html (prevents html injection)
    event.preventDefault();
    let username = document.getElementById('username1-input').value;
    let password = document.getElementById('password1-input').value;
    let firstName = document.getElementById('firstname-input').value;
    let lastName = document.getElementById('lastname-input').value;
    let email = document.getElementById('email-input').value;


    let select = document.getElementById('role-input');
    let roles = select.options[select.selectedIndex].value;
    console.log(roles);
    let roleid;
    switch (roles) {
        case 'admin':
            roleid = 1;
            break;
        case 'finance-manager':
            roleid = 2;
            break;
        case "associate":
            roleid = 3;
            break;
        default:
            console.log("Invalid role");
    }
    console.log(roleid);

    //Creates object userCreated to be sent to DB
    let userCreated = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: roleid,

    }

    if ((document.getElementById('username1-input') && document.getElementById('username1-input').value) &&
        (document.getElementById('password1-input') && document.getElementById('password1-input').value) &&
        (document.getElementById('firstname-input') && document.getElementById('firstname-input').value) &&
        (document.getElementById('lastname-input') && document.getElementById('lastname-input').value) &&
        (document.getElementById('email-input') && document.getElementById('email-input').value) && (roleid)) {
        //fetches the url and performs update
        fetch('http://localhost:3200/users/', {

            method: 'POST',
            body: JSON.stringify(userCreated),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        }).then(function (response) {
            if (response.ok) {
                $('#alert').show();
                document.getElementById('alert').append(
                    "SUCCESS!! USER HAS BEEN CREATED..WAIT...RETRIEVING UPDATED TABLE");
                setTimeout(function () {
                    window.location.href = "users.html";

                }, 4000);
            }
        })
    }
    else {
        $('#alertNotValidEntry').show();
        document.getElementById('alertNotValidEntry').innerHTML = 'ALL FIELDS ARE REQUIRED. PLEASE TRY AGAIN.';
        setTimeout(function () {
            $('#alertNotValidEntry').hide();
        }, 2000);
    }
}

let cancelBtn = document.getElementById('buttonCancel');
cancelBtn.addEventListener('click', (e) => {
    window.history.back();
})


    //if (res.status === 200) {

    //}





