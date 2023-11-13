function getCalendar() {
    let events = []

    axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then((res) => {
        res.data.forEach((item) => {
            if (item.type.toLowerCase() === 'kiadás') {
                events.push({start: item.date.toString().split("T")[0], y: item.amount * -1, title: `${item.type}: ${HUF_Egyenleg.format(item.amount)} (${item.tag})`, description: item.tag, backgroundColor: redColor, borderColor: darkRedColor})
                return
            }

            events.push({start: item.date.toString().split("T")[0], y: item.amount, title: `${item.type}: ${HUF_Egyenleg.format(item.amount)} (${item.tag})`, description: item.tag, backgroundColor: greenColor, borderColor: darkGreenColor})
        })
    })

    setTimeout(() => {
        const ctxCalendar = document.getElementById("IncomeAndIssuenceCalendar")
        const calendar = new FullCalendar.Calendar(ctxCalendar, {
            initialView: 'dayGridMonth',
            timeZone: 'UTC',
            events: events
        })
        calendar.render()
    }, calendarTimer)
}