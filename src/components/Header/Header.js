import React from 'react';
import { FaChevronLeft, FaChevronRight, FaBars } from 'react-icons/fa';
import './Header.css';

export default function Header ({
  onClick,
  onClickToday,
  onClickPreviousWeek,
  onClickSidebarToggle,
  onClickNextWeek,
  title,
}) {
  return (
    <div className="header" onClick={onClick}>
      <div className="title">
        <span onClick={onClickSidebarToggle}>
          <FaBars />
        </span>
        Calendar
      </div>
      <div className="change-week">
        <span className="today" onClick={onClickToday}>
          today
        </span>
        <span onClick={onClickPreviousWeek}>
          <FaChevronLeft />
        </span>
        <span onClick={onClickNextWeek}>
        <FaChevronRight />
        </span>
      </div>
      {title}
    </div>
  );
}
