const initState = {
  id: 1,
  name: 'Demo',
  description: 'Project for testing use',
  filters: {},
  lists: [
    {
      id: 11,
      title: 'backlog',
      cards: [
        {
          id: 21,
          title: 'Decide the design colors',
          label: 'dev',
          kind: 'story',
          priority: 'high',
          updated_at: '2021/1/17',
        },
        {
          id: 22,
          title: 'Redesign the kanban this week for review',
          kind: 'task',
          priority: 'low',
          updated_at: '2021/2/3',
        },
        {
          id: 24,
          title: 'Redesign the kanban this week for review',
          kind: 'task',
          priority: 'low',
          updated_at: '2021/2/4',
        },
      ],
    },
    {
      id: 12,
      title: 'todo',
      cards: [
        { id: 20, title: 'Decide the design colors', priority: 'normal', updated_at: '2021/2/3' },
      ],
    },
    {
      id: 13,
      title: 'in progress',
      cards: [
        {
          id: 25,
          title: 'Redesign the kanban this week for review',
          kind: 'task',
          priority: 'low',
          updated_at: '2021/2/3',
        },
        {
          id: 26,
          title: 'Decide the design colors',
          label: 'dev',
          kind: 'story',
          priority: 'high',
          updated_at: '2021/2/4',
        },
      ],
    },
    {
      id: 14,
      title: 'done',
      cards: [],
    },
  ],
};
export default initState;
