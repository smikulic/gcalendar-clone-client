import React, { Component } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './App.css';
import { totalHours, eventsMock } from './mockData';
import { getCurrentWeek } from './getCurrentWeek';
import { getRangeValues } from './getRangeValues';
// import { transformDbResponse } from './transformDbResponse';

class App extends Component {
  constructor() {
    super()

    // this.handleCreateEvent = this.handleCreateEvent.bind(this);
    // this.handleSaveEvent = this.handleSaveEvent.bind(this);
    // this.changeCurrentWeek = this.changeCurrentWeek.bind(this);

    this.state = {
      currentDate: new Date(),
      currentWeek: getCurrentWeek(new Date()),
      activeEvent: null,
      activeEventDetails: {},
      clonedEvents: eventsMock,
      totalDaysByWeek: [...Array(7).keys()],
      totalHoursByWeek: [...Array(168).keys()], // 24 hours * 7 days
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
  
  changeCurrentWeek = (week) => {
    let previousWeekDate = this.state.currentDate
    
    if (week === 'today') {
      previousWeekDate = new Date()
    } else {
      const offset = week === 'previous' ? -7 : 7
      previousWeekDate.setDate(previousWeekDate.getDate() + offset)
    }

    this.setState({
      currentDate: previousWeekDate,
      currentWeek: getCurrentWeek(previousWeekDate),
    })
  }

  render() {
    const {
      activeEvent,
      currentDate,
      currentWeek,
      clonedEvents,
      totalDaysByWeek,
      totalHoursByWeek,
    } = this.state;

    let topRange = []
    let startTopRange = 18
    for(let i = 0; i < 7; i++) {
      topRange = topRange.concat(getRangeValues(startTopRange, startTopRange+5))
      startTopRange += 24
    }

    const conditionsPopupTop = topRange
    const conditionsPopupRight = [...Array(72).keys()]

    return (
      <div className="App">
        <div className="header">
          <div className="change-week">
            <span className="today" onClick={() => this.changeCurrentWeek('today')}>
              today
            </span>
            <span onClick={() => this.changeCurrentWeek('previous')}>
              <FaChevronLeft />
            </span>
            <span onClick={() => this.changeCurrentWeek('next')}>
            <FaChevronRight />
            </span>
          </div>
          {currentWeek.weekStart.toLocaleString('default', { month: 'long' })}
          {' '}
          {currentWeek.weekStart.getFullYear()}
        </div>
        <div className="days-axis">
          <div className="hours-axis">
            <div className="hour-label">0</div>
          </div>
          { totalDaysByWeek.map((_, keyDay) => {
            return (
              <div key={keyDay} className={currentDate.getDay() === (keyDay + 1) ? 'day-label active' : 'day-label'}>
                <div>{currentWeek.weekLabels[keyDay].label}</div>
                <div>{currentWeek.weekLabels[keyDay].date}</div>
              </div>
            )
          })}
        </div>
        <div className="week-overview">
          <div className="hours-axis">
            { totalHours.map((hour, key) => {
              return <div key={key} className="hour-label">{hour}</div>
            })}
          </div>
          <div className="hours-container">
            { totalHoursByWeek.map((_, hourKey) => {
                const dateByHour = new Date(currentWeek.weekStart).setHours(hourKey)
                const isCurrentHourActive = activeEvent === hourKey
                const currentHourMarker = (currentDate.getDay() - 1) * 24 + currentDate.getHours()
                const currentMinuteMarker = (currentDate.getMinutes() / 60 * 2).toFixed(1) // Times 2 because of hour wrapper height

                let hourNode = (
                  <div id={hourKey} key={hourKey} className="hour-wrapper">
                    { currentHourMarker === hourKey && (
                      <div className="current-hour-marker" style={{ top: `${currentMinuteMarker}rem` }}>
                        <span className="current-hour-marker-pointer"></span>
                      </div>
                    )}
                    <div className={ isCurrentHourActive ? 'hour is-active' : `hour` } onClick={(event) => this.handleCreateEvent(event, hourKey)}>
                      { isCurrentHourActive && (
                        <div className={`create-event-popup ${conditionsPopupTop.includes(activeEvent) && 'popup-top'} ${conditionsPopupRight.includes(activeEvent) && 'popup-right'}`}>
                          <input type="text" />
                          <button onClick={(event) => this.handleSaveEvent(event, hourKey)}>Save</button>
                        </div>
                      )}
                    </div>
                  </div>
                )

                clonedEvents.forEach((event, eventKey) => {
                  const hourDate = new Date(dateByHour)
                  const eventDateStart = new Date(event.startDate)
                  const eventDateEnd = new Date(event.endDate)
                  const isEqualDay = (hourDate.toDateString() === eventDateStart.toDateString()) || 
                                    (hourDate.toDateString() === eventDateEnd.toDateString())
                  const eventStartHours = eventDateStart.getHours()
                  const eventEndHours = eventDateEnd.getHours()
                  
                  if (isEqualDay) {
                    const isEqualHourStart = hourDate.getHours() === eventStartHours
                    // const isBetweenEventDuration = hourDate > eventDateStart && hourDate < eventDateEnd

                    // console.log(isBetweenEventDuration, event)

                    if (isEqualHourStart) {
                      // console.log("UTC DATE: ", new Date(dateByHour).toDateString())
                      // console.log("HOUR DATE: ", new Date(dateByHour).getHours())
                      // console.log("EVENT DATE: ", new Date(eventDateStart).getHours())
                      let eventTimeSpan = eventEndHours - eventStartHours
                      console.log("eventTimeSpan: ", eventTimeSpan)
                      
                      hourNode = (
                        <div id={hourKey} key={hourKey} className={`hour-wrapper s${eventTimeSpan}`} onClick={() => undefined}>
                          <div className={`hour scheduled s${eventTimeSpan} l${event.label}`}>
                            <div className="event-name">{event.name}</div>
                            <div className="event-time">{eventStartHours}:00 - {eventEndHours}:00</div>
                          </div>
                        </div>
                      )
                    }
                    
                    // if (isBetweenEventDuration) {
                    //   hourNode = <div key={hourKey} className={`hour between l${event.label}`}></div>
                    // }
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
