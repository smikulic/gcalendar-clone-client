export const setMaxSharedEvents = (enrichedEventsPerTimeSlot, multipleTimeSlotEvents) => {
  let clonedEnrichedEventsPerTimeSlot = {...enrichedEventsPerTimeSlot }
  let maxSharedEvents = multipleTimeSlotEvents.length

  multipleTimeSlotEvents.forEach(multipleTimeSlotEvent => {
    if (clonedEnrichedEventsPerTimeSlot[multipleTimeSlotEvent.id] > maxSharedEvents) {
      maxSharedEvents = clonedEnrichedEventsPerTimeSlot[multipleTimeSlotEvent.id]
    }

    clonedEnrichedEventsPerTimeSlot = {
      ...clonedEnrichedEventsPerTimeSlot,
      [multipleTimeSlotEvent.id]: maxSharedEvents,
    }
  })

  return clonedEnrichedEventsPerTimeSlot
}
