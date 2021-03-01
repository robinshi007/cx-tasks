import * as idb from 'idb';

const dbPromise = idb.openDB('cxtasks', 1, {
  upgrade(db) {
    const projectStore = db.createObjectStore('projects', { keyPath: 'id' });
    projectStore.createIndex('Name', 'name');
    db.createObjectStore('sections', { keyPath: 'id' });
    db.createObjectStore('tasks', { keyPath: 'id' });
    db.createObjectStore('task_types', { keyPath: 'id' });
    db.createObjectStore('priorities', { keyPath: 'id' });
    db.createObjectStore('statuses', { keyPath: 'id' });
    db.createObjectStore('users', { keyPath: 'id' });
  },
});

class DBService {
  get(tablespace, key) {
    return dbPromise
      .then((db) => {
        return db.transaction(tablespace).objectStore(tablespace).get(key);
      })
      .catch((error) => {
        console.log('DBService get', error);
      });
  }

  getAll(tablespace) {
    return dbPromise
      .then((db) => {
        return db.transaction(tablespace).objectStore(tablespace).getAll();
      })
      .catch((error) => {
        console.log('DBService getAll', error);
      });
  }

  put(tablespace, object, key = null) {
    return dbPromise
      .then((db) => {
        if (key) {
          return db.transaction(tablespace, 'readwrite').objectStore(tablespace).put(object, key);
        }
        return db.transaction(tablespace, 'readwrite').objectStore(tablespace).put(object);
      })
      .catch((error) => {
        console.log('DBService put', error);
      });
  }

  delete(tablespace, key) {
    return dbPromise
      .then((db) => {
        return db.transaction(tablespace, 'readwrite').objectStore(tablespace).delete(key);
      })
      .catch((error) => {
        console.log('DBService delete', error);
      });
  }

  deleteAll(tablespace) {
    return dbPromise
      .then((db) => {
        return db.transaction(tablespace, 'readwrite').objectStore(tablespace).clear();
      })
      .catch((error) => {
        console.log('DBService deleteAll', error);
      });
  }
}

export const Service = new DBService();
