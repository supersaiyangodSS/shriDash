const dateDisplay = document.getElementById('date-display')

const formatCustomDate = (inputDate) => {
    const date = new Date(inputDate);
    const days = ['Sunday', 'Monday', 'Tuesday' ,'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const year = date.getFullYear();

    dateDisplay.innerText = `${day} ${dayName} ${year}`;
    return
}

formatCustomDate('11/11/2021')