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

  handleCreateEvent = (event, id) => {
    console.log(id, event.target)

    this.setState({ activeEvent: id })
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
            return (
              <div key={keyDay} className="day">
                <div className="day-label">
                  <div>{weekDays[keyDay].label}</div>
                  <div>{weekDays[keyDay].date}</div>
                </div>
                { day.map((event, keyHour) => {
                  const emptyHourId = `d${keyDay}h${keyHour}`;
                  const isCurrentHourActive = activeEvent === emptyHourId;
                  const conditionsPopupTop = ['h18', 'h19', 'h20', 'h21', 'h22', 'h23', 'h24'];
                  const conditionsPopupRight = ['d0', 'd1'];
                  const isPopupTop = activeEvent ? conditionsPopupTop.some(condition => activeEvent.includes(condition)) : false;
                  const isPopupRight = activeEvent ? conditionsPopupRight.some(condition => activeEvent.includes(condition)) : false;
                  const popupClass = `create-event-popup ${isPopupTop && 'popup-top'} ${isPopupRight && 'popup-right'}`;

                  if (event.id) {
                    return <div key={keyHour} className={`hour ts${event.timeSpan} l${event.label}`}>{event.name || ''}</div>
                  }

                  return (
                    <div
                      key={emptyHourId}
                      className={ isCurrentHourActive ? 'hour is-active' : 'hour' }
                      onClick={(event) => this.handleCreateEvent(event, emptyHourId)}
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
