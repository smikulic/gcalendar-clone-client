import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { weekDays, totalHours, currentWeekData } from './mockData';

class App extends Component {
  constructor() {
    super()

    this.handleCreateEvent = this.handleCreateEvent.bind(this);

    this.state = {
      activeEvent: null,
      currentWeekData: currentWeekData,
    }
  }

  handleCreateEvent = (_, id) => {
    console.log(id)
    const selectedDayIndex = id[1];
    const selectedHourIndex = id[4] ? `${id[3]}${id[4]}` : id[3];
    const selectedDayIndexNumber = parseInt(selectedDayIndex, 10);
    const selectedHourIndexNumber = parseInt(selectedHourIndex, 10);

    // console.log(selectedDayIndexNumber, selectedHourIndexNumber)
    // console.log("start of the week date: ", this.state.currentWeekData.dateFrom)
    
    const dateobj = new Date(this.state.currentWeekData.dateFrom); 
    const startDay = dateobj.getDay();
    const startHour = dateobj.getHours();
    const selectedDay = startDay + selectedDayIndexNumber + 1; // add 1 for array indexing
    const selectedHour = startHour + selectedHourIndexNumber;
    // console.log(selectedDay, selectedHour)
    
    // console.log("start day index: ", startDay)
    // console.log("start hour index: ", startHour)

    dateobj.setDate(selectedDay);
    dateobj.setHours(selectedHour);
    const selectedDate = dateobj;

    console.log("selected date: ", selectedDate)

    this.setState({ activeEvent: id });
  }

  render() {
    const { currentWeekData, activeEvent } = this.state;
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
                  <div>{weekDays[keyDay].label}</div>
                  <div>{weekDays[keyDay].date}</div>
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
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
