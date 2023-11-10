function getChart() {
    let IncomeDatas = []
    let IssuenceDatas = []

    axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then((res) => {
        res.data.forEach((item) => {
            if (item.type.toLowerCase() === 'bevétel') {
                IncomeDatas.push({x: item.date.toString().split("T")[0], y: item.amount})
                return
            }

            IssuenceDatas.push({x: item.date.toString().split("T")[0], y: item.amount})
        })
    })

    setTimeout(() => {
        const ctxChart = document.getElementById("IncomeAndIssuenceChart")

        new Chart(ctxChart, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Bevétel',
                    data: IncomeDatas,
                    borderWidth: 1,
                    borderColor: '#89DB57',
                    backgroundColor: '#89DB57'
                }, {
                    label: 'Kiadás',
                    data: IssuenceDatas,
                    borderWidth: 1,
                    borderColor: '#F6795E',
                    backgroundColor: '#F6795E'
                }]
            },
            options: {
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true
                  }
                }
              }
        })
    }, 100)
}