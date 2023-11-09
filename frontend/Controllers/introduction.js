function getStatistics() {
    setTimeout(() => {
        axios.get(`${serverUrl}/users`).then(res => {
            memberNum.innerText = res.data.length
        });
    
        axios.get(`${serverUrl}/items`).then(res => {
            dataNum.innerText = res.data.length
        });
    }, 150)
}
getStatistics()