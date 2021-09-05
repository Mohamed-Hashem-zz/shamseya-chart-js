import React from 'react'
import Calender from './Components/Calender/Calender'
import Question2 from './Components/Calender/Question2';
import Question4 from './Components/Calender/Question4';

function App() {
  return (
    <>
      <Calender />

      <h2 className="py- text-center">Question 2</h2>
      <Question2 />
      <hr className="container my-5" />
      <h2 className="py-3 text-center">Question 4</h2>
      <Question4 />
    </>
  );
}

export default App;
