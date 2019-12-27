import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreateEventPopup from './components/CreateEventPopup';
import { totalHours, eventsMock } from './mockData';
import { getUniqueId } from './utils/getUniqueId';
import { calculateEvent } from './utils/calculateEvent';
import { createOrEditEvent } from './utils/createOrEditEvent';
import { isCurrentDateActive, getFormattedDate, setPreviousWeek, getCurrentWeek } from './utils/dateUtils';
import './App.css';

// TODO:
// 1. Add overlapping events (2 during the same time)
// 2. Sidebar
// 3. Drag and drop events
// 4. Expand events (edit for time end)
// 5. More options create event - new route
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
      sidebarActive: true,
    }
  }

  handleClosePopup = () => this.setState({ activeEvent: null })
  onClickSidebarToggle = () => this.setState({ sidebarActive: !this.state.sidebarActive })

  handleSaveEvent = () => {
    const { newEventDetails, clonedEvents } = this.state
    const selectedDateStart = new Date(newEventDetails['event-start-date'])
    const selectedDateEnd = new Date(newEventDetails['event-end-date'])
    selectedDateStart.setHours(newEventDetails['event-start-time'])
    selectedDateEnd.setHours(newEventDetails['event-end-time'])

    const newEvent = {
      id: newEventDetails['event-id'] || getUniqueId(),
      name: newEventDetails['event-title'] || 'N/A',
      startDate: selectedDateStart.toString(),
      endDate: selectedDateEnd.toString(),
      description: newEventDetails['event-description'],
      label: newEventDetails['event-label'] || 0,
    };

    let updatedEvents = createOrEditEvent(newEventDetails['event-id'], newEvent, clonedEvents)
    this.setState({ clonedEvents: updatedEvents, newEventDetails: {}, activeEvent: null })
  }

  handleOnCreateEvent = (_, id, defaultInputDate, dateByHours) => {
    const defaultEventDetails = {
      "event-title": '',
      "event-description": '',
      "event-start-date": defaultInputDate,
      "event-start-time": dateByHours,
      "event-end-date": defaultInputDate,
      "event-end-time": dateByHours + 1,
    }
    this.setState({ activeEvent: id, newEventDetails: defaultEventDetails })
  }

  handleOnEditEvent = (calEvent, id) => {
    const calEventStartDate = new Date(calEvent.startDate)
    const calEventEndDate = new Date(calEvent.endDate)
    const eventStartDate = getFormattedDate(calEventStartDate)
    const eventEndDate = getFormattedDate(calEventEndDate)

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
  
  handleInputChange = (event) => {
    let updatedNewEventDetails = { ...this.state.newEventDetails }
    updatedNewEventDetails[event.target.id] = event.target.value
    this.setState({ newEventDetails: updatedNewEventDetails });
  }
  
  changeCurrentWeek = (week) => {
    const previousWeekDate = setPreviousWeek(week, this.state.currentDate)
    this.setState({ currentDate: previousWeekDate, currentWeek: getCurrentWeek(previousWeekDate) })
  }

  handleOnResize = (event, refKey) => {
    console.log(event.clientY)
    console.log(this.refs[refKey].clientHeight)
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
    } = this.state;

    let timeSpanLeft = 0

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

        {sidebarActive && <Sidebar />}

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

          <div className="week-overview">
            <div className="hours-axis">
              { totalHours.map((hour, key) => <div key={key} className="hour-label">{hour}</div>) }
            </div>
            <div className="hours-container">
              { totalHoursByWeek.map((_, hourKey) => {
                const thisDate = new Date(currentWeek.weekStart)
                const dateByHour = thisDate.setHours(hourKey)
                const dateByHours = thisDate.getHours()
                const defaultInputDate = getFormattedDate(thisDate)

                const isCurrentHourActive = activeEvent === hourKey
                const currentDay = currentDate.getDay()
                const currentHours = currentDate.getHours()
                const currentMinuteMarker = (currentDate.getMinutes() / 60 * 2).toFixed(1) // Times 2 because of hour wrapper height
                const currentHourMarker = currentDay === 0 ? 6 * 24 + currentHours : (currentDay - 1) * 24 + currentHours

                let hourNode = (
                  <div
                    className={ isCurrentHourActive ? 'hour is-active' : `hour` }
                    onClick={(event) => this.handleOnCreateEvent(event, hourKey, defaultInputDate, dateByHours)}
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
                        onClick={() => this.handleOnEditEvent(event, hourKey)}
                      >
                        { isEqualHourStart && firstSpanClass && (
                          <div onClick={() => this.handleOnEditEvent(event, hourKey)}>
                            <div className="event-name">{event.name}</div>
                            <div className="event-time">{eventStartHours}:00 - {eventEndHours}:00</div>
                          </div>
                        )}
                        {lastSpanClass && (
                          <div
                            className="resize"
                            onMouseDown={(event) => this.handleOnResize(event, hourKey)}
                          />
                        )}
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
                        onSaveEvent={this.handleSaveEvent}
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
