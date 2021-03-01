export const useLocalStorageState = (defaultValue, key) => {
  const [value, setValue] = React.useState(() => {
    const localStorageValue = window.localStorage.getItem(key);

    return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
