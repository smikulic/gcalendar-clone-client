import React, { Component } from 'react';
import Header from './components/Header';
import CreateEventPopup from './components/CreateEventPopup';
import { totalHours, eventsMock } from './mockData';
import { getCurrentWeek } from './getCurrentWeek';
import { calculateEvent } from './calculateEvent';
import { isCurrentDateActive } from './isCurrentDateActive';
import './App.css';

// TODO:
// 1. Add overlapping events (2 during the same time)
// 2. Fixed height calendar scroll
// 2. Drag and drop events
// 3. Expand events (edit for time end)
class App extends Component {
  constructor() {
    super()

    this.state = {
      currentDate: new Date(),
      currentWeek: getCurrentWeek(new Date()),
      activeEvent: null,
      clonedEvents: eventsMock,
      totalDaysByWeek: [...Array(7).keys()],
      totalHoursByWeek: [...Array(168).keys()], // 24 hours * 7 days
      newEventDetails: {},
      currentResizeElement: null,
      resizeElementHeight: null,
      resizeStart: 0,
      resizeStep: 0,
      mousePosition: {
        x: 0,
        y: 0,
      },
      sidebarActive: true,
    }
  }

  handleSaveEvent = (_, id) => {
    const { newEventDetails, clonedEvents } = this.state
    const selectedDateStart = new Date(newEventDetails['event-start-date'])
    const selectedDateEnd = new Date(newEventDetails['event-end-date'])

    selectedDateStart.setHours(newEventDetails['event-start-time'])
    selectedDateEnd.setHours(newEventDetails['event-end-time'])

    const newEvent = {
      id: newEventDetails['event-id'] || 'randomIdString',
      name: newEventDetails['event-title'] || 'N/A',
      startDate: selectedDateStart.toString(),
      endDate: selectedDateEnd.toString(),
      description: newEventDetails['event-description'],
      label: newEventDetails['event-label'],
    };

    let updatedEvents = [...clonedEvents]

    // if event exists edit/update it
    const foundEvent= clonedEvents.findIndex(event => event.id === newEventDetails['event-id'])
    if (foundEvent > 0) {
      clonedEvents[foundEvent] = newEvent
      updatedEvents = [...clonedEvents]
    } else {
      updatedEvents.push(newEvent)
    }


    this.setState({
      clonedEvents: updatedEvents,
      newEventDetails: {},
      activeEvent: null,
      currentResizeElement: null,
      resizeStep: 0,
      resizeStart: 0,
    })
  }

  handleCreateEvent = (_, id, defaultInputDate, dateByHours) => {
    const updatedNewEventDetails = {
      "event-title": '',
      "event-description": '',
      "event-start-date": defaultInputDate,
      "event-start-time": dateByHours,
      "event-end-date": defaultInputDate,
      "event-end-time": dateByHours + 1,
    }
    this.setState({ activeEvent: id, newEventDetails: updatedNewEventDetails });
  }

  handleEditEvent = (calEvent, id) => {
    const calEventStartDate = new Date(calEvent.startDate)
    const calEventEndDate = new Date(calEvent.endDate)
    const dateStartByDay = calEventStartDate.getDate()
    const dateStartByMonth = calEventStartDate.getMonth() + 1
    const dateStartByYear = calEventStartDate.getFullYear()
    const dateEndByDay = calEventEndDate.getDate()
    const dateEndByMonth = calEventEndDate.getMonth() + 1
    const dateEndByYear = calEventEndDate.getFullYear()
    const eventStartDate = `${dateStartByYear}-${dateStartByMonth}-${dateStartByDay}`
    const eventEndDate = `${dateEndByYear}-${dateEndByMonth}-${dateEndByDay}`

    const updatedNewEventDetails = {
      "event-id": calEvent.id,
      "event-label": calEvent.label,
      "event-title": calEvent.name,
      "event-description": calEvent.description,
      "event-start-date": eventStartDate,
      "event-start-time": calEventStartDate.getHours(),
      "event-end-date": eventEndDate,
      "event-end-time": calEventEndDate.getHours(),
    }

    this.setState({ activeEvent: id, newEventDetails: updatedNewEventDetails });
  }
  
  handleClosePopup = () => {
    this.setState({ activeEvent: null });
  }
  
