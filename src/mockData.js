export const eventsMock = [
  {
    id: '100abc1',
    name: 'Buy a ticket to Berlin',
    startDate: 'Thu Dec 12 2019 22:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Thu Dec 12 2019 23:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc2',
    name: 'Play padel',
    startDate: 'Fri Dec 13 2019 18:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Fri Dec 13 2019 20:00:00 GMT+0100 (Central European Standard Time)',
    description: 'Make a reservation!',
    label: 3,
  },
  {
    id: '100abc3',
    name: 'Interview',
    startDate: 'Tue Dec 10 2019 14:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Tue Dec 10 2019 17:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 10,
  },
  {
    id: '100abc4',
    name: 'Coffee',
    startDate: 'Tue Dec 10 2019 08:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Tue Dec 10 2019 09:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc5',
    name: 'Wedding Party',
    startDate: 'Fri Dec 13 2019 22:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Sat Dec 14 2019 05:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc6',
    name: 'Lunch',
    startDate: 'Thu Dec 19 2019 13:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Thu Dec 19 2019 14:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc7',
    name: 'Party',
    startDate: 'Fri Dec 20 2019 22:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Sat Dec 21 2019 05:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc8',
    name: 'Lunch',
    startDate: 'Sun Dec 22 2019 13:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Sun Dec 22 2019 15:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc9',
    name: 'Lunch',
    startDate: 'Mon Dec 23 2019 13:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Mon Dec 23 2019 15:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc10',
    name: 'Dinner',
    startDate: 'Mon Dec 23 2019 22:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Mon Dec 23 2019 23:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 0,
  },
  {
    id: '100abc11',
    name: 'Conference JS Berlin',
    startDate: 'Thu Dec 26 2019 10:00:00 GMT+0100 (Central European Standard Time)',
    endDate: 'Sat Dec 28 2019 20:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
    label: 3,
  },
  // {
  //   id: '100abc5',
  //   name: 'Learn JS',
  //   startDate: 'Fri Dec 13 2019 18:00:00 GMT+0100 (Central European Standard Time)',
  //   endDate: 'Fri Dec 13 2019 20:00:00 GMT+0100 (Central European Standard Time)',
  //   description: 'Refresh knowledge on React Hooks',
  //   label: 0,
  // },
  // {
  //   id: '100abc6',
  //   name: 'Dinner',
  //   startDate: 'Fri Dec 13 2019 18:00:00 GMT+0100 (Central European Standard Time)',
  //   endDate: 'Fri Dec 13 2019 19:00:00 GMT+0100 (Central European Standard Time)',
  //   description: '',
  //   label: 0,
  // },
];
export const totalHours = ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00',
                          '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
export const totalHoursEnd = ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00',
                          '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00', '24:00'];
export const currentWeekData = {
  dateFrom: 'December 02, 2019 00:00:00',
  dateTo: 'December 08, 2019 23:00:00',
  dateFormatted: 'December 2019',
  events: {
    '2-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '1', name: 'Morning Coffee', label: 0, timeSpan: 1 },
      {},
      { id: '2', name: 'Interview with company', label: 10, hour: 10, timeSpan: 3 },
      {},
      {},
      {},
      {},
      { id: '3', name: 'Buy birthday gift', label: 3, timeSpan: 1 },
      { id: '4', name: 'Gym', label: 0, timeSpan: 2 },
      {},
      {},
      {},
      {},
    ],
    '3-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '5', name: 'Morning Coffee', label: 0, timeSpan: 1 },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '6', name: 'Gym', label: 0, timeSpan: 2 },
      {},
      {},
      {},
      {},
    ],
    '4-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '7', name: 'Morning Coffee', label: 0, timeSpan: 1 },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '8', name: 'Gym', label: 0, timeSpan: 2 },
      {},
      {},
      {},
      {},
    ],
    '5-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '9', name: 'Morning Coffee', label: 0, timeSpan: 1 },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '10', name: 'Gym', label: 0, timeSpan: 2 },
      {},
      {},
      {},
      {},
    ],
    '6-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '11', name: 'Morning Coffee', label: 0, timeSpan: 1 },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '12', name: 'Gym', label: 0, timeSpan: 3 },
      {},
      {},
      {},
      {},
    ],
    '7-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { id: '13', name: 'Morning Coffee', label: 0, timeSpan: 1 },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    '8-12-2019': [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  },
};
