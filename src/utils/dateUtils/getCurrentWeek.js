function getMonday(d) {
  d = new Date(d);
  let day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  d.setDate(diff);

  return new Date(d.setHours(0,0,0,0));
}

function getSunday(d) {
  d = new Date(d);
  let lastDay = d.getDate() - (d.getDay() - 1) + 6;
  d.setDate(lastDay);

  return new Date(d.setHours(23,0,0,0));
}

export const getCurrentWeek = (date) => {
  const weekStart = getMonday(date);
  const weekEnd = getSunday(date);
  const weekStartString = weekStart.toString();
  const weekEndString = weekEnd.toString();
  const firstDay = weekStart.getDate();
  const weekLabels = [
    { label: 'Mon', date: firstDay },
    { label: 'Tue', date: firstDay + 1 },
    { label: 'Wed', date: firstDay + 2 },
    { label: 'Thu', date: firstDay + 3 },
    { label: 'Fri', date: firstDay + 4 },
    { label: 'Sat', date: firstDay + 5 },
    { label: 'Sun', date: firstDay + 6 },
  ]

  return {
    weekStart,
    weekEnd,
    weekStartString,
    weekEndString,
    weekLabels,
  }
}