  handleInputChange = (event) => {
    let updatedNewEventDetails = { ...this.state.newEventDetails }
    updatedNewEventDetails[event.target.id] = event.target.value

    this.setState({ newEventDetails: updatedNewEventDetails });
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

  handleMouseMove = event => {
    const distanceBetween = this.state.mousePosition.y - this.state.resizeStart

    if (distanceBetween > 40 && distanceBetween < 80) {
      this.setState({
        mousePosition: { x: event.clientX, y: event.clientY },
        // resizeElementHeight: this.state.resizeElementHeight * 2,
        resizeStep: 2,
      })
    } else if (distanceBetween > 80 && distanceBetween < 120) {
      this.setState({
        mousePosition: { x: event.clientX, y: event.clientY },
        // resizeElementHeight: this.state.resizeElementHeight * 3,
        resizeStep: 3,
      })
    } else {
      this.setState({
        mousePosition: { x: event.clientX, y: event.clientY },
      })
    }
  }

  handleOnResize = (event, refKey) => {
    console.log("HAHA")
    console.log(event.clientY)
    console.log(this.refs[refKey].clientHeight)
    this.setState({ resizeStart: event.clientY, currentResizeElement: refKey, resizeElementHeight: this.refs[refKey].clientHeight })
  }

  onClickSidebarToggle = () => {
    console.log('aha', !this.state.sidebarActive)
    this.setState({ sidebarActive: !this.state.sidebarActive })
  }

  render() {
    const {
      activeEvent,
      currentDate,
      currentWeek,
      clonedEvents,
      totalDaysByWeek,
      totalHoursByWeek,
      newEventDetails,
      sidebarActive,
      resizeStart,
      resizeStep,
      resizeElementHeight,
      currentResizeElement,
    } = this.state;

    let timeSpanLeft = 0
    // console.log("resizeStep: ", resizeStep, resizeElementHeight)

    return (
      <div className="App">
        <Header
          onClick={this.handleClosePopup}
          onClickToday={() => this.changeCurrentWeek('today')}
          onClickPreviousWeek={() => this.changeCurrentWeek('previous')}
          onClickNextWeek={() => this.changeCurrentWeek('next')}
          title={`${currentWeek.weekStart.toLocaleString('default', { month: 'long' })} ${currentWeek.weekStart.getFullYear()}`}
          onClickSidebarToggle={this.onClickSidebarToggle}
        />

        {sidebarActive && (
        <div className="sidebar">
          <div>"sidebar"</div>
          <div></div>
          <div></div>
        </div>

        )}

        <div className={`main-overview ${sidebarActive ? '' : 'open-full-width'}`}>

          <div className={`days-axis ${sidebarActive ? '' : 'open-full-width'}`}>
            <div className="hours-axis">
              <div className="hour-label">0</div>
            </div>
            { totalDaysByWeek.map((_, keyDay) => {
              let isActiveDay = isCurrentDateActive(currentDate)
              if (isActiveDay) {
                isActiveDay = keyDay === 6 ?
                              currentDate.getDay() === 0 : // Sunday
                              currentDate.getDay() === (keyDay + 1) // Other days
              }
              
              return (
                <div key={keyDay} className={isActiveDay ? 'day-label active' : 'day-label'}>
                  <div>{currentWeek.weekLabels[keyDay].label}</div>
                  <div>{currentWeek.weekLabels[keyDay].date}</div>
                </div>
              )
            })}
          </div>

          <div className="week-overview" onMouseMove={resizeStart ? this.handleMouseMove : undefined}>
            <div className="hours-axis">
              { totalHours.map((hour, key) => <div key={key} className="hour-label">{hour}</div>) }
            </div>
            <div className="hours-container">
              { totalHoursByWeek.map((_, hourKey) => {
                const thisDate = new Date(currentWeek.weekStart)
                const dateByHour = thisDate.setHours(hourKey)
                const dateByHours = thisDate.getHours()
                const dateByDay = thisDate.getDate()
                const dateByMonth = thisDate.getMonth() + 1
                const dateByYear = thisDate.getFullYear()
                const defaultInputDate = `${dateByYear}-${dateByMonth}-${dateByDay}`
                const isCurrentHourActive = activeEvent === hourKey
                const currentDay = currentDate.getDay()
                const currentHours = currentDate.getHours()
                const currentMinuteMarker = (currentDate.getMinutes() / 60 * 2).toFixed(1) // Times 2 because of hour wrapper height
                const currentHourMarker = currentDay === 0 ? 6 * 24 + currentHours : (currentDay - 1) * 24 + currentHours

                let hourNode = (
                  <div
                    className={ isCurrentHourActive ? 'hour is-active' : `hour` }
                    onClick={(event) => this.handleCreateEvent(event, hourKey, defaultInputDate, dateByHours)}
                  />
                )

                clonedEvents.forEach((event) => {
                  const existingEvent = calculateEvent(event, dateByHour, timeSpanLeft)
                  
                  if (existingEvent) {
                    const {
                      firstSpanClass,
                      inBetweenSpanClass,
                      lastSpanClass,
                      isEqualHourStart,
                      eventStartHours,
                      eventEndHours,
                      eventTimeLeft,
                      isExpired,
                    } = existingEvent

                    hourNode = (
                      <div
                        ref={hourKey}
                        className={`hour scheduled l${event.label} ${firstSpanClass} ${inBetweenSpanClass} ${lastSpanClass} ${isExpired && 'expired'}`}
                        onClick={() => this.handleEditEvent(event, hourKey)}
                        // style={{ height: resizeStep > 1 && currentResizeElement === hourKey ? resizeElementHeight * resizeStep : 'inherit' }}
                      >
                        { isEqualHourStart && firstSpanClass && (
                          <div onClick={() => this.handleEditEvent(event, hourKey)}>
                            <div className="event-name">{event.name}</div>
                            <div className="event-time">{eventStartHours}:00 - {eventEndHours}:00</div>
                          </div>
                        )}
                        {/* {lastSpanClass && (
                          <div
                            className="resize outline"
                            onMouseDown={(event) => this.handleOnResize(event, hourKey)}
                            onMouseUp={(event) => this.handleEditEvent(event, hourKey)}
                            style={{ height: resizeStep > 1 && currentResizeElement === hourKey ? resizeElementHeight * resizeStep : 'inherit' }}
                          />
                        )} */}
                      </div>
                    )

                    timeSpanLeft = eventTimeLeft
                  }
                })

                return (
                  <div key={hourKey} className="hour-wrapper">
                    { currentHourMarker === hourKey && isCurrentDateActive(currentDate) && (
                      <div className="current-hour-marker" style={{ top: `${currentMinuteMarker}rem` }}>
                        <span className="current-hour-marker-pointer"></span>
                      </div>
                    )}
                    {hourNode}
                    { isCurrentHourActive && (
                      <CreateEventPopup
                        activeEvent={activeEvent}
                        newEventDetails={newEventDetails}
                        onClosePopup={this.handleClosePopup}
                        onSaveEvent={(event) => this.handleSaveEvent(event, hourKey)}
                        onInputChange={(event) => this.handleInputChange(event)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
