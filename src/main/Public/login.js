async function login(event) {
    event.preventDefault();
    const username = document.getElementById('input-username').value;
    const password = document.getElementById('input-password').value;
    const credentials = {
        username,
        password
    }
    console.log(credentials);
    const res = await fetch('http://localhost:3200/auth/login', {

        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    })
    try {
        let temp = await res.json();
        console.log(temp);

        if (res.status === 200) {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('credentials', JSON.stringify(temp));
            }
            switch (temp.role.role) {
                case 'admin':
                    window.location.href = 'user-landing-page-admin.html';
                    console.log("login successful");
                    break;
                case 'finance-manager':
                    window.location.href = 'user-landing-page-fmanager.html';
                    console.log("login successful");
                    break;
                case 'associate':
                    window.location.href = 'user-landing-page-associate.html';
                    console.log("login successful");
                    break;
            }


            console.log('failed to login');
            document.getElementById('input-username').value = '';
            document.getElementById('error-message').innerHTML = 'Login Failed. Try Again';

        }
    } catch (err) {
        console.log(err);
        document.getElementById('input-username').value = '';
        document.getElementById('input-password').value = '';
        document.getElementById('error-message').innerText = 'Login Failed. Try Again';
    }
}
