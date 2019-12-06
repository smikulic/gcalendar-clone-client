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

    this.state = {
      currentWeek: getCurrentWeek(new Date()),
      activeEvent: null,
      activeEventDetails: {},
      currentWeekData: transformDbResponse(eventsMock),
      clonedEvents: eventsMock,
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
      currentWeekData: transformDbResponse(updatedEvents),
    })
    
    // const selectedHourIndex = id[4] ? `${id[3]}${id[4]}` : id[3];
    // const selectedDate = this.state.activeEventDetails.selectedDate;
    // const pickedDateIndex = `${selectedDate.getDay() + 1}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`
    // // let pickedDay = this.state.currentWeekData.events[selectedDayIndex];
    // let pickedDay = this.state.currentWeekData.events[pickedDateIndex];
    // const eventDetails = {
    //   id: '20', name: 'New!', label: 3, timeSpan: 1,
    // }
    // pickedDay[selectedHourIndex] = eventDetails;
  }

  handleCreateEvent = (_, id) => {
    const selectedDayIndex = id[1];
    const selectedHourIndex = id[4] ? `${id[3]}${id[4]}` : id[3];
    const selectedDayIndexNumber = parseInt(selectedDayIndex, 10);
    const selectedHourIndexNumber = parseInt(selectedHourIndex, 10);
    
    const selectedDateStart = new Date(this.state.currentWeekData.dateFrom);
    const selectedDateEnd = new Date(this.state.currentWeekData.dateFrom);
    const startDay = selectedDateStart.getDay();
    const startHour = selectedDateStart.getHours();
    const selectedDay = startDay + selectedDayIndexNumber + 1; // add 1 for array indexing
    const selectedHour = startHour + selectedHourIndexNumber;
    const selectedHourEnd = selectedHour + 1; // 1 can be dynamic based on expand or iput selected date

    selectedDateStart.setDate(selectedDay);
    selectedDateStart.setHours(selectedHour);
    selectedDateEnd.setDate(selectedDay);
    selectedDateEnd.setHours(selectedHourEnd);

    const activeEventDetails = {
      selectedDateStart,
      selectedDateEnd,
    }

    this.setState({ activeEvent: id, activeEventDetails: activeEventDetails });
  }

  render() {
    const { currentWeekData, activeEvent, currentWeek } = this.state;

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
          { Object.values(currentWeekData.events).map((day, keyDay)=>{
            let updatedKeyHour = -1;
            return (
              <div key={keyDay} className="day">
                <div className="day-label">
                  <div>{currentWeek.weekLabels[keyDay].label}</div>
                  <div>{currentWeek.weekLabels[keyDay].date}</div>
                </div>
                { day.map((event, keyHour) => {
                  updatedKeyHour += 1;
                  let hourId = `d${keyDay}h${updatedKeyHour}`;
                  const isCurrentHourActive = activeEvent === hourId;
                  const conditionsPopupTop = ['h18', 'h19', 'h20', 'h21', 'h22', 'h23', 'h24'];
                  const conditionsPopupRight = ['d0', 'd1'];
                  const isPopupTop = activeEvent ? conditionsPopupTop.some(condition => activeEvent.includes(condition)) : false;
                  const isPopupRight = activeEvent ? conditionsPopupRight.some(condition => activeEvent.includes(condition)) : false;
                  const popupClass = `create-event-popup ${isPopupTop && 'popup-top'} ${isPopupRight && 'popup-right'}`;

                  if (event.id) {
                    if (event.timeSpan > 1) {
                      const otherSpanedHours = event.timeSpan - 1;
                      const timeSpanArray = [...Array(otherSpanedHours).keys()];
                      const lastKeyHour = updatedKeyHour;
                      return (
                        <div key={hourId} className={`hour-wrapper l${event.label}`}>
                          <div key={hourId} className={`${hourId} hour ts1`}>{event.name}</div>
                          { timeSpanArray.map((_, timeSlotIndex) => {
                            updatedKeyHour = lastKeyHour + timeSlotIndex + 1;
                            hourId = `d${keyDay}h${updatedKeyHour}`;

                            return <div key={hourId} className={`${hourId} hour ts1`}></div>
                          })}
                        </div>
                      )
                    }

                    return <div key={hourId} className={`${hourId} hour-wrapper hour ts${event.timeSpan} l${event.label}`}>{event.name || ''}</div>;
                  }

                  return (
                    <div
                      key={hourId}
                      className={ isCurrentHourActive ? 'hour is-active' : `${hourId} hour` }
                      onClick={(event) => this.handleCreateEvent(event, hourId)}
                    >
                      { isCurrentHourActive && (
                        <div className={popupClass}>
                          <input type="text" />
                          <button onClick={(event) => this.handleSaveEvent(event, hourId)}>Save</button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
