import React from 'react';

export function calculateEvent (event, hourNode, dateByHour, timeSpanLeft) {
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
      
      hourNode = (
        <div className={`hour scheduled l${event.label} ${firstSpanClass} ${inBetweenSpanClass} ${lastSpanClass}`}>
          { isEqualHourStart && (
            <React.Fragment>
              <div className="event-name">{event.name}</div>
              <div className="event-time">{eventStartHours}:00 - {eventEndHours}:00</div>
            </React.Fragment>
          )}
        </div>
      )

      timeSpanLeft -= 1
    }
  }

  return {
    eventNode: hourNode,
    eventTimeLeft: timeSpanLeft,
  };
}
