

const user=JSON.parse(localStorage.getItem('user'));

let inputId=document.getElementById('idInput');
inputId.value=JSON.stringify(user.userid);
console.log(user.userid);


