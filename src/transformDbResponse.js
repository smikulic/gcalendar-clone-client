const sortWeeklyEvents = (events) => {
  let sortedWeeklyEvents = events
  return sortedWeeklyEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
}

export const transformDbResponse = (events) => {
  const sortedWeeklyEvents = sortWeeklyEvents(events)
  const daysInAWeek = [...Array(7).keys()]
  const hoursInADay = [...Array(24).keys()]

  // get all the days in a week filled with events data
  const eventsPerDay = daysInAWeek.map((_, dayIndex) => {
    const sortedEventsPerDay = sortedWeeklyEvents.filter(event => new Date(event.startDate).getDay() === dayIndex + 1)
    const transformedEvents = sortedEventsPerDay.map(event => {    
      const eventStartDateHour = new Date(event.startDate).getHours()
      const eventEndDateHour = new Date(event.endDate).getHours()
      return {
        id: event.id,
        name: event.name,
        label: event.label,
        startHour: eventStartDateHour,
        timeSpan: eventEndDateHour - eventStartDateHour,
      }
    })

    // This will construct 24 hours object array, it contains events for that given day
    let emptyHoursToOmit = 0
    const eventsPerHour = hoursInADay.map((_, hourIndex) => {
      const foundEvent = transformedEvents.filter((event) => event.startHour === hourIndex)

      // if element was found calculate it's time span - we need that to remove extra hour objects
      if (foundEvent[0]) {
        emptyHoursToOmit = foundEvent[0].timeSpan - 1;
        return foundEvent[0]
      }

      // return null for extra hour objects that will be filtered out in the next step
      if (emptyHoursToOmit > 0) {
        emptyHoursToOmit -= 1
        return null
      }
  
      const emptyDayData = {}
      return emptyDayData
    })

    // Filter out null hours
    const eventsPerHourPristine = eventsPerHour.filter((hourSlot) => hourSlot !== null)

    // FINAL RETURN
    return eventsPerHourPristine
  })
  // console.log(eventsPerDay)

  return {
    dateFrom: 'December 02, 2019 00:00:00',
    dateTo: 'December 08, 2019 23:00:00',
    dateFormatted: 'December 2019',
    events: eventsPerDay,
  }
}
