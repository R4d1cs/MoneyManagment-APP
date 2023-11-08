//const serverUrl = 'http://172.16.100.25:5000';
const serverUrl = 'http://localhost:5000';

let loggedInMenu = document.querySelector('#LoggedInMenu');
let loggedOutMenu = document.querySelector('#LoggedOutMenu');

async function render(view) {
    const main = document.querySelector("main");
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text();
}

function showMessage(msg){
    let alertBox = document.querySelector('#alertBox');
    alertBox.innerHTML = `<strong>Hiba!</strong> ${msg}`;
    alertBox.classList.remove('d-none');
}

loggedUser = JSON.parse(sessionStorage.getItem('stepCounterUser'));

if (loggedUser != null){
    loggedInMenu.classList.remove('d-none');
    loggedOutMenu.classList.add('d-none');
    render('newdata');
}else{
    loggedInMenu.classList.add('d-none');
    loggedOutMenu.classList.remove('d-none');
    render('login');
}