export const setEventsStyle = (enrichedEvents, enrichedEventsSameTimeSlot) => {
  const clonedEnrichedEvents = {...enrichedEvents }
  const updatedEvents = {...enrichedEvents }

  Object.entries(clonedEnrichedEvents).forEach(([enrichedEventKey, enrichedEvent]) => {
    let updatedEnrichedEvent = []

    enrichedEvent.forEach(enrichedEventTimeSlot => {
      let updatedEnrichedEventTimeSlot = { ...enrichedEventTimeSlot }

      if (enrichedEventsSameTimeSlot[enrichedEventTimeSlot.id]) {
        updatedEnrichedEventTimeSlot = {
          ...updatedEnrichedEventTimeSlot,
          eventStyle: { width: `${92 / enrichedEventsSameTimeSlot[enrichedEventTimeSlot.id]}%` }
        }
      }
      updatedEnrichedEvent.push(updatedEnrichedEventTimeSlot)
    })

    updatedEvents[enrichedEventKey] = updatedEnrichedEvent
  })

  return updatedEvents
}
