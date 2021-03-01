import { formatDistance } from 'date-fns';

// === utils ===
export const timeAgo = (timeString) => {
  if (timeString !== '') {
    const time = Date.parse(timeString);
    return formatDistance(time, new Date(), { addSuffix: true });
  } else {
    return '';
  }
};

export const computeOrder = (previous, next) => {
  let newOrder = 0;
  const step = 100;
  if (previous === 0 && next !== 0) {
    newOrder = next - step;
  } else if (previous !== 0 && next === 0) {
    newOrder = previous + step;
  } else if (previous !== 0 && next !== 0) {
    newOrder = Math.floor((previous + next) / 2);
  }
  return newOrder;
};

export const cacheTaskWithTitles = (entities, task) => {
  return {
    ...task,
    typeTitle: task.type ? entities.taskTypes[task.type].title : '',
    statusTitle: task.status ? entities.statuses[task.status].title : '',
    projectTitle: task.project ? entities.projects[task.project].title : '',
    assigneeName: task.assignee ? entities.users[task.assignee].name : '',
    sectionTitle: task.section ? entities.sections[task.section].title : '',
    priorityTitle: task.priority ? entities.priorities[task.priority].title : '',
  };
};

export const generateIdFunc = () => {
  let base = 200;
  return function () {
    base += 1;
    return base;
  };
};

export const generateId = generateIdFunc();

export const getFromLocalStorage = (defaultValue, key) => {
  const localStorageValue = window.localStorage.getItem(key);
  return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
};
export const setToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('setLocalStorageStat failed:', e);
  }
};
// export const getFromIndexedDB = (storeName) => {
//   return await db.transaction(storeName).objectStore(storeName).getAll()
// }
// export const setToIndexedDB = (storeName, key, val) => {
//   const tx = db.transaction(storeName, 'readwrite')
//   const store = await tx.objectStore(storeName)
//   await store.put(val, key)
//   await tx.done
// }
