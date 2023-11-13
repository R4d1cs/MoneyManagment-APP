let selectedID = -1

function setCurrentEditDate(){
    let date = document.querySelector('#newdataEditDate')
    date.max =  new Date().toISOString().split("T")[0]
}

function newDataEditButtonCheck() {
    let newEditDataButton = document.querySelector('#newdataEditButton')
    let newEditDate = document.querySelector('#newdataEditDate')
    let newEditType = document.querySelector('#newdataEditType')
    let newEditAmount = document.querySelector('#newdataEditAmount')
    let newEditTag = document.querySelector('#newdataEditTag')
    
    if ((newEditDate.value && newEditType.value && newEditAmount.value && newEditTag.value) == '') { 
        newEditDataButton.disabled = true
        return
    }

    newEditDataButton.disabled = false
}

function setEditData(ID) {
    selectedID = ID

    setTimeout(() => {
        let newEditDate = document.querySelector('#newdataEditDate')
        let newEditType = document.querySelector('#newdataEditType')
        let newEditAmount = document.querySelector('#newdataEditAmount')
        let newEditTag = document.querySelector('#newdataEditTag')
    
        axios.get(`${serverUrl}/items/ID/eq/${selectedID}`).then(res => {
            res.data.forEach(item => {
                newEditDate.value = item.date.toString().split("T")[0]
                newEditType.value = item.type
                newEditAmount.value = item.amount
                newEditTag.value = item.tag
            });
        })
    }, tableTimer * 0.5)
}

function editNewData() {
    setTimeout(() => {
        let newEditDate = document.querySelector('#newdataEditDate')
        let newEditType = document.querySelector('#newdataEditType')
        let newEditAmount = document.querySelector('#newdataEditAmount')
        let newEditTag = document.querySelector('#newdataEditTag')

        let editData = {
            date: newEditDate.value,
            type: newEditType.value,
            amount: newEditAmount.value,
            tag: newEditTag.value
        }

        axios.patch(`${serverUrl}/items/ID/eq/${selectedID}`, editData).then(() => {
            showMessage('success', 'Sikeresen módosítottad a kiválaszott adatot!', 5)
        
            render('table')
            getTableData()
            setBalance()
        })
    }, tableTimer)
}