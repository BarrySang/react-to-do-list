import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import OlderToDos from './components/OlderToDos';
import UpcomingToDos from './components/UpcomingToDos';

function App() {
  const [toDos, setToDos] = useState([]);
  // const [toDo, setToDo] = useState('');

  let allToDos = [
    {
      date: "12/12/2023",
      toDosArray: [
        {
          id: 1,
          toDosText: 'first to-do',
          checked: false
        },
        {
          id: 1,
          toDosText: 'second to-do',
          checked: false
        },
        {
          id: 1,
          toDosText: 'third to-do',
          checked: false
        }
      ]
    }
  ]

  // get toDos from localstorage if they already exist
  useEffect(() => {
      let today = new Date()
      let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
      let todaysToDos = allToDos.filter(a => a.date == date)
      if(todaysToDos.length) {
        console.log('todays todos exist')
      } else {
        console.log('no todos')
      }
      console.log(date)
      // console.log(todaysToDos[0].toDosArray)
      setToDos(JSON.parse(localStorage.getItem('toDos')) || []);
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home toDos={toDos} setToDos={setToDos} />} />
          <Route path="upcomingToDos" element={<UpcomingToDos />} />
          <Route path="olderToDos" element={<OlderToDos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
