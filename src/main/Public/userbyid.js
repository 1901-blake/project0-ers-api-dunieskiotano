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
const id = JSON.parse(localStorage.getItem('id'));

console.log(id);


fetch(`http://localhost:3200/users/${id}/`, {
    credentials: 'include'
}).then(resp => resp.json())
    .then(u => {



        //console.log(id);
        const tbody = document.getElementById('table-users-body');
        tbody.innerHTML = '';

        //RETRIEVES USERS FROM DATABASE
        const tr = document.createElement('tr');

        //ADD ID DATA TO THE ROW
        let idData = document.createElement('td');
        idData.innerText = u.userid;
        tr.appendChild(idData);



        //ADD USERNAME DATA TO THE ROW;
        let usernameData = document.createElement('td');
        usernameData.innerText = u.username;
        tr.appendChild(usernameData);


        let passwordData = document.createElement('td');
        passwordData.innerText = '***********';
        tr.appendChild(passwordData);

        //ADD FIRST NAME DATA TO THE ROW
        let firstNameData = document.createElement('td');
        firstNameData.innerText = u.firstName;
        tr.appendChild(firstNameData);

        //ADD LAST NAME DATA TO THE ROW
        let lastNameData = document.createElement('td');
        lastNameData.innerText = u.lastName;
        tr.appendChild(lastNameData);

        //ADD EMAIL DATA TO THE ROW
        let emailData = document.createElement('td');
        emailData.innerText = u.email;
        tr.appendChild(emailData);

        //ADD ROLE DATA TO THE ROW
        let roleData = document.createElement('td');
        roleData.innerText = u.role.role;
        tr.appendChild(roleData);

        //ADD ROLE ID DATA TO THE ROW
        let rolesIdData = document.createElement('td');
        rolesIdData.innerText = u.role.roleId;
        tr.appendChild(rolesIdData);

        //ADD A DELETE BUTTON TO THE ROW
        /*let updateButton = document.createElement('button');
        updateButton.innerText = 'DELETE';
        updateButton.className = 'btn btn-danger';
        updateButton.onclick = "updateUser()";
        tr.appendChild(updateButton);*/


        tbody.appendChild(tr);




    }).catch(console.log());



