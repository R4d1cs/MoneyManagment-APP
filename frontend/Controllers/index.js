const serverUrl = 'http://localhost:3000'

async function render(view) {
    const main = document.querySelector("main")
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text()

    if (view == 'introduction') getStatistics()
}

function showMessage(msg){
    let alertBox = document.querySelector('#alertBox')
    alertBox.innerHTML = `<strong>Hiba!</strong> ${msg}`
    alertBox.classList.remove('d-none')
}