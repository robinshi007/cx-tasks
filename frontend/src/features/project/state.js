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
          id: 22,
          title: 'Redesign the kanban this week for review',
          kind: 'task',
          priority: 'high',
          updated_at: '2021/2/3',
          order: 1612281600,
        },
        {
          id: 21,
          title: 'Decide the design colors',
          label: 'dev',
          kind: 'story',
          priority: 'high',
          updated_at: '2021/1/17',
          order: 1610812800,
        },
        {
          id: 24,
          title: 'Test the cover of the card',
          kind: 'task',
          priority: 'low',
          updated_at: '2021/2/4',
          order: 1612368000,
        },
      ],
    },
    {
      id: 12,
      title: 'todo',
      cards: [
        {
          id: 20,
          title: 'Implement the filter function',
          priority: 'normal',
          updated_at: '2021/2/3',
          order: 1612281600,
        },
      ],
    },
    {
      id: 13,
      title: 'in progress',
      cards: [
        {
          id: 25,
          title: 'Fix the searchbox debounce bug',
          kind: 'task',
          priority: 'low',
          updated_at: '2021/1/23',
          order: 1611331200,
        },
        {
          id: 26,
          title: 'Redesigh new logos',
          label: 'design',
          kind: 'task',
          priority: 'high',
          updated_at: '2021/2/4',
          order: 1612368000,
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
