const serverUrl = 'http://localhost:3000'

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
            htmlPrefix = '<font color="#F6795E"><strong>Hiba!</strong></font>'
            break
        case 'info':
            htmlPrefix = '<font color="#5EB6F6"><strong>Információ!</strong></font>'
            break
        case 'success':
            htmlPrefix = '<font color="green"><strong>Sikeres!</strong></font>'
            break
    }       
    
    alertBox.innerHTML = `${htmlPrefix} ${msg}`
    setTimeout(() => { alertBox.classList.remove('d-flex') }, time * 1000)
}