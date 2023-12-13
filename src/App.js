import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import OlderToDos from './components/OlderToDos';
import UpcomingToDos from './components/UpcomingToDos';

function App() {
  const [toDos, setToDos] = useState([]);
  const [todaysToDos, setTodaysToDos] = useState([]);
  const [upcomingToDos, setUpcomingToDos] = useState([])
  const [olderToDos, setOlderToDos] = useState([]);
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
          id: 2,
          toDosText: 'second to-do',
          checked: false
        },
        {
          id: 3,
          toDosText: 'third to-do',
          checked: false
        }
      ]
    },
    {
      date: "13/12/2023",
      toDosArray: [
        {
          id: 1,
          toDosText: 'first to-do',
          checked: false
        },
        {
          id: 2,
          toDosText: 'second to-do',
          checked: false
        },
        {
          id: 3,
          toDosText: 'third to-do',
          checked: false
        }
      ]
    },
    {
      date: "14/12/2023",
      toDosArray: [
        {
          id: 1,
          toDosText: 'first to-do',
          checked: false
        },
        {
          id: 2,
          toDosText: 'second to-do',
          checked: false
        },
        {
          id: 3,
          toDosText: 'third to-do',
          checked: false
        }
      ]
    }
  ]

  // get toDos from localstorage if they already exist
  useEffect(() => {
    let localAllToDos = allToDos

      let today = new Date()
      let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
      let toDosToday = localAllToDos.filter(toDos => toDos.date === date)
      let toDosUpcoming = localAllToDos.filter(toDos => toDos.date > date)
      let toDosOlder = localAllToDos.filter(toDos => toDos.date < date)

      // setToDos(JSON.parse(localStorage.getItem('toDos')) || []);

      setTodaysToDos(toDosToday.length ? toDosToday[0].toDosArray : [])
      setUpcomingToDos(toDosUpcoming.length ? toDosUpcoming : [])
      setOlderToDos(toDosOlder.length ? toDosOlder: [])
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home toDos={todaysToDos} setToDos={setToDos} />} />
          <Route path="upcomingToDos" element={<UpcomingToDos upcomingToDos={upcomingToDos} />} />
          <Route path="olderToDos" element={<OlderToDos olderToDos={olderToDos} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
