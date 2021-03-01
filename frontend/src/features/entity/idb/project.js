import { Service } from './idb';

export const getAll = async () => {
  return await Service.getAll('projects');
};
export const getById = (id) => {
  return id;
};
export const put = async (val) => {
  console.log('obj', val);
  return await Service.put('projects', val);
};
export const putNew = async (val) => {
  console.log('obj', val);
  return await Service.put('projects', val);
};
export const putAll = async (objectArray) => {
  return await Promise.all(
    objectArray.map(async (obj) => {
      return await Service.put('projects', obj);
    })
  );
};

export const deleteById = (id) => {
  return id;
};
