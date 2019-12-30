import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreateEventPopup from './components/CreateEventPopup';
import { totalHours, eventsMock, eventsMockWeek2, eventsMockWeek3 } from './mockData';
import { getUniqueId } from './utils/getUniqueId';
import { createOrEditEvent } from './utils/createOrEditEvent';
import { enrichEvents, setEventsStyle } from './utils/eventUtils';
import { isCurrentDateActive, getFormattedDate, setPreviousWeek, getCurrentWeek } from './utils/dateUtils';
import './App.css';

// TODO:
// 1. Fix week count where month changes in the middle of the week
// 2. Fix change previous/next week
// 1. Fix all overlapping events scenarios

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
      sidebarActive: false,
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

    let { enrichedEvents, eventsPerTimeSlot } = enrichEvents(clonedEvents)
    enrichedEvents = setEventsStyle(enrichedEvents, eventsPerTimeSlot)

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

                if (enrichedEvents[hourKey]) {
                  hourNode = (
                    <React.Fragment>
                      {enrichedEvents[hourKey].map((stackedEvent, eventKey) => {
                        let eventStyle = stackedEvent.eventStyle

                        return (
                          <div
                            ref={hourKey}
                            key={eventKey}
                            style={eventStyle}
                            className={`hour scheduled l${stackedEvent.label} ${stackedEvent.eventClass} ${stackedEvent.isExpired && 'expired'}`}
                            onClick={() => this.handleOnEditEvent(stackedEvent, hourKey)}
                          >
                            {stackedEvent.eventClass.includes('between-first') && (
                              <div onClick={() => this.handleOnEditEvent(stackedEvent, hourKey)}>
                                <div className="event-name">{stackedEvent.name}</div>
                                <div className="event-time">{stackedEvent.eventStartHours}:00 - {stackedEvent.eventEndHours}:00</div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )
                }

                return (
                  <div key={hourKey} id={hourKey} className="hour-wrapper">
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
