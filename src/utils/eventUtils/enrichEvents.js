import { enrichAllTimeSlotsPerEvent } from './enrichAllTimeSlotsPerEvent';

export const enrichEvents = (clonedEvents) => {
  let enrichedEvents = {}
  let eventsPerTimeSlot = {}
  
  clonedEvents.forEach((event) => {
    const eventDateStart = new Date(event.startDate)
    const eventDateEnd = new Date(event.endDate)
    const startEndDiff = Math.abs(eventDateEnd - eventDateStart) / 3600000
    const eventStartHours = eventDateStart.getHours()
    const eventTimeSlots = [...Array(startEndDiff).keys()]
    let eventStartDay = eventDateStart.getDay() - 1

    // Check for Sunday
    eventStartDay = eventStartDay === -1 ? 6 : eventStartDay
    const eventActualStart = eventStartDay * 24 + eventStartHours

    let enrichedEvent = {
      ...event,
      startEndDiff,
      eventStartHours,
      eventStyle: { width: '92%' },
      eventEndHours: eventDateEnd.getHours(),
    }
    
    const {
      updatedEnrichedEvents,
      updatedEventsPerTimeSlot,
    } = enrichAllTimeSlotsPerEvent(eventTimeSlots, enrichedEvent, enrichedEvents, eventsPerTimeSlot, eventActualStart)
    
    enrichedEvents = updatedEnrichedEvents
    eventsPerTimeSlot = updatedEventsPerTimeSlot
  })

  return {
    enrichedEvents,
    eventsPerTimeSlot,
  }
}
