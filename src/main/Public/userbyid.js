fetch('http://localhost:3200/users/:id', {
    credentials: 'include'
}).then(resp => resp.json())
    .then(users => {
        console.log(users);
        const tbody = document.getElementById('table-users-body');
        tbody.innerHTML = '';

        //RETRIEVES USERS FROM DATABASE
        users.forEach(user => {
            const tr = document.createElement('tr');

            //ADD ID DATA TO THE ROW
            let idData = document.createElement('td');
            idData.innerText = user.userid;
            tr.appendChild(idData);

            //ADD NAME DATA TO THE ROW
            let nameData = document.createElement('td');
            nameData.innerText = user.userid;
            tr.appendChild(nameData);

            //ADD USERNAME DATA TO THE ROW;
            let usernameData = document.createElement('td');
            usernameData.innerText = user.username;
            tr.appendChild(usernameData);

            //ADD FIRST NAME DATA TO THE ROW
            let firstNameData = document.createElement('td');
            firstNameData.innerText = users.firstname;
            tr.appendChild.firstNameData;

            //ADD LAST NAME DATA TO THE ROW
            let lastNameData = document.createElement('td');
            lastNameData.innerText = user.lastaname;
            tr.appendChild(lastNameData);

            //ADD EMAIL DATA TO THE ROW
            let emailData = document.createElement('td');
            emailData.innerText = user.email;
            tr.appendChild(emailData);

            //ADD ROLE DATA TO THE ROW
            let roleData = document.createElement('td');
            roleData.innerText = user.role;
            tr.appendChild(roleData);

            //ADD ROLE ID DATA TO THE ROW
            let rolesIdData = document.createElement('td');
            rolesIdData.innerText = user.roleid;
            tr.appendChild(rolesIdData);

            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            updateButton.onclick = "updateUser()";
            tr.appendChild(updateButton);


            tbody.appendChild(tr);
        });




    }).catch(console.log);



