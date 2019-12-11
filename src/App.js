import React, { Component } from 'react';
import './App.css';
import { totalHours, eventsMock } from './mockData';
import { getCurrentWeek } from './getCurrentWeek';
import { transformDbResponse } from './transformDbResponse';

class App extends Component {
  constructor() {
    super()

    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);
    this.getRangeValues = this.getRangeValues.bind(this);

    this.state = {
      currentWeek: getCurrentWeek(new Date()),
      activeEvent: null,
      activeEventDetails: {},
      currentWeekData: transformDbResponse(eventsMock),
      clonedEvents: eventsMock,
      totalHoursByWeek: [...Array(168).keys()], // 24 hours * 7 days
      dateFrom: 'December 02, 2019 00:00:00',
      dateTo: 'December 08, 2019 23:00:00',
    }
  }

  handleSaveEvent = (_, id) => {
    const { activeEventDetails } = this.state;
    const selectedDateStart = activeEventDetails.selectedDateStart
    const selectedDateEnd = activeEventDetails.selectedDateEnd

    const newEvent = {
      id: '100abc5',
      name: 'Test yay',
      startDate: selectedDateStart.toString(),
      endDate: selectedDateEnd.toString(),
      description: null,
      label: 3,
    };

    const updatedEvents = [...this.state.clonedEvents]
    updatedEvents.push(newEvent)

    this.setState({
      clonedEvents: updatedEvents,
    })
  }

  handleCreateEvent = (_, id) => {
    this.setState({ activeEvent: id });
  }

  getRangeValues = (lowEnd, highEnd) => {
    if (highEnd <= lowEnd) return false
    var arr = [],
    c = highEnd - lowEnd + 1;
    while ( c-- ) {
      arr[c] = highEnd--
    }

    return arr
  }

  render() {
    const {
      currentWeekData,
      activeEvent,
      currentWeek,
      clonedEvents,
      totalHoursByWeek,
      dateFrom,
    } = this.state;

    let topRange = []
    let startTopRange = 18
    for(let i = 0; i < 7; i++) {
      topRange = topRange.concat(this.getRangeValues(startTopRange, startTopRange+5))
      startTopRange += 24
    }

    const conditionsPopupTop = topRange
    const conditionsPopupRight = [...Array(72).keys()]

    return (
      <div className="App">
        <div className="header">
          {currentWeekData.dateFormatted}
        </div>
        <div className="week-overview">
          <div className="hours-axis">
            { totalHours.map((hour, key) => {
              return <div key={key} className="hour-label">{hour}</div>
            })}
          </div>
          {/* { Object.values(currentWeekData.events).map((day, keyDay)=>{
            return (
              <div key={keyDay} className="day">
                <div className="day-label">
                  <div>{currentWeek.weekLabels[keyDay].label}</div>
                  <div>{currentWeek.weekLabels[keyDay].date}</div>
                </div>
              </div>
            )
          })} */}

          <div className="hours-container">
            { totalHoursByWeek.map((_, hourKey) => {
                const dateByHour = new Date(dateFrom).setHours(hourKey)
                const isCurrentHourActive = activeEvent === hourKey
                let hourNode = (
                  <div key={hourKey} className={ isCurrentHourActive ? 'hour is-active' : `hour` } onClick={(event) => this.handleCreateEvent(event, hourKey)}>
                    { isCurrentHourActive && (
                      <div className={`create-event-popup ${conditionsPopupTop.includes(activeEvent) && 'popup-top'} ${conditionsPopupRight.includes(activeEvent) && 'popup-right'}`}>
                        <input type="text" />
                        <button onClick={(event) => this.handleSaveEvent(event, hourKey)}>Save</button>
                      </div>
                    )}
                  </div>
                )

                clonedEvents.forEach((event, eventKey) => {
                  const hourDate = new Date(dateByHour)
                  const eventDateStart = new Date(event.startDate)
                  const eventDateEnd = new Date(event.endDate)
                  const isEqualDay = (hourDate.toDateString() === eventDateStart.toDateString()) || 
                                    (hourDate.toDateString() === eventDateEnd.toDateString())
                  
                  if (isEqualDay) {
                    const isEqualHourStart = hourDate.getHours() === eventDateStart.getHours()
                    const isBetweenEventDuration = hourDate > eventDateStart && hourDate < eventDateEnd

                    if (isEqualHourStart) {
                      console.log("UTC DATE: ", new Date(dateByHour).toDateString())
                      console.log("HOUR DATE: ", new Date(dateByHour).getHours())
                      console.log("EVENT DATE: ", new Date(eventDateStart).getHours())
                      console.log(event)

                      hourNode = <div key={hourKey} className={`hour l${event.label}`}>{event.name}</div>
                    }
                    
                    if (isBetweenEventDuration) {
                      console.log("UTC DATE: ", new Date(dateByHour).toDateString())
                      console.log("HOUR DATE: ", new Date(dateByHour).getHours())
                      console.log("EVENT DATE: ", new Date(eventDateEnd).getHours())
                      console.log(event)

                      hourNode = <div key={hourKey} className={`hour between l${event.label}`}></div>
                    }
                  }
                })

                return hourNode
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
