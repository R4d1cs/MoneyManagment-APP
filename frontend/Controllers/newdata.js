function newDataButtonCheck() {
    let newDataButton = document.querySelector('#newdataButton')
    let newDate = document.querySelector('#newdataDate')
    let newType = document.querySelector('#newdataType')
    let newAmount = document.querySelector('#newdataAmount')
    let newTag = document.querySelector('#newdataTag')
    
    if ((newDate.value && newType.value && newAmount.value && newTag.value) == '') { 
        newDataButton.disabled = true
        return
    }

    newDataButton.disabled = false
}

function addNewData() {
    let newDate = document.querySelector('#newdataDate')
    let newType = document.querySelector('#newdataType')
    let newAmount = document.querySelector('#newdataAmount')
    let newTag = document.querySelector('#newdataTag')

    axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then(res => {
        let newData = {
            userID: loggedUser.ID, 	
            date: newDate.value, 	
            type: newType.value,
            amount: newAmount.value,
            tag: newTag.value
        }
    
        axios.post(`${serverUrl}/items`, newData).then(()=>{
            showMessage('success', 'Új adat rögzítve az adott dátumra!', 5)
        });

        newDate.value = ''
        newType.value = ''
        newAmount.value = ''
        newTag.value = ''

        setTimeout(() => { setBalance() }, 500)
    })
}

function getToday() {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    
    if (dd < 10) {
       dd = '0' + dd
    }
    
    if (mm < 10) {
       mm = '0' + mm
    } 
        
    today = yyyy + '-' + mm + '-' + dd
    return today
}