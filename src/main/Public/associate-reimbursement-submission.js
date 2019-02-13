//Gets the session user
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
console.log(sessionUser);
//Finds link with sessionUser id
const sessionUserLink = document.getElementById('sessionUser');

//Assigns name & last name to sessionUserLink
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName}`



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
        default:
            typeid = 4;

    }
    console.log(status, type);
    //Creates object userUpdated to be sent to DB
    let reimbursementSubmitted = {
        author: inputs[1].value,
        amount: inputs[4].value,
        datesubmitted: Math.floor(Date.now() / 1000),
        dateresolved: null,
        description: inputs[5].value,
        resolver: 2,
        status: 1,
        type: typeid
    }

    console.log(reimbursementSubmitted);
    //fetches the url and performs update
    fetch('http://localhost:3200/reimbursements/', {

        method: 'POST',
        body: JSON.stringify(reimbursementSubmitted),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    }).catch(console.log());




    //if (res.status === 200) {

    //}

}



