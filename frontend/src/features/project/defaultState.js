const defaultState = {
  id: 1,
  name: 'Demo',
  description: 'Project for testing use',
  filters: {},
  groupBy: 'section',
  sortBy: { field: '', direction: '' },
  tasks: {
    '22': {
      id: 22,
      title: 'Redesign the kanban this week for review',
      description: 'Hi description',
      taskKind: 71,
      section: 51,
      priority: 32,
      status: 12,
      assignee: 61,
      tags: [41, 42],
      updated_at: '2021/2/3',
      due_date: '2021/2/20',
      order: 1610812800,
      bdorder: 1610812800,
    },
    '21': {
      id: 21,
      title: 'Decide the design colors',
      description: '',
      taskKind: 71,
      section: 51,
      priority: 33,
      status: 12,
      assignee: 61,
      tags: [42],
      updated_at: '2021/2/17',
      due_date: '2021/2/18',
      order: 1612281600,
      bdorder: 1612281600,
    },
    '24': {
      id: 24,
      title: 'Test the cover of the card',
      description: '',
      taskKind: 72,
      section: 54,
      priority: 32,
      status: 14,
      assignee: 61,
      tags: [42],
      updated_at: '2021/2/18',
      due_date: '2021/2/10',
      order: 1612368000,
      bdorder: 1612368000,
    },
    '20': {
      id: 20,
      title: 'Implement the filter function',
      description: '',
      taskKind: 72,
      section: 53,
      priority: 34,
      status: 14,
      assignee: 61,
      tags: [],
      updated_at: '2021/2/3',
      due_date: '2021/2/5',
      order: 1612281600,
      bdorder: 1612281600,
    },
    '25': {
      id: 25,
      title: 'Fix the searchbox debounce bug',
      description: '',
      taskKind: 73,
      section: 53,
      priority: 31,
      status: 12,
      assignee: 62,
      tags: [42, 43],
      updated_at: '2021/2/18',
      due_date: '2021/2/20',
      order: 1611331200,
      bdorder: 1611331200,
    },
    '26': {
      id: 26,
      title: 'Redesigh new logos',
      description: '',
      taskKind: 72,
      section: 51,
      priority: 32,
      status: 11,
      assignee: null,
      tags: [],
      updated_at: '2021/2/4',
      due_date: '2021/2/22',
      order: 1612368000,
      bdorder: 1612368000,
    },
  },
  status: {
    '11': {
      id: 11,
      title: 'backlog',
      order: 1612281200,
    },
    '12': {
      id: 12,
      title: 'todo',
      order: 1612281400,
    },
    '13': {
      id: 13,
      title: 'in progress',
      order: 1612281600,
    },
    '14': {
      id: 14,
      title: 'done',
      order: 1612281800,
    },
  },
  priority: {
    '31': {
      id: 31,
      title: 'block',
      order: 1612281500,
    },
    '32': {
      id: 32,
      title: 'high',
      order: 1612281600,
    },
    '33': {
      id: 33,
      title: 'medium',
      order: 1612281700,
    },
    '34': {
      id: 34,
      title: 'low',
      order: 1612281800,
    },
  },
  tags: {
    '41': {
      id: 41,
      title: 'feature',
      color: 'blue',
      order: 1612281600,
    },
    '42': {
      id: 42,
      title: 'improment',
      color: 'purple',
      order: 1612281700,
    },
    '43': {
      id: 43,
      title: 'bug',
      color: 'red',
      order: 1612281800,
    },
  },
  section: {
    '51': {
      id: 51,
      title: 'design',
      order: 1612281400,
    },
    '52': {
      id: 52,
      title: 'prototype',
      order: 1612281500,
    },
    '53': {
      id: 53,
      title: 'frontend',
      order: 1612281600,
    },
    '54': {
      id: 54,
      title: 'backend',
      order: 1612281700,
    },
    '55': {
      id: 55,
      title: 'deployment',
      order: 1612281800,
    },
  },
  assignee: {
    '61': {
      id: 61,
      name: 'Alice',
      order: 1612281400,
    },
    '62': {
      id: 62,
      name: 'Bob',
      order: 1612281600,
    },
  },
  taskKind: {
    '71': {
      id: 71,
      title: 'Story',
    },
    '72': {
      id: 72,
      title: 'Task',
    },
    '73': {
      id: 73,
      title: 'Bug',
    },
  },
};
export default defaultState;
