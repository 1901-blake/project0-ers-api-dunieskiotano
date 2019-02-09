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
    let temp = await res.json();
    console.log(temp);

    if (res.status === 200) {
        if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('credentials', JSON.stringify(temp));
        }
        window.location.href = 'user-landing-page.html';
        console.log("login successful")
    } else {
        console.log('failed to login');
        document.getElementById('username-input').value = '';
        document.getElementById('error-message').innerText = 'Login Failed. Try Again';

    }
}
