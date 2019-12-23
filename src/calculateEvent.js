export function calculateEvent (event, dateByHour, timeSpanLeft) {
  const hourDate = new Date(dateByHour)
  const eventDateStart = new Date(event.startDate)
  const eventDateEnd = new Date(event.endDate)
  const isEqualDay = (hourDate.toDateString() === eventDateStart.toDateString()) || 
                    (hourDate.toDateString() === eventDateEnd.toDateString())
  
  if (isEqualDay) {
    const isBetweenEventDuration = hourDate >= eventDateStart && hourDate < eventDateEnd
    
    if (isBetweenEventDuration) {
      const actualDate = new Date()
      const eventStartHours = eventDateStart.getHours()
      const eventEndHours = eventDateEnd.getHours()
      const isEqualHourStart = hourDate.getHours() === eventStartHours
      let eventTimeSpan = eventEndHours - eventStartHours
      
      // Event spans into next day
      if (eventEndHours < eventStartHours) {
        eventTimeSpan = 24 - eventStartHours + eventEndHours
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
        eventTimeLeft: timeSpanLeft,
        isExpired: eventDateEnd < actualDate,
      }
    }
  }

  return false
}
