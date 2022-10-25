import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import './select-mode.scss';

const SelectMode = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleChangeMode = () => {
    setIsDark(!isDark);
    localStorage.setItem('isDarkMode', `${!isDark}`);
    changeMode();
  };

  const changeMode = () => {
    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode) {
      setIsDark(JSON.parse(darkMode));
      JSON.parse(darkMode)
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark');
    } else {
      localStorage.setItem('isDarkMode', 'false');
    }
  };

  useEffect(() => {
    changeMode();
  }, []);

  return (
    <Button className="select-mode" onClick={toggleChangeMode}>
      {isDark ? (
        <BsSunFill color="yellow" className="ml-3" />
      ) : (
        <BsFillMoonStarsFill color="white" className="ml-3" />
      )}
    </Button>
  );
};

export default SelectMode;
