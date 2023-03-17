import { useState, useEffect } from 'react'

const Theme = () => {

  const[theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme);
  }, [theme]);

  return {theme, toggleTheme};
};
export default Theme