function getMonday(d) {
  d = new Date(d)
  let day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  d.setDate(diff)

  return new Date(d.setHours(0,0,0,0))
}

function getSunday(d) {
  d = new Date(d)
  let lastDay = d.getDate() - (d.getDay() - 1) + 6
  d.setDate(lastDay)

  return new Date(d.setHours(23,0,0,0))
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

export const getCurrentWeek = (date) => {
  const weekStart = getMonday(date)
  const weekEnd = getSunday(date)
  const weekStartString = weekStart.toString()
  const weekEndString = weekEnd.toString()
  const firstDay = weekStart.getDate()
  const currMonth = date.getMonth()
  const daysInAWeek = [...Array(7).keys()]
  let numberOfDaysToAdd = []
  let maxDaysInAMonth = 30

  switch(currMonth) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      maxDaysInAMonth = 31
      break
    case 1:
      maxDaysInAMonth = daysInMonth(2, date.getFullYear())
      break
    default:
      maxDaysInAMonth = 30
  }

  daysInAWeek.forEach(day => {
    let dayOfTheWeek = firstDay + day
    let maxDaysDiff = dayOfTheWeek - maxDaysInAMonth
    dayOfTheWeek = maxDaysDiff > 0 ? maxDaysDiff : dayOfTheWeek
    numberOfDaysToAdd.push(dayOfTheWeek)
  })

  const weekLabels = [
    { label: 'Mon', date: numberOfDaysToAdd[0] },
    { label: 'Tue', date: numberOfDaysToAdd[1] },
    { label: 'Wed', date: numberOfDaysToAdd[2] },
    { label: 'Thu', date: numberOfDaysToAdd[3] },
    { label: 'Fri', date: numberOfDaysToAdd[4] },
    { label: 'Sat', date: numberOfDaysToAdd[5] },
    { label: 'Sun', date: numberOfDaysToAdd[6] },
  ]

  return {
    weekStart,
    weekEnd,
    weekStartString,
    weekEndString,
    weekLabels,
  }
}
