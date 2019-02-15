//Gets the session user
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
console.log(sessionUser);
//Finds link with sessionUser id
const sessionUserLink = document.getElementById('sessionUser');

//Assigns name & last name to sessionUserLink
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName} (${sessionUser.role.role})`



//Assigns current values to textboxes
//const reimbursement = JSON.parse(localStorage.getItem('reimbursement'));

//Assigns values to fields that needs no input
document.getElementById('author-input').value = sessionUser.userid;
document.getElementById('firstname-input').value = sessionUser.firstName;
document.getElementById('lastname-input').value = sessionUser.lastName;

//Stores values of fields that need input
//let email=document.getElementById('email-input').value;
let amount = document.getElementById('amount-input').value;
let description = document.getElementById('description-input').value;


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
function submitReimbursement(event) {

    //prevent input from rendering html (prevents html injection)
    event.preventDefault();
    let inputs = document.getElementsByTagName('input');
    let typeid;
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
        case 'Other':
            typeid = 4;
            break;

    }
    console.log(status, type);
    //Creates object userUpdated to be sent to DB
    let reimbursementSubmitted = {
        author: inputs[0].value,
        amount: inputs[3].value,
        datesubmitted: Math.floor(Date.now() / 1000),
        dateresolved: null,
        description: inputs[4].value,
        resolver: null,
        status: 1,
        type: typeid
    }

    if ((document.getElementById('amount-input') && document.getElementById('amount-input').value) && (
        document.getElementById('description-input')) && (document.getElementById('description-input').value) &&
        (typeid)) {
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
                document.getElementById('alert').append(
                    "REIMBURSEMENT SUCCESSFULLY SUBMITTED...TAKING YOU BACK TO MAIN MENU");
                setTimeout(function () {
                    window.location.href = "user-landing-page-associate.html";

                }, 3500);
            }
        })
    } else {
        $('#alertNotValidEntry').show();
        document.getElementById('alertNotValidEntry').innerHTML = 'ALL FIELDS ARE REQUIRED. PLEASE TRY AGAIN.';
        setTimeout(function () {
            $('#alertNotValidEntry').hide();
        }, 2000);
    }




    //if (res.status === 200) {

    //}

}



