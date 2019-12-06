const createEventMock = {
  id: '123abcdadsaldsadas',
  name: 'Buy a ticket to Berlin',
  start: 'Thu Dec 05 2019 22:00:00 GMT+0100 (Central European Standard Time)',
  end: 'Thu Dec 05 2019 23:00:00 GMT+0100 (Central European Standard Time)',
}

/*
DB Schema

Events

ID                1
NAME              'Buy a ticket to Berlin'
START             'Thu Dec 05 2019 22:00:00 GMT+0100 (Central European Standard Time)'
END               'Thu Dec 05 2019 23:00:00 GMT+0100 (Central European Standard Time)'
DESCRIPTION       null

*/

export const eventsMock = [
  {
    id: '100abc1',
    name: 'Buy a ticket to Berlin',
    start: 'Thu Dec 05 2019 22:00:00 GMT+0100 (Central European Standard Time)',
    end: 'Thu Dec 05 2019 23:00:00 GMT+0100 (Central European Standard Time)',
    description: null,
  },
  {
    id: '100abc2',
    name: 'Play padel',
    start: 'Fri Dec 06 2019 18:00:00 GMT+0100 (Central European Standard Time)',
    end: 'Fri Dec 06 2019 20:00:00 GMT+0100 (Central European Standard Time)',
    description: 'Make a reservation!',
  },
  {
    id: '100abc3',
    name: 'Interview',
    start: 'Wed Dec 04 2019 14:00:00 GMT+0100 (Central European Standard Time)',
    end: 'Wed Dec 04 2019 17:00:00 GMT+0100 (Central European Standard Time)',
  },
];