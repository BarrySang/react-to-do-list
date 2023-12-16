import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import OlderToDos from './components/OlderToDos';
import ParamsTest from './components/ParamsTest';
import ToDosListGroups from './components/ToDosListGroups';
import UpcomingToDos from './components/UpcomingToDos';
import ViewToDos from './components/ViewToDos';

function App() {
  // const [toDos, setToDos] = useState([]);
  const [upcomingToDos, setUpcomingToDos] = useState([])
  const [olderToDos, setOlderToDos] = useState([]);
  // const [toDo, setToDo] = useState('');

  let testAllToDos = [
    {
      date: "14-12-2023",
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
      date: "15-12-2023",
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
      date: "16-12-2023",
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
      date: "17-12-2023",
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
    
    let localAllToDos = testAllToDos

      let today = new Date()
      let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
      let toDosUpcoming = localAllToDos.filter(toDos => toDos.date > date)
      let toDosOlder = localAllToDos.filter(toDos => toDos.date < date)
      

      // setToDos(JSON.parse(localStorage.getItem('toDos')) || []);
      setUpcomingToDos(toDosUpcoming.length ? toDosUpcoming : [])
      setOlderToDos(toDosOlder.length ? toDosOlder: [])
  }, [])

  // function to get today's date
  function getTodaysDate() {
    let today = new Date()
    return (today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear())
  }

  // get to-dos for a given date
  function getSpecificToDos (date) {
    let toDos = testAllToDos.filter(toDos => toDos.date === date)
    return toDos
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home getTodaysDate={getTodaysDate} />} />
          <Route path="upcomingToDos" element={<UpcomingToDos upcomingToDos={upcomingToDos} />} />
          <Route path="upcomingToDos/:date" element={<ViewToDos getSpecificToDos={getSpecificToDos} />} />
          <Route path="olderToDos" element={<OlderToDos olderToDos={olderToDos} />} />
          <Route path="olderToDos/:date" element={<ViewToDos getSpecificToDos={getSpecificToDos}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
