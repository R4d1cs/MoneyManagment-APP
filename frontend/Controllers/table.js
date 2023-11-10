function getTableData(){
    setTimeout(() => {
        axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then(res => {
            res.data.sort((a,b) => a.date.localeCompare(b.date))

            let totalAmount = 0
            let tbodyElement = document.querySelector('tbody')

            res.data.forEach(item => {
                let moneyAmount = 0

                if (item.type.toLowerCase() === 'kiadás') {
                    totalAmount -= item.amount
                    moneyAmount = item.amount * -1
                } else {
                    totalAmount += item.amount
                    moneyAmount = item.amount
                }

                tbodyElement.innerHTML += `
                    <tr id=${item.ID}>
                        <td>${item.date.toString().split("T")[0]}</td>
                        <td>${item.type.toLowerCase() == 'kiadás' ? `<font color="${redColor}">Kiadás</font>` : `<font color="${greenColor}">Bevétel</font>`}</td>
                        <td>${item.tag}</td>
                        <td>${moneyAmount < 0 ? `<font color="${redColor}">${HUF_Egyenleg.format(moneyAmount)}</font>` : `<font color="${greenColor}">${HUF_Egyenleg.format(moneyAmount)}</font>`}</td>
                        <td><button type="button" class="btn btn-link" id="editDataButton" onclick="editData()"></button><button type="button" class="btn btn-link" id="deleteDataButton" onclick="deleteData(${item.ID})"></button></td>
                    </tr>
                `
            })

            document.querySelector('#tableSumField').innerText = HUF_Egyenleg.format(totalAmount)
        })
    }, tableTimer)
}

function deleteData(itemID) {
    axios.delete(`${serverUrl}/items/${itemID}`).then(res => {
        showMessage('success', 'A kiváltaszott adat törölve!', 3)
        render('table')
        getTableData()
        setBalance()
    })
}