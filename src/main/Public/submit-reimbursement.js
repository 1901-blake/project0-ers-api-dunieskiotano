const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
const sessionUserLink = document.getElementById('sessionUser');
sessionUserLink.innerHTML = sessionUser.username;

let buttonBack=document.getElementById('buttonGoBack');
buttonBack.addEventListener('click', (e) =>{
    window.history.back();
})

async function submitReimbursement(event) {
    event.preventDefault();
    const author = document.getElementById('author-input').value;
    const amount= document.getElementById('amount-input').value;
    const description= document.getElementById('description-input').value;
    const type = document.getElementById('typeSelection').value;
   // const selectedIndex = document.getElementById('typeSelection').selectedIndex;
    //console.log(selectedIndex);
    //const type = selectedIndex.options[selectedIndex].value;
    const reimbursement = {
        author,
        amount,
        description,
        type
        //type
    }
console.log(reimbursement);

    const res = await fetch('http://localhost:3200/reimbursements', {
        method: 'POST',
        body: JSON.stringify(author),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (res.status === 200) {
      console.log('Successful');
    }
    
}


