import { generateId } from './utils';

export const defaultSection = () => {
  const newDate = new Date();
  return {
    id: generateId().toString(),
    title: '',
    description: '',
    project: '',
    order: Math.floor(newDate.getTime() / 100),
  };
};
export const defaultProject = () => {
  const newDate = new Date();
  return {
    id: generateId().toString(),
    title: '',
    description: '',
    color: 'blue',
    my_issue_count: '0',
    owner: '61',
    updated_at: newDate.toISOString(),
    due_date: '',
  };
};
export const defaultTask = () => {
  const newDate = new Date();
  return {
    id: generateId().toString(),
    title: '',
    description: '',
    type: '71',
    section: '',
    priority: '33',
    status: '11',
    assignee: '61',
    project: '',
    tags: [],
    updated_at: newDate.toISOString(),
    due_date: '',
    order: Math.floor(newDate.getTime() / 100),
    bdorder: Math.floor(newDate.getTime() / 100),
  };
};
