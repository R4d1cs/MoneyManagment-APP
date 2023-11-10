function getChart() {
    let datas = []
    let colors = []

    axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then((res) => {
        res.data.sort((a,b) => a.date.localeCompare(b.date))
        res.data.forEach((item) => {
            if (item.type.toLowerCase() === 'kiadás') {
                datas.push({x: item.date.toString().split("T")[0], y: item.amount * -1, type: item.type, tooltip: item.tag})
                colors.push('#F6795E')
                return
            }

            datas.push({x: item.date.toString().split("T")[0], y: item.amount, type: item.type, tooltip: item.tag})
            colors.push('#89DB57')
        })
    })

    setTimeout(() => {
        const ctxChart = document.getElementById("IncomeAndIssuenceChart")

        new Chart(ctxChart, {
            type: 'bar',
            data: {
                datasets: [{
                    label: ' ',
                    data: datas,
                    backgroundColor: colors
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Kiadás / Bevétel grafikon',
                        color: 'black',
                        font: {
                            size: 15
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || ' '
                                
                                let dataType = context.dataset.data[context.dataIndex].type
                                let dataMoneyFormat = HUF_Egyenleg.format(Math.abs(context.parsed.y))
                                let dataTag = context.dataset.data[context.dataIndex].tooltip
                                
                                if (context.parsed.y !== null) {
                                    label += `${dataType}: ${dataMoneyFormat} (${dataTag})`
                                }

                                return label
                            }
                        }
                    }
                },
                responsive: false,
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: false
                  }
                }
            }
        })
    }, chartTimer)
}