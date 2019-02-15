//Gets the session user
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
console.log(sessionUser);
//Finds link with sessionUser id
const sessionUserLink = document.getElementById('sessionUser');

//Assigns name & last name to sessionUserLink
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName}!!`

//Assigns current values to textboxes
const reimbursement = JSON.parse(localStorage.getItem('reimbursement'));
console.log(reimbursement);
document.getElementById('id-input').value = JSON.stringify(reimbursement.reimbursementid);
document.getElementById('author-input').value = reimbursement.author;
document.getElementById('firstname-input').value = reimbursement["first name"];
document.getElementById('lastname-input').value = reimbursement["last name"];
document.getElementById('email-input').value = reimbursement["email"];
document.getElementById('amount-input').value = reimbursement.amount;
document.getElementById('datesubmitted-input').value = reimbursement.dateSubmitted;
if (reimbursement.dateResolved === undefined) {
    document.getElementById('dateresolved-input').value = ' ';
}
else {
    document.getElementById('dateresolved-input').value = reimbursement.dateResolved;
}
document.getElementById('description-input').value = reimbursement.description;
document.getElementById('resolver-input').value = sessionUser.userid;
document.getElementById('status-input').value = reimbursement.status;
document.getElementById('statusid-input').value = reimbursement.statusid;
document.getElementById('type-input').value = reimbursement.type;
document.getElementById('typeid-input').value = reimbursement.typeid;
console.log(reimbursement.status, reimbursement.type)
//Finds button with id buttonBack
let buttonBack = document.getElementById('buttonGoBack');

//Adds event listeniner to buttonBack button
buttonBack.addEventListener('click', (e) => {
    window.history.back();//pages go back to previous page based on history
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
let mainMenuLink = document.getElementById('mainMenu');
mainMenuLink.addEventListener('click', (e) => {
    window.location.href = `user-landing-page-${sessionUser.role.role}.html`;
})

//executes update action
function updateReimbursement(event) {

    //prevent input from rendering html (prevents html injection)
    event.preventDefault();
    let inputs = document.getElementsByTagName('input');
    let statusSelect = document.getElementById('status-input');
    let status = statusSelect.options[statusSelect.selectedIndex].value;
    let statusid;
    let typeid;
    switch (status) {
        case 'Pending':
            statusid = 1;
            break;
        case 'Approved':
            statusid = 2;
            break;
        case 'Denied':
            statusid = 3;
            break;
        default:
            console.log('Invalid status');
    }
    let typeSelect = document.getElementById('type-input');
    let type = typeSelect.options[typeSelect.selectedIndex].value;
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
        default:
            typeid = 4;

    }
    console.log(status, type);
    //Creates object userUpdated to be sent to DB
    let reimbursementUpdated = {
        reimbursementid: inputs[1].value,
        author: inputs[2].value,
        amount: inputs[6].value,
        datesubmitted: inputs[7].value,
        dateresolved: inputs[8].value,
        description: inputs[9].value,
        resolver: sessionUser.userid,
        status: statusid,
        type: typeid
    }

    console.log(inputs[1].value,
        inputs[2].value,
        inputs[6].value,
        inputs[7].value,
        inputs[8].value,
        inputs[9].value,
        inputs[10].value,
        statusid,
        typeid)

    //fetches the url and performs update
    fetch('http://localhost:3200/reimbursements/', {

        method: 'PATCH',
        body: JSON.stringify(reimbursementUpdated),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    }).then(function (response) {
        if (response.ok) {
            $('#alert').show();
            $('#alert').append("REIMBURSEMENT SUCCESSFULLY UPDATED... RELOADING UPDATED TABLE");
            setTimeout(function () { window.location.href = "reimbursements.html" }, 3500);
        }
    })
}



