fetch('http://localhost:3200/users', {
    credentials: 'include'
}).then(resp => resp.json())
    .then(users => {
        console.log(users);
        const tbody = document.getElementById('table-users-body');
        tbody.innerHTML = '';

        //RETRIEVES USERS FROM DATABASE
        users.forEach(element => {
            const tr = document.createElement('tr');

            //ADD NAME DATA TO THE ROW
            let nameData = document.createElement('td');
            nameData.innerText = users.userid;
            tr.appendChild(nameData);

            //ADD USERNAME DATA TO THE ROW;
            let usernameData = document.createElement('td');
            usernameData.innerText = users.username;
            tr.appendChild(usernameData);

            //ADD FIRST NAME DATA TO THE ROW
            let firstNameData = document.createElement('td');
            firstNameData.innerText = users.firstname;
            tr.appendChild.firstNameData;

            //ADD LAST NAME DATA TO THE ROW
            let lastNameData = document.createElement('td');
            lastNameData.innerText = users.lastaname;

            //ADD EMAIL DATA TO THE ROW
            let email = document.createElement('td');
            email.innerText = users.email;
            tr.appendChild(email);

            //ADD ROLE DATA TO THE ROW
            let roles = document.createElement('td');
            roles.innerText = users.role;
            tr.appendChild(roles);

            //ADD ROLE ID DATA TO THE ROW
            let rolesid = document.createElement('td');
            rolesid.innerText = users.roleid;
            tr.appendChild(rolesid);

            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            updateButton.onclick = "updateUser()";
            tr.appendChild(updateButton);


            tbody.appendChild(tr);
        });




    }).catch(console.log);



