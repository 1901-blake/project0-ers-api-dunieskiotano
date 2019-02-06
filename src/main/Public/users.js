//send an http get request to the url below
fetch('http://localhost:3200/users/', {
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

            //ADD USERNAME DATA TO THE ROW;
            let usernameData = document.createElement('td');
            usernameData.innerText = user.username;
            tr.appendChild(usernameData);

            //ADD PASSWORD DATA TO THE ROW
            let passwordData = document.createElement('td');
            passwordData.innerText = user.password;
            tr.appendChild(passwordData);

            //ADD FIRST NAME DATA TO THE ROW
            let firstNameData = document.createElement('td');
            firstNameData.innerText = user.firstName;
            tr.appendChild(firstNameData);

            //ADD LAST NAME DATA TO THE ROW
            let lastNameData = document.createElement('td');
            lastNameData.innerText = user.lastName;
            tr.appendChild(lastNameData);

            //ADD EMAIL DATA TO THE ROW
            let email = document.createElement('td');
            email.innerText = user.email;
            tr.appendChild(email);

            //ADD ROLE DATA TO THE ROW
            let roles = document.createElement('td');
            roles.innerText = user.role.role;
            tr.appendChild(roles);

            //ADD ROLE ID DATA TO THE ROW
            let rolesid = document.createElement('td');
            rolesid.innerText = user.role.roleId;
            tr.appendChild(rolesid);

            //ADD A DELETE BUTTON TO THE ROW
            let updateButton = document.createElement('button');
            updateButton.innerText = 'UPDATE';
            updateButton.className = 'btn btn-primary';
            updateButton.addEventListener('click', (e) =>{
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
            window.location.href="update-user.html";
            });
            tr.appendChild(updateButton);
            tbody.appendChild(tr);
            





    }
    



    );




    }).catch (console.log);



