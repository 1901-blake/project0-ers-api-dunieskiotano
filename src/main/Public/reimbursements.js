const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
const sessionUserLink = document.getElementById('sessionUser');
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName} (${sessionUser.role.role})`;

let buttonBack = document.getElementById('buttonGoBack');
buttonBack.addEventListener('click', (e) => {
    window.history.back();
})
let logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    if (typeof (Storage) !== undefined) {
        sessionStorage.clear();

    }

    window.location.href = "home.html";
})
let mainMenuLink = document.getElementById('mainMenu');
mainMenuLink.addEventListener('click', (e) => {
    window.location.href = `user-landing-page-${sessionUser.role.role}.html`;
})

//send an http get request to the url below
fetch('http://localhost:3200/reimbursements/', {
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
            authorFirstNameData.innerText = `${reimbursement['first name']}`;
            tr.appendChild(authorFirstNameData);

            //Adds author's last name to the row
            let authorLastNameData = document.createElement('td');
            authorLastNameData.innerText = reimbursement['last name'];
            tr.appendChild(authorLastNameData);

            //Adds author's email to the row
            let authorEmailData = document.createElement('td');
            authorEmailData.innerText = reimbursement['email'];
            tr.appendChild(authorEmailData);

            //Adds reimbursement amount to the row
            let reimbursementAmountData = document.createElement('td');
            reimbursementAmountData.innerText = reimbursement.amount;
            tr.appendChild(reimbursementAmountData);

            //Adds reimbursement datesubmited to the row
            let reimbursementDateSubmittedData = document.createElement('td');
            reimbursementDateSubmittedData.innerText = `${reimbursement.dateSubmitted}`;
            tr.appendChild(reimbursementDateSubmittedData);

            //Adds reimbursement dateresolved to the row
            let reimbursementDateResolvedData = document.createElement('td');
            if (reimbursement.dateResolved === undefined || reimbursement.dateResolved === 0) {
                reimbursementDateResolvedData.innerHTML = 'Not Yet Resolved';
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

            let reimbursementStatusData = document.createElement('td');
            reimbursementStatusData.innerText = reimbursement.status;
            tr.appendChild(reimbursementStatusData);

            let reimbursementStatusIdData = document.createElement('td');
            reimbursementStatusIdData.innerText = reimbursement.statusid;
            tr.appendChild(reimbursementStatusIdData);

            let reimbursementTypeData = document.createElement('td');
            reimbursementTypeData.innerText = reimbursement.type;
            tr.appendChild(reimbursementTypeData);

            let reimbursementTypeIdData = document.createElement('td');
            reimbursementTypeIdData.innerText = reimbursement.typeid;
            tr.appendChild(reimbursementTypeIdData);
            console.log(reimbursement);

            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            if (reimbursement.author === sessionUser.userid) {
                updateButton.disabled = true;
            }
            if (sessionUser.role.role === 'admin') {
                updateButton.disabled = true;

            }
            else {
                updateButton.addEventListener('click', (e) => {
                    localStorage.setItem('reimbursement', JSON.stringify(reimbursement));
                    console.log(reimbursement);
                    window.location.href = "update-reimbursement.html";
                });
            }
            tr.appendChild(updateButton);


            tbody.appendChild(tr);






        }




        );




    }).catch(console.log);



