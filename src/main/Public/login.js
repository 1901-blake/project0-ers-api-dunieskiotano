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
        let user = await res.json();
        console.log(user);

        if (res.status === 200) {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('credentials', JSON.stringify(user));
            }
            switch (user.role.role) {
                case 'admin':
                    window.location.href = 'user-landing-page-admin.html';
                    console.log("login successful");
                    break;
                case 'finance-manager':
                    window.location.href = 'user-landing-page-finance-manager.html';
                    console.log("login successful");
                    break;
                case 'associate':
                    window.location.href = 'user-landing-page-associate.html';
                    console.log("login successful");
                    break;
            }
        }
    } catch (err) {
        console.log(err);
        document.getElementById('input-username').value = '';
        document.getElementById('input-password').value = '';
        document.getElementById('error-message').innerText = 'Login Failed. Try Again';
    }
}
