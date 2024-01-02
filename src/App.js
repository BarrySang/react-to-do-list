import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import OlderToDos from './components/OlderToDos';
import UpcomingToDos from './components/UpcomingToDos';
import ViewToDos from './components/ViewToDos';

function App() {
  // const [toDos, setToDos] = useState([]);
  const [upcomingToDos, setUpcomingToDos] = useState([])
  const [olderToDos, setOlderToDos] = useState([]);
  const [todaysToDos, setTodaysToDos] = useState([])
  const [toDo, setToDo] = useState('');
  const [testAllToDos, setTestAllToDos] = useState([])
  const [selectedDate, setSelectedDate] = useState('')


  // get toDos from localstorage if they already exist
  useEffect(() => {
    setTestAllToDos(JSON.parse(localStorage.getItem('allToDos')) || [])
  }, [])

  // set to-dos
  useEffect(() => {
    let today = new Date()
    let date = getTodaysDate()
    // let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    let toDosUpcoming = testAllToDos.filter(toDos => parseDateString(toDos.date) > parseDateString(date))
    let toDosToday = testAllToDos.filter(toDos => parseDateString(toDos.date) === parseDateString(date))
    let toDosOlder = testAllToDos.filter(toDos => parseDateString(toDos.date) < parseDateString(date))
    setTodaysToDos(toDosToday.length ? toDosToday[0] : [])
    setUpcomingToDos(toDosUpcoming.length ? toDosUpcoming : [])
    setOlderToDos(toDosOlder.length ? toDosOlder: [])
  }, [testAllToDos])

  // get selected date from the calendar
  function getSelectedDate(event) {
    let date = new Date(event.target.value)
    setSelectedDate(date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear())
  }

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

  // function parse date string
  function parseDateString(dateString) {
    const [day, month, year] = dateString.split('-').map(Number)
    return new Date(year, month-1, day)
  }

  // function to delete to-dos
  function deleteToDo (toDoId, toDos, date) {
    // filter out any toDo with the if 'toDoId'
    let newToDos = toDos.filter(toDos => toDos.id !== toDoId)

    // update allToDos
    let newAllToDos = testAllToDos.map(toDos => {
        if (toDos.date !== date) {
            return toDos
        } else {
            return {
                ...toDos,
                toDosArray: newToDos
            }
        }
    })

    // update toDos in state and and update localstorage
    localStorage.setItem('allToDos', JSON.stringify(newAllToDos))
    setTestAllToDos(newAllToDos)
  }

  // function to toggle 'checked' property of a to-do
  function toggleChecked(toDoId, toDos, date) {
    if (date < getTodaysDate()) {
      return
    }

    // change the 'checked' value of the toDo with the id 'toDoId'
    let newToDos = toDos.map(toDo => {
        if (toDo.id === toDoId) {
            // return {...toDo, checked: !toDo.checked}
            return {...toDo, checked: !toDo.checked}
        } else {
            return toDo
        }
    })

    // update allToDos
    let newAllToDos = testAllToDos.map(toDos => {
        if (toDos.date !== date) {
            return toDos
        } else {
            return {
                ...toDos,
                toDosArray: newToDos
            }
        }
    })

    // update toDos in state and and update localstorage
    localStorage.setItem('allToDos', JSON.stringify(newAllToDos))
    setTestAllToDos(newAllToDos)
  }

  function addToDo (toDo, toDos, date) {
    let newAllToDos = []
    if (!toDo) {
      return
    }

    // new set of to-dos
    let newToDos = [
      ...toDos,
      {id: toDos.length ? toDos[toDos.length - 1].id + 1 : 1, toDosText: toDo, checked: false}
    ];
    
    // check if date already exists
    if (testAllToDos.some(toDos => toDos['date'] === date)) {
      // new set of all to-dos
      newAllToDos = testAllToDos.map(toDos => {
      if (toDos.date !== date) {
        return toDos
      } else {
        return {
                ...toDos,
                toDosArray: newToDos
              }
          }
      })  
    } else {
      newAllToDos = [
        ...testAllToDos,
        {
          date: date,
          toDosArray: newToDos
        }
      ]
    }

    // setTestAllToDos(newAllToDos)
    localStorage.setItem('allToDos', JSON.stringify(newAllToDos))
    setTestAllToDos(newAllToDos)

    // clear input
    setToDo('')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-to-do-list" element={<Layout selectedDate={selectedDate} getSelectedDate={getSelectedDate} />}>
          {/* <Route index element={<Home getTodaysDate={getTodaysDate} addToDo={addToDo} setToDo={setToDo} toDo={toDo} toDos={todaysToDos} toggleChecked={toggleChecked} deleteToDo={deleteToDo} />} /> */}
          <Route index element={<ViewToDos date={getTodaysDate()} getSpecificToDos={getSpecificToDos} getTodaysDate={getTodaysDate} addToDo={addToDo} toDo={toDo} setToDo={setToDo} deleteToDo={deleteToDo} toggleChecked={toggleChecked} parseDateString={parseDateString} />} />
          <Route path="/react-to-do-list/upcomingToDos" element={<UpcomingToDos upcomingToDos={upcomingToDos} />} />
          <Route path="/react-to-do-list/:dateParam" element={<ViewToDos getSpecificToDos={getSpecificToDos} getTodaysDate={getTodaysDate} addToDo={addToDo} toDo={toDo} setToDo={setToDo} deleteToDo={deleteToDo} toggleChecked={toggleChecked} parseDateString={parseDateString} />} />
          <Route path="/react-to-do-list/olderToDos" element={<OlderToDos olderToDos={olderToDos} />} />
          <Route path={`/react-to-do-list/${getTodaysDate()}`} element={<Navigate to="/react-to-do-list" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
