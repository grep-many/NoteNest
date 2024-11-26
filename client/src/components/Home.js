import React, { useContext } from 'react'
import Notes from './Notes'
import darkModeContext from '../context/darkMode/darkModeContext';

const Home = () => {

  const { isDarkMode } = useContext(darkModeContext);

  return (
      <div className={'container my-3 py-3 px-4 rounded border border-'+(isDarkMode?'white':'dark')}>
        <Notes />
      </div>
  )
}

export default Home