
//Creates an h1 element to display a welcome message to the user
let h1 = document.createElement('h1');
const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
h1.innerHTML = (`Welcome Back, ${sessionUser.firstName} ${sessionUser.lastName}`).toUpperCase();
document.getElementById('welcome').appendChild(h1);

//Finds the sessionUser element and assigns to sessionUserLink constant
const sessionUserLink = document.getElementById('sessionUser');


//Shows the user's first and last name in the navigation bar
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName}(${sessionUser.role.role})`;

//this section logs out the user at will
let logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }
    window.location.href = "home.html";
})

//Creates a button to close the associate's profile table
let buttonProfileClose = document.getElementById("closeProfile");
buttonProfileClose.addEventListener('click', (e) => {
    document.getElementById('tableAssociateProfile').style.display = "none";
})
//Creates a button to close the associate's reimbursement table
let buttonReimbursementClose = document.getElementById("closeReimbursement");
buttonReimbursementClose.addEventListener('click', (e) => {
    document.getElementById('tableAssociateReimbursement').style.display = "none";
})

//Finds the link for reimbursement table and shows it
let reimbursementsLink = document.getElementById("reimbLink");
reimbursementsLink.addEventListener('click', (e) => {
    $('#tableAssociateProfile').hide();//hides the profile table
    console.log(sessionUser.userid);
    $('#tableAssociateReimbursement').show();
    fetch(`http://localhost:3200/reimbursements/author/${sessionUser.userid}`, {//fetches reimbursements by user id
        credentials: 'include'
    }).then(resp => resp.json())
        .then(reimbursements => {
            console.log(reimbursements);
            const tbody = document.getElementById('table-reimbursements-body');
            tbody.innerHTML = '';

            //Retrieves reimbursements from DB
            reimbursements.forEach(reimbursement => {
                const tr = document.createElement('tr');

                //Adds reimbursement ID to the row
                let reimbursementIdData = document.createElement('td');
                reimbursementIdData.innerText = reimbursement.reimbursementid;
                tr.appendChild(reimbursementIdData);

                //Adds reimbursement author to the row
                let reimbursementAuthorData = document.createElement('td');
                reimbursementAuthorData.innerText = reimbursement.author;
                tr.appendChild(reimbursementAuthorData);

                //Adds reimbursement amount to the row
                let authorFirstNameData = document.createElement('td');
                authorFirstNameData.innerText = `${sessionUser.firstName}`;
                tr.appendChild(authorFirstNameData);

                //Adds author's last name to the row
                let authorLastNameData = document.createElement('td');
                authorLastNameData.innerText = `${sessionUser.lastName}`;
                tr.appendChild(authorLastNameData);

                //Adds author's email to the row
                let authorEmailData = document.createElement('td');
                authorEmailData.innerText = `${sessionUser.email}`;
                tr.appendChild(authorEmailData);

                //Adds reimbursement amount to the row
                let reimbursementAmountData = document.createElement('td');
                reimbursementAmountData.innerText = reimbursement.amount;
                tr.appendChild(reimbursementAmountData);

                //Adds reimbursement datesubmitted to the row
                let reimbursementDateSubmittedData = document.createElement('td');
                reimbursementDateSubmittedData.innerText = `${reimbursement.dateSubmitted}`;
                tr.appendChild(reimbursementDateSubmittedData);

                //Adds reimbursement dateresolved to the row
                let reimbursementDateResolvedData = document.createElement('td');
                if (reimbursement.dateResolved === 0 || reimbursement.dateResolved===undefined) {
                    reimbursementDateResolvedData.innerText = '';
                } else {
                    reimbursementDateResolvedData.innerText = reimbursement.dateResolved;
                }
                tr.appendChild(reimbursementDateResolvedData);

                //Adds reimbursement description to the row
                let reimbursementDescriptionData = document.createElement('td');
                reimbursementDescriptionData.innerText = reimbursement.description;
                tr.appendChild(reimbursementDescriptionData);

                //Adds reimbursement description to the row
                let reimbursementResolverData = document.createElement('td');
                reimbursementResolverData.innerText = reimbursement.resolver;
                tr.appendChild(reimbursementResolverData);

                //Assigns status based on status id
                switch (reimbursement.status) {
                    case 1:
                        reimbursement.status = "Pending";
                        break;
                    case 2:
                        reimbursement.status = "Approved";
                        break;
                    case 3:
                        reimbursement.status = "Denied";
                        break;
                }
                let reimbursementStatusData = document.createElement('td');
                reimbursementStatusData.innerText = reimbursement.status;
                tr.appendChild(reimbursementStatusData);

                //Assigns types based on type id
                switch (reimbursement.type) {
                    case 1:
                        reimbursement.type = "Lodging";
                        break;
                    case 2:
                        reimbursement.type = "Travel";
                        break;
                    case 3:
                        reimbursement.type = "Food";
                        break;
                    case 4:
                        reimbursement.type = "Other";
                        break;
                }

                let reimbursementTypeData = document.createElement('td');
                reimbursementTypeData.innerText = reimbursement.type;
                tr.appendChild(reimbursementTypeData);
                tbody.appendChild(tr);
            })

        })
})

//Creates a link for the the profile table
let pLink = document.getElementById('profileLink');
pLink.addEventListener('click', (e) => {
    $('#tableAssociateReimbursement').hide();
    $('#tableAssociateProfile').show();
    console.log(sessionUser);
    const tbody1 = document.getElementById('table-user-body');
    tbody1.innerHTML = '';
    const tr = document.createElement('tr');
    //ADD ID DATA TO THE ROW
    let idData = document.createElement('td');
    idData.innerText = sessionUser.userid;
    tr.appendChild(idData);

    //ADD USERNAME DATA TO THE ROW;
    let usernameData = document.createElement('td');
    usernameData.innerText = sessionUser.username;
    tr.appendChild(usernameData);

    //ADD PASSWORD DATA TO THE ROW
    let passwordData = document.createElement('td');
    passwordData.innerText = '**********';
    tr.appendChild(passwordData);

    //ADD FIRST NAME DATA TO THE ROW
    let firstNameData = document.createElement('td');
    firstNameData.innerText = sessionUser.firstName;
    tr.appendChild(firstNameData);

    //ADD LAST NAME DATA TO THE ROW
    let lastNameData = document.createElement('td');
    lastNameData.innerText = sessionUser.lastName;
    tr.appendChild(lastNameData);

    //ADD EMAIL DATA TO THE ROW
    let email = document.createElement('td');
    email.innerText = sessionUser.email;
    tr.appendChild(email);

    //ADD ROLE DATA TO THE ROW
    let roles = document.createElement('td');
    roles.innerText = sessionUser.role.role;
    tr.appendChild(roles);

    //ADD ROLE ID DATA TO THE ROW
    let rolesid = document.createElement('td');
    rolesid.innerText = sessionUser.role.roleId;
    tr.appendChild(rolesid);
    tbody1.appendChild(tr);
})

//Creates a button to submit reimbursements and routes user to the reimbursement submission pages
let buttonSubmitReimbursement = document.getElementById('submitReimbursementAssociate');
buttonSubmitReimbursement.addEventListener('click', (e) => {
    window.location.href = "associate-reimbursement-submission.html";
})