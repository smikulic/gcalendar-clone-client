import React from 'react';
import { FaRegClock, FaAlignJustify, FaTimes } from 'react-icons/fa';
import { totalHours, totalHoursEnd } from '../../mockData';
import { getRangeValues } from '../../getRangeValues';
import './CreateEventPopup.css';

export default function CreateEventPopup ({
  activeEvent,
  dateByHours,
  defaultInputDate,
  onClosePopup,
  onSaveEvent,
  onInputChange,
}) {
  let topRange = []
  let startTopRange = 18
  for(let i = 0; i < 7; i++) {
    topRange = topRange.concat(getRangeValues(startTopRange, startTopRange+5))
    startTopRange += 24
  }

  const conditionsPopupTop = topRange
  const conditionsPopupRight = [...Array(72).keys()]

  return (
    <div className={`create-event-popup ${conditionsPopupTop.includes(activeEvent) && 'popup-top'} ${conditionsPopupRight.includes(activeEvent) && 'popup-right'}`}>
      <FaTimes className="close-button" onClick={onClosePopup} />
      <input
        id="event-title"
        type="text"
        className="popup-title-input"
        placeholder="Add title"
        autoFocus={true}
        onChange={onInputChange}
      />
      <div className="date-input-group">
        <FaRegClock />
        <input
          id="event-start-date"
          type="date"
          defaultValue={defaultInputDate}
          onChange={onInputChange}
        />
        <select
          id="event-start-time"
          defaultValue={dateByHours}
        >
          { totalHours.map((hour, key) => <option key={key} value={key}>{hour}</option>) }
        </select>
        -
        <select
          id="event-end-time"
          defaultValue={dateByHours + 1}
          onChange={onInputChange}
        >
          { totalHoursEnd.map((hour, key) => <option key={key} value={key + 1}>{hour}</option>) }
        </select>
        <input
          id="event-end-date"
          type="date"
          defaultValue={defaultInputDate}
          onChange={onInputChange}
        />
      </div>
      <div className="date-input-group">
        <FaAlignJustify />
        <input
          id="event-description"
          type="text"
          className="popup-description-input"
          placeholder="Add description"
          onChange={onInputChange}
        />
      </div>
      <button
        className="popup-submit-button"
        onClick={onSaveEvent}
      >
        Save
      </button>
    </div>
  );
}
