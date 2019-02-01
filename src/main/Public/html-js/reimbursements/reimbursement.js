fetch('http://localhost:3200/reimbursements', {
    credentials: 'include'
}).then(resp => resp.json())
    .then(reimbursements => {
        console.log(reimbursements);
        const tbody = document.getElementById('table-users-body');
        tbody.innerHTML = '';

        //RETRIEVES USERS FROM DATABASE
        reimbursements.forEach(reimbursement => {
            const tr = document.createElement('tr');

            //ADD ID DATA TO THE ROW
            let idData = document.createElement('td');
            idData.innerText = reimbursement.reimbursementid;
            tr.appendChild(idData);

            //ADD NAME DATA TO THE ROW
            let authorData = document.createElement('td');
            authorData.innerText = reimbursmenet.author;
            tr.appendChild(authorData);

            //ADD USERNAME DATA TO THE ROW;
            let amountData = document.createElement('td');
            amountData.innerText = reimbursement.amount;
            tr.appendChild(amountData);

            //ADD FIRST NAME DATA TO THE ROW
            let dateSubmittedData = document.createElement('td');
            dateSubmittedData.innerText = reimbursement.datesubmitted;
            tr.appendChild.dateSubmittedData;

            //ADD FIRST NAME DATA TO THE ROW
            let dateResolvedData = document.createElement('td');
            dateResolvedData.innerText = reimbursement.dateresolved;
            tr.appendChild.dateResolvedData;

            //ADD EMAIL DATA TO THE ROW
            let descriptionData = document.createElement('td');
            descriptionData.innerText = reimbursement.description;
            tr.appendChild(descriptionData);

            //ADD LAST NAME DATA TO THE ROW
            let resolverData = document.createElement('td');
            resolverData.innerText = reimbursement.resolver;
            tr.appendChild(resolverData);


            //ADD ROLE DATA TO THE ROW
            let statusData = document.createElement('td');
            statusData.innerText = reimbursement.status;
            tr.appendChild(statusData);

            //ADD ROLE ID DATA TO THE ROW
            let typeData = document.createElement('td');
            typeData.innerText = reimbursement.type;
            tr.appendChild(typeData);

            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            updateButton.onclick = "updateReimbursement()";
            tr.appendChild(updateButton);


            tbody.appendChild(tr);
        });




    }).catch(console.log);