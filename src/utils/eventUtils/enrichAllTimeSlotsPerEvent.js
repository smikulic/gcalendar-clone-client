import { setEventClass } from './setEventClass';
import { setMaxSharedEvents } from './setMaxSharedEvents';

export const enrichAllTimeSlotsPerEvent = (
  eventTimeSlots,
  enrichedEvent,
  enrichedEvents,
  eventsPerTimeSlot,
  eventActualStart,
) => {
  const totalTimeSlotsPerEvent = eventTimeSlots.length
  let updatedEnrichedEvents = { ...enrichedEvents }
  let updatedEventsPerTimeSlot = { ...eventsPerTimeSlot }
  
  eventTimeSlots.forEach(timeSlot => {
    const timeSlotActualHour = eventActualStart + timeSlot
    const eventExists = enrichedEvents[timeSlotActualHour]
    enrichedEvent = setEventClass(enrichedEvent, totalTimeSlotsPerEvent, timeSlot)
    let timeSlotEvents = [enrichedEvent]

    // If there are multiple events for one time slot
    if (eventExists) {
      timeSlotEvents = timeSlotEvents.concat(eventExists)
      // Longest event is furthest left
      timeSlotEvents.sort((a, b) => b.startEndDiff - a.startEndDiff)
      updatedEventsPerTimeSlot = setMaxSharedEvents(updatedEventsPerTimeSlot, timeSlotEvents)
    }
    
    updatedEnrichedEvents = {
      ...updatedEnrichedEvents,
      [timeSlotActualHour]: timeSlotEvents,
    }
  })

  return {
    updatedEnrichedEvents,
    updatedEventsPerTimeSlot,
  }
}
