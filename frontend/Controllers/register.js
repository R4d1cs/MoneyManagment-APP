function doneButtonCheck() {
    let registerButton = document.querySelector('#registerButton')
    let userName = document.querySelector('#registerName').value
    let userEmail = document.querySelector('#registerEmail').value
    let userPassword = document.querySelector('#registerPassword').value
    
    if ((userName && userEmail && userPassword) == '') { 
        registerButton.disabled = true
        return
    }

    registerButton.disabled = false
}

function registerUser() {
    let userName = document.querySelector('#registerName').value
    let userEmail = document.querySelector('#registerEmail').value
    let userPassword = document.querySelector('#registerPassword').value

    axios.get(`${serverUrl}/users/email/eq/${userEmail}`).then(res => {
        if (res.data.length > 0) {
            showMessage('error', 'A megadott e-mail cím már használatban van!')
            return
        }

        let newUser = {
            name: userName,
            emal: userEmail,
            passwd: userPassword
        }

        axios.post(`${serverUrl}/users`, newUser).then(res => {
            showMessage('success', 'Sikeres regisztráció!')
            document.location.href = 'index.html'
        })
    });
}