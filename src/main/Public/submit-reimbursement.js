//Gets the session user
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));

//Finds link with sessionUser id
const sessionUserLink = document.getElementById('sessionUser');

//Assigns name & last name to sessionUserLink
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName} (${sessionUser.role.role})`

let mainMenuLink = document.getElementById('mainMenu');
mainMenuLink.addEventListener('click', (e) => {
    window.location.href = `user-landing-page-${sessionUser.role.role}.html`;
})
let logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }

    window.location.href = "home.html";
})
let buttonBack = document.getElementById('buttonGoBack');
buttonBack.addEventListener('click', (e) => {
    window.history.back();
})
//Assigns current values to textboxes
//const reimbursement = JSON.parse(localStorage.getItem('reimbursement'));

//Assigns values to fields that needs no input

let author = document.getElementById('author-input').value = sessionUser.userid;
document.getElementById('firstname-input').value = sessionUser.firstName;
document.getElementById('lastname-input').value = sessionUser.lastName
//executes update action
function submitReimbursement(event) {

    let amount = document.getElementById('amount-input').value;
    let description = document.getElementById('description-input').value;

    //prevent input from rendering html (prevents html injection)
    event.preventDefault();

    let typeid;
    switch (status) {
        case 'Pending':
            statusid = 1;
            break;
        case 'Aproved':
            statusid = 2;
            break;
        default:
            statusid = 3;

    }
    let typeSelect = document.getElementById('type-input');
    let type = typeSelect.options[typeSelect.selectedIndex].value;
    console.log(type);
    switch (type) {
        case 'Lodging':
            typeid = 1;
            break;
        case 'Travel':
            typeid = 2;
            break;
        case 'Food':
            typeid = 3;
            break;
        case 'Other':
            typeid = 4;

    }
    console.log(status, type);
    //Creates object userUpdated to be sent to DB
    let reimbursementSubmitted = {
        author: author,
        amount: amount,
        datesubmitted: Math.floor(Date.now() / 1000),
        dateresolved: null,
        description: description,
        resolver: null,
        status: 1,
        type: typeid
    }

    //checks for invalid inputs
    if ((document.getElementById('amount-input') && document.getElementById('amount-input').value) && (
        document.getElementById('description-input')) && (document.getElementById('description-input').value) &&
        (typeid))  {
        //fetches the url and performs update
        fetch('http://localhost:3200/reimbursements/', {

            method: 'POST',
            body: JSON.stringify(reimbursementSubmitted),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        }).then(function (response) {
            if (response.ok) {
                $('#alert').show();
                $('#alert').append("REIMBURSEMENT SUCCESSFULLY SUBMITTED... RELOADING UPDATED TABLE");
                setTimeout(function () { window.location.href = "reimbursements.html" }, 3500);
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



