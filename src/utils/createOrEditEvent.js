export const createOrEditEvent = (newEventId, newEvent, clonedEvents) => {
  let updatedEvents = [...clonedEvents]
  
  // if event exists then edit/update it
  const foundEvent= clonedEvents.findIndex(event => event.id === newEventId)
  if (foundEvent > 0) {
    clonedEvents[foundEvent] = newEvent
    updatedEvents = [...clonedEvents]
  } else {
    updatedEvents.push(newEvent)
  }
  
  return updatedEvents
}