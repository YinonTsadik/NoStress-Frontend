const fakeConstraints = [
    {
        title: 'Constraint #1',
        start: new Date(2022, 11, 15, 10, 0),
        end: new Date(2022, 11, 15, 12, 0),
        allDay: false,
    },
    {
        title: 'Constraint #2',
        start: new Date(2022, 11, 25, 11, 0),
        end: new Date(2022, 11, 26, 20, 0),
        allDay: false,
    },
    {
        title: 'Constraint #3',
        start: new Date(2022, 11, 10, 20, 0),
        end: new Date(2022, 11, 10, 23, 30),
        allDay: false,
    },
    {
        title: 'Constraint #4',
        start: new Date(2022, 11, 31, 22, 0),
        end: new Date(2023, 0, 1, 0, 30),
        allDay: false,
    },
    {
        title: 'Constraint #5',
        start: new Date(2022, 10, 19, 10, 0),
        end: new Date(2022, 10, 19, 20, 0),
        allDay: false,
    },
]

const fakeTasks = [
    {
        title: 'Task #1',
        deadline: new Date(2022, 11, 10, 23, 59),
        hours: 3,
        scheduled: true,
    },
    {
        title: 'Task #2',
        deadline: new Date(2022, 11, 12, 23, 59),
        hours: 6,
        scheduled: true,
    },
    {
        title: 'Task #3',
        deadline: new Date(2022, 11, 16, 23, 59),
        hours: 9,
        scheduled: true,
    },
    {
        title: 'Task #4',
        deadline: new Date(2022, 11, 19, 23, 59),
        hours: 12,
        scheduled: true,
    },
    {
        title: 'Task #5',
        deadline: new Date(2023, 0, 10, 23, 59),
        hours: 5,
        scheduled: true,
    },
]

export { fakeConstraints, fakeTasks }
