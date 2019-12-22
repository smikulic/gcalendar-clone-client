export function calculateEvent (event, dateByHour, timeSpanLeft) {
  const hourDate = new Date(dateByHour)
  const eventDateStart = new Date(event.startDate)
  const eventDateEnd = new Date(event.endDate)
  const isEqualDay = (hourDate.toDateString() === eventDateStart.toDateString()) || 
                    (hourDate.toDateString() === eventDateEnd.toDateString())
  const eventStartHours = eventDateStart.getHours()
  const eventEndHours = eventDateEnd.getHours()
  
  if (isEqualDay) {
    const isEqualHourStart = hourDate.getHours() === eventStartHours
    const isBetweenEventDuration = hourDate >= eventDateStart && hourDate < eventDateEnd
    
    if (isBetweenEventDuration) {
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
      }
    }
  }

  return false
}
