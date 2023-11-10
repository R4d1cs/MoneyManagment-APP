function getChart() {
    let datas = []
    let colors = []

    axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then((res) => {
        res.data.forEach((item) => {
            if (item.type.toLowerCase() === 'kiadás') {
                datas.push({x: item.date.toString().split("T")[0], y: item.amount * -1})
                colors.push('#F6795E')
                return
            }

            datas.push({x: item.date.toString().split("T")[0], y: item.amount})
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
                                
                                if (context.parsed.y !== null) {
                                    label += HUF_Egyenleg.format(Math.abs(context.parsed.y))
                                }

                                return label
                            }
                        }
                    }
                },
                responsive: true,
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
    }, 100)
}