let userid = [];
let statusid = [];
fetch('http://localhost:3200/users/', {
    credentials: 'include'
}).then(resp => resp.json())
    .then(users => {
        users.forEach(user => {
            userid.push(user['userid']);


        });
    })
fetch('http://localhost:3200/reimbursements/', {
    credentials: 'include'
}).then(resp => resp.json())
    .then(reimbursements => {
        reimbursements.forEach(reimbursement => {
            statusid.push(reimbursement['statusid']);
        })
    })
console.log(userid);
console.log(statusid);
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
    e.preventDefault();
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
    e.preventDefault();
    window.location.href = "users.html";
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
findButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (input && input.value) {
        for (let i = 0; i < userid.length; i++) {
            if (userid[i] === +input.value) {
                let id = document.getElementById('id').value;
                localStorage.setItem("id", JSON.stringify(id));
                $('#alertNotFound').hide();
                window.location.href = "userbyid.html";
                return;
            }
            else {
                $('#alertNotFound').show();
                document.getElementById('alertNotFound').innerHTML = 'USER NOT FOUND. TRY AGAIN.';
                setTimeout(function () {
                    $('#alertNotFound').hide();
                    input.value='';
                }, 2000);


            }
        }
    }
    else {
        $('#alertNotValidEntry').show();
        document.getElementById('alertNotValidEntry').innerHTML = 'INVALID ENTRY. PLEASE TRY AGAIN.';
        setTimeout(function () {
            $('#alertNotValidEntry').hide();
        }, 2000);
    }
})

//Creates button to retrieve reimbursements
let retrieveReimbursements = document.getElementById('action5');
let buttonRetrieveReimbursements = document.createElement('button');
buttonRetrieveReimbursements.className = "btn btn-info";
buttonRetrieveReimbursements.innerHTML = "Retrieve All Reimbursements";
retrieveReimbursements.appendChild(buttonRetrieveReimbursements);
buttonRetrieveReimbursements.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "reimbursements.html";
})

//Creates button to submit users
let submitReimbursement = document.getElementById('action6');
let buttonSubmitReimbursement = document.createElement('button');
buttonSubmitReimbursement.className = "btn btn-dark";
buttonSubmitReimbursement.innerHTML = " + Submit a Reimbursement Request";
submitReimbursement.appendChild(buttonSubmitReimbursement);
buttonSubmitReimbursement.addEventListener('click', (e) => {
    e.preventDefault();

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
    e.preventDefault();
       if (inputReimbursement && inputReimbursement.value) {
        for (let i = 0; i < statusid.length; i++) {
            if (statusid[i] === +inputReimbursement.value) {
                let reimbursermentstatus = document.getElementById('reimbstatus').value;
                localStorage.setItem("reimbursermentstatus", JSON.stringify(reimbursermentstatus));
                $('#alertNotFound').hide();
                window.location.href = "reimbursementbystatus.html";
                return;
            } 
            else {
                $('#alertNotFound').show();
                document.getElementById('alertNotFound').innerHTML = 'STATUS ID IS INCORRECT. TRY AGAIN.';
                setTimeout(function () {
                    $('#alertNotFound').hide();
                    inputReimbursement.value='';
                }, 2500);

            }
        }
    }
    else {
        $('#alertNotValidEntry').show();
        document.getElementById('alertNotValidEntry').innerHTML = 'INVALID ENTRY. PLEASE TRY AGAIN.';
        setTimeout(function () {
            $('#alertNotValidEntry').hide();
        }, 2000);
    }
})

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
    e.preventDefault();
    if (inputReimbursementByUserId && inputReimbursementByUserId.value) {
        for (let i = 0; i < userid.length; i++) {
            if (userid[i] === +inputReimbursementByUserId.value) {
                let userid = document.getElementById('userid').value;
                localStorage.setItem("userid", JSON.stringify(userid));
                $('#alertNotFound').hide();
                window.location.href = "reimbursementbyid.html";
                return;
            } 
            else {
                $('#alertNotFound').show();
                document.getElementById('alertNotFound').innerHTML = 'USER ID IS INCORRECT. TRY AGAIN.';
                setTimeout(function () {
                    $('#alertNotFound').hide();
                    inputReimbursementByUserId.value=' ';
                }, 2500);

            }
        }
    }
    else {
        $('#alertNotValidEntry').show();
        document.getElementById('alertNotValidEntry').innerHTML = 'INVALID ENTRY. PLEASE TRY AGAIN.';
        setTimeout(function () {
            $('#alertNotValidEntry').hide();
        }, 2000);
    }
})