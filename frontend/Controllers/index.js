const serverUrl = 'http://localhost:3000'

let loggedInMenu = document.querySelector('#LoggedInMenu')
let loggedOutMenu = document.querySelector('#LoggedOutMenu')
let pageName = document.querySelector('#pageName')

loggedUser = JSON.parse(sessionStorage.getItem('customerUser'));

if (loggedUser != null) {
    loggedInMenu.classList.remove('d-none')
    loggedOutMenu.classList.add('d-none')
    pageName.classList.remove('d-none')
    pageName.innerHTML = `(${loggedUser.ID}) ${loggedUser.name}`
} else {
    loggedInMenu.classList.add('d-none')
    loggedOutMenu.classList.remove('d-none')
    pageName.classList.add('d-none')
    render('login')
}

async function render(view) {
    const main = document.querySelector("main")
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text()

    if (view == 'introduction') getStatistics()
}

function showMessage(type, msg, time){
    let alertBox = document.querySelector('#alertBox')
    let htmlPrefix = ''
    alertBox.classList.add('d-flex')

    switch (type) {
        case 'error':
            htmlPrefix = '<font color="#F6795E">Hiba!</font>'
            break
        case 'info':
            htmlPrefix = '<font color="#5EB6F6">Információ!</font>'
            break
        case 'success':
            htmlPrefix = '<font color="#89DB57">Sikeres!</font>'
            break
    }       
    
    alertBox.innerHTML = `${htmlPrefix} ${msg}`
    setTimeout(() => { alertBox.classList.remove('d-flex') }, time * 1000)
}