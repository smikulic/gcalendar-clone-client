import { eventsMock } from './mockData';

export const sortWeeklyEvents = () => {
  var sortedWeeklyEvents = eventsMock;
  
  sortedWeeklyEvents.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  return sortedWeeklyEvents;
}

export const transformDbResponse = () => {
  const sortedWeeklyEvents = sortWeeklyEvents();
  const daysInAWeek = [...Array(7).keys()];
  const hoursInADay = [...Array(24).keys()];

  const eventsPerDay = daysInAWeek.map((_, dayIndex) => {
    const sortedEventsPerDay = sortedWeeklyEvents.filter(event => {
      const eventDay = new Date(event.startDate).getDay()
      return eventDay === dayIndex
    })

    let transformedEvents = sortedEventsPerDay.map(event => {    
      const eventStartDateHour = new Date(event.startDate).getHours()
      const eventEndDateHour = new Date(event.endDate).getHours()
  
      return {
        id: event.id,
        name: event.name,
        label: event.label,
        startHour: eventStartDateHour,
        timeSpan: eventEndDateHour - eventStartDateHour,
      }
    })

    return transformedEvents
  })

  console.log(eventsPerDay)

  // const sortedEventsPerDay = sortedWeeklyEvents.filter(event => {
  //   const eventDay = new Date(event.startDate).getDay()
  //   console.log(eventDay, 1)
  //   return eventDay === 1
  // })
  // console.log(sortedEventsPerDay)

  // let transformedEvents = sortedEventsPerDay.map(event => {    
  //   const eventStartDateHour = new Date(event.startDate).getHours()
  //   const eventEndDateHour = new Date(event.endDate).getHours()

  //   return {
  //     id: event.id,
  //     name: event.name,
  //     label: event.label,
  //     startHour: eventStartDateHour,
  //     timeSpan: eventEndDateHour - eventStartDateHour,
  //   }
  // })

  let constructWeekDataStructure = hoursInADay.map((hour, hourIndex) => {
    // const foundEvent = transformedEvents.filter((event) => {
    //   // console.log(event.startHour, hourIndex)
    //   return event.startHour === hourIndex
    // })

    // console.log(foundEvent)


    const emptyDayData = {};
    return emptyDayData;
  })

  console.log(constructWeekDataStructure)

  return {
    weekDataFormatted: {

    },
  }
}
