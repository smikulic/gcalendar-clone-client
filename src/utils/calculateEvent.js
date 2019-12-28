export function calculateEvent (event, dateByHour, timeSpanLeft) {
  const hourDate = new Date(dateByHour)
  const eventDateStart = new Date(event.startDate)
  const eventDateEnd = new Date(event.endDate)
  const startEndDiff = Math.abs(eventDateEnd - eventDateStart) / 3600000
  const isBetweenEventDuration = hourDate >= eventDateStart && hourDate < eventDateEnd
  
  if (isBetweenEventDuration) {
    const actualDate = new Date()
    const eventStartHours = eventDateStart.getHours()
    const eventEndHours = eventDateEnd.getHours()
    const isEqualHourStart = hourDate.getHours() === eventStartHours
    const daySpan = eventDateEnd.getDay() - eventDateStart.getDay() 
    let eventTimeSpan = eventEndHours - eventStartHours
    
    // Event spans into more days
    if (daySpan > 0) {
      for (let i = 0; i <= daySpan; i++) {
        if (i === 0) { // First day
          eventTimeSpan = 24 - eventStartHours
        } else if (i === daySpan) { // Last day
          eventTimeSpan += eventEndHours
        } else { // Other days in between
          eventTimeSpan += 24
        }
      }
    }

    if (timeSpanLeft === 0) {
      timeSpanLeft = eventTimeSpan
    }

    const firstSpanClass = timeSpanLeft === eventTimeSpan ? 'between-first' : null
    const inBetweenSpanClass = timeSpanLeft > 1 && timeSpanLeft < eventTimeSpan ? 'between' : null
    const lastSpanClass = timeSpanLeft === 1 ? 'between-last' : null

    timeSpanLeft -= 1

    return {
      firstSpanClass,
      inBetweenSpanClass,
      lastSpanClass,
      isEqualHourStart,
      eventStartHours,
      eventEndHours,
      startEndDiff,
      eventTimeLeft: timeSpanLeft,
      isExpired: eventDateEnd < actualDate,
    }
  }

  return false
}
