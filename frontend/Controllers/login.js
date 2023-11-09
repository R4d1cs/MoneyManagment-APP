function doneButtonCheck() {
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
        } else {
            document.location.href = 'index.html'
            getStatistics()
        }
    })
}