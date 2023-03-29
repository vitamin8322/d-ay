import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddDisk from "./components/AddDisk/AddDisk";
import Comment from "./components/Comment/Comment";
import ListCook from "./components/ListCook/ListCook";
import Navbar from "./components/Navbar/Navbar";
import Home from "./page/Home";

export const DishDataContext = createContext();

function App() {
  const dataDish = JSON.parse(localStorage.getItem("data"));

  const [data, setData] = useState(dataDish ?? []);
  const [currentId, setCurrentId] = useState(-1);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <DishDataContext.Provider
      value={{ data, setData, currentId, setCurrentId }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
        <Route path="/diary/:id" element={<Comment />} />
          
        </Routes>
      </Router>
    </DishDataContext.Provider>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';

// const ExampleContext = React.createContext();

// const App = () => {
//   const [color, setColor] = useState('red')
//   useEffect(()=>{
//     console.log(5);
//   }, [color])
//   return (
//     <ExampleContext.Provider value={{ color, setColor }}>
//       <div className='App'>
//         <ChildComponent />
//       </div>
//     </ExampleContext.Provider>
//   );
// };

// const ChildComponent = () => {
//   const { color, setColor } = React.useContext(ExampleContext);

//   return <p style={{ color }}>This text is {color}
//     <button onClick={() => {setColor('blue')}}>test</button>
//   </p>;
// };

// export default App;
