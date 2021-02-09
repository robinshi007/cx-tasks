/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Select from './Select';

export default {
  title: 'Element/Select',
  component: Select,
};

export const Single = () => {
  const [status, setStatus] = useState();
  const values = ['Todo', 'Doing', 'Done'];
  return (
    <Select
      variant="empty"
      placeholder="N/A"
      dropdownWidth={300}
      withClearValue={false}
      name="status"
      value={status}
      options={values.map((status) => ({
        value: status,
        label: status,
      }))}
      onChange={(status) => {
        setStatus(status);
      }}
    />
  );
};

export const Multi = () => {
  const [status, setStatus] = useState(['Todo']);
  const values = ['Todo', 'Doing', 'Done'];
  return (
    <Select
      isMulti
      placeholder="Unassigned"
      variant="empty"
      dropdownWidth={300}
      withClearValue={false}
      name="status"
      value={status}
      options={values.map((status) => ({
        value: status,
        label: status,
      }))}
      onChange={(status) => {
        setStatus(status);
      }}
    />
  );
};
