export const setPreviousWeek = (week, currentDate) => {
  let previousWeekDate = new Date(currentDate)
  
  if (week === 'today') {
    previousWeekDate = new Date()
  } else {
    const offset = week === 'previous' ? -7 : 7
    previousWeekDate.setDate(previousWeekDate.getDate() + offset)
  }

  return previousWeekDate
}
