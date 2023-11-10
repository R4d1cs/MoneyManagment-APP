function loginButtonCheck() {
    let loginButton = document.querySelector('#loginButton')
    let userName = document.querySelector('#loginName').value
    let userPassword = document.querySelector('#loginPassword').value
    
    if ((userName && userPassword) == '') { 
        loginButton.disabled = true
        return
    }

    loginButton.disabled = false
}

function loginUser() {
    let userName = document.querySelector('#loginName').value
    let userPassword = document.querySelector('#loginPassword').value

    let user = {
        name: userName,
        passwd: userPassword
    };

    axios.post(`${serverUrl}/loginUser`, user).then(res => {
        if (res.data.length == 0) {
            showMessage('error', 'Hibás adatokat adtál meg!', 5)
            return
        }

        showMessage('success', 'Sikeres bejelentkezés!', loginTimer)

        setTimeout(() => {
            sessionStorage.setItem('customerUser', JSON.stringify(res.data[0]));
            document.location.href = 'index.html'
        }, loginTimer * 1000)
    })
}

function logoutUser(){
    showMessage('success', 'Sikeres kijelentkezés!', logutTimer)

    setTimeout(() => {
        sessionStorage.removeItem('customerUser')
        document.location.href = 'index.html'
        getStatistics()
    }, logutTimer * 1000)
}