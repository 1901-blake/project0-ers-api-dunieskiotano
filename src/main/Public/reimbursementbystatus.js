const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
const sessionUserLink = document.getElementById('sessionUser');
sessionUserLink.innerHTML = `${sessionUser.firstName} ${sessionUser.lastName}`;

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

const status = JSON.parse(localStorage.getItem('reimbursermentstatus'));
const stringStatus = "status";

fetch(`http://localhost:3200/reimbursements/${stringStatus}/${status}`, {
    credentials: 'include'
}).then(resp => resp.json())
    .then(reimbursements => {
        console.log(reimbursements);
        const tbody = document.getElementById('table-reimbursementsbystatus-body');
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
            let reimbursementAmountData = document.createElement('td');
            reimbursementAmountData.innerText = reimbursement.amount;
            tr.appendChild(reimbursementAmountData);

            //Adds reimbursement datesubmited to the row
            let reimbursementDateSubmittedData = document.createElement('td');
            reimbursementDateSubmittedData.innerText = `${reimbursement.dateSubmitted}`;
            tr.appendChild(reimbursementDateSubmittedData);

            //Adds reimbursement dateresolved to the row
            let reimbursementDateResolvedData = document.createElement('td');
            if (reimbursement.dateResolved === undefined) {
                reimbursementDateResolvedData.innerText = ' ';
            }
            else {
                reimbursementDateResolvedData.innerText = `${reimbursement.dateResolved}`;
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

            let reimbursementStatusIdData = document.createElement('td');
            reimbursementStatusIdData.innerText = reimbursement.status;
            tr.appendChild(reimbursementStatusIdData);

            let reimbursementTypeIdData = document.createElement('td');
            reimbursementTypeIdData.innerText = reimbursement.type;
            tr.appendChild(reimbursementTypeIdData);


            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            updateButton.addEventListener('click', (e) => {
                window.location.href = "update-user.html";
            });
            tr.appendChild(updateButton);
            tbody.appendChild(tr);






        }




        );





    }).catch(console.log());