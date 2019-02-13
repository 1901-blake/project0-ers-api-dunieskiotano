
let h1 = document.createElement('h1');
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
h1.innerHTML = (`Welcome Back, ${sessionUser.firstName} ${sessionUser.lastName}`).toUpperCase();
document.getElementById('welcome').appendChild(h1);
const sessionUserLink = document.getElementById('sessionUser');
console.log(sessionUserLink);
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName} (${sessionUser.role.role})`;

//this section logs out the user at will
let logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }
    window.location.href = "home.html";
})

//Creates button to retrieve users
let retrieveUsers = document.getElementById('action1');
let buttonRetrieveUsers = document.createElement('button');
buttonRetrieveUsers.className = "btn btn-info";
buttonRetrieveUsers.innerHTML = "Retrieve All Users";
retrieveUsers.appendChild(buttonRetrieveUsers);
retrieveUsers.addEventListener('click', (e) => {
    window.location.href = "users.html";
})

//Creates button to create users
let createUser = document.getElementById('action2');
let buttonCreateUser = document.createElement('button');
buttonCreateUser.className = "btn btn-dark";
buttonCreateUser.innerHTML = " + Create New User";
createUser.appendChild(buttonCreateUser);
buttonCreateUser.addEventListener('click', (e) => {
    window.location.href = "create-user.html";
})

//Creates button and textbox to find users by user id
let findUserById = document.getElementById('action3');
let input = document.createElement('input');
input.required;
input.id = "id";
input.placeholder = "Enter User ID here";
input.type = "text";

findUserById.appendChild(input);
let findButton = document.createElement('button');
findButton.className = 'btn btn-primary';
findButton.id = "findButton";
findButton.innerHTML = "Retrieve a User by ID";
findUserById.appendChild(findButton);
//let id = document.getElementById

findButton.addEventListener('click', (e) => {
    if (id && id.value) {
        let id = document.getElementById('id').value;
        localStorage.setItem("id", JSON.stringify(id));
        window.location.href = "userbyid.html";
    } else {
        alert("Invalid entry. You must enter a value");
        return;
    }
})


//Creates button to retrieve reimbursements
let retrieveReimbursements = document.getElementById('action5');
let buttonRetrieveReimbursements = document.createElement('button');
buttonRetrieveReimbursements.className = "btn btn-info";
buttonRetrieveReimbursements.innerHTML = "Retrieve All Reimbursements";
retrieveReimbursements.appendChild(buttonRetrieveReimbursements);
buttonRetrieveReimbursements.addEventListener('click', (e) => {
    window.location.href = "reimbursements.html";
})

//Creates button to submit users
let submitReimbursement = document.getElementById('action6');
let buttonSubmitReimbursement = document.createElement('button');
buttonSubmitReimbursement.className = "btn btn-dark";
buttonSubmitReimbursement.innerHTML = " + Submit a Reimbursement Request";
submitReimbursement.appendChild(buttonSubmitReimbursement);
buttonSubmitReimbursement.addEventListener('click', (e) => {

    window.location.href = "submit-reimbursement.html";
})


//Creates button and textbox to find reimbursements by status id
let findReimbursementByStatus = document.getElementById('action7');
let inputReimbursement = document.createElement('input');
inputReimbursement.id = "reimbstatus";
inputReimbursement.placeholder = "Enter Status ID";
inputReimbursement.type = "text";
findReimbursementByStatus.appendChild(inputReimbursement);


let findReimbursementButton = document.createElement('button');
findReimbursementButton.className = 'btn btn-primary';
findReimbursementButton.id = "findReimbursementButton";
findReimbursementButton.innerHTML = "Find a Reimbursement By Status ID";
findReimbursementByStatus.appendChild(findReimbursementButton);

findReimbursementButton.addEventListener('click', (e) => {
    if (reimbstatus && reimbstatus.value) {
        let reimbursermentstatus = document.getElementById('reimbstatus').value;
        localStorage.setItem("reimbursermentstatus", JSON.stringify(reimbursermentstatus));
        window.location.href = "reimbursementbystatus.html";
    } else {
        alert("Invalid entry. You much enter a value");
    }

}
)

//Creates button and textbox to find reimbursements by user id
let findReimbursementByUserId = document.getElementById('action8');
let inputReimbursementByUserId = document.createElement('input');
inputReimbursementByUserId.id = "userid";

inputReimbursementByUserId.placeholder = "Enter User ID";
inputReimbursementByUserId.type = "text";
findReimbursementByUserId.appendChild(inputReimbursementByUserId);

let findReimbursementByUserIdButton = document.createElement('button');
findReimbursementByUserIdButton.className = 'btn btn-primary';
findReimbursementByUserIdButton.id = "findReimbursementButton";
findReimbursementByUserIdButton.innerHTML = "Find a Reimbursement By User ID";
findReimbursementByUserId.appendChild(findReimbursementByUserIdButton);

findReimbursementByUserIdButton.addEventListener('click', (e) => {
    if (inputReimbursementByUserId && inputReimbursementByUserId.value) {
        let userid = document.getElementById('userid').value;
        localStorage.setItem("userid", JSON.stringify(userid));
        window.location.href = "reimbursementbyid.html";
    }
    else {
        alert('You must enter a value');
        return;
    }

})
