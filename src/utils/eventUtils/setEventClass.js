export const setEventClass = (enrichedEvent, totalTimeSlotsPerEvent, timeSlot) => {
  let eventClass = 'between-first'

  // first & last hour has both sides borders
  if (totalTimeSlotsPerEvent === 1) {
    eventClass = 'between-first between-last'
  // last hour has bottom sides borders
  } else if (totalTimeSlotsPerEvent - 1 === timeSlot) {
    eventClass = 'between-last' 
  // middle hours have no borders
  } else if (timeSlot !== 0) {
    eventClass = 'between' 
  }

  return {
    ...enrichedEvent,
    eventClass,
  }
}
