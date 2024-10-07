
import React, { useEffect } from 'react';
import Start from './navigation';
import { StatusBar } from 'react-native';


const App = () => {

  useEffect(() => {
    StatusBar.setBackgroundColor('#81d773');
  }, []);

  return (
    <Start />
  )
}
export default App;