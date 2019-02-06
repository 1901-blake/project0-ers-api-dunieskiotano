//send an http get request to the url below
fetch('http://localhost:3200/reimbursements/', {
    credentials: 'include'
}).then(resp => resp.json())
    .then(reimbursements => {
        console.log(reimbursements);
        const tbody = document.getElementById('table-reimbursements-body');
        tbody.innerHTML = '';

        //RETRIEVES USERS FROM DATABASE
        reimbursements.forEach(reimbursement => {
            const tr = document.createElement('tr');

            //Adds reimbursement ID to the row
            let reimbursementIdData = document.createElement('td');
            reimbursementIdData.innerText = reimbursement.reimbursementid;
            tr.appendChild(reimbursementIdData);

           
            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            updateButton.addEventListener('click', (e) =>{
            window.location.href="update-user.html";
            });
            tr.appendChild(updateButton);
            tbody.appendChild(tr);
            





    }
    



    );




    }).catch (console.log);



