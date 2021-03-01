import { generateSectionId, generateTaskId, generateProjectId } from './utils';

export const defaultSection = () => {
  const newDate = new Date();
  return {
    id: generateSectionId().toString(),
    title: '',
    description: '',
    project: '',
    order: Math.floor(newDate.getTime() / 100),
  };
};
export const defaultProject = () => {
  const newDate = new Date();
  return {
    id: generateProjectId().toString(),
    title: '',
    description: '',
    color: 'blue',
    my_issue_count: '0',
    owner: '1',
    updated_at: newDate.toISOString(),
    due_date: '',
  };
};
export const defaultTask = () => {
  const newDate = new Date();
  return {
    id: generateTaskId().toString(),
    title: '',
    description: '',
    type: '1',
    section: '',
    priority: '3',
    status: '1',
    assignee: '1',
    project: '',
    tags: [],
    updated_at: newDate.toISOString(),
    due_date: '',
    order: Math.floor(newDate.getTime() / 100),
    bdorder: Math.floor(newDate.getTime() / 100),
  };
};
