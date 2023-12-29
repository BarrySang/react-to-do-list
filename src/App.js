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
  // const navigate = useNavigate()
  // const history = useHistory


  // get toDos from localstorage if they already exist
  useEffect(() => {
    setTestAllToDos(JSON.parse(localStorage.getItem('allToDos')) || [])
  }, [])

  // set to-dos
  useEffect(() => {
    let today = new Date()
    let date = getTodaysDate()
    // let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    let toDosUpcoming = testAllToDos.filter(toDos => toDos.date > date)
    let toDosToday = testAllToDos.filter(toDos => toDos.date === date)
    let toDosOlder = testAllToDos.filter(toDos => toDos.date < date)
    setTodaysToDos(toDosToday.length ? toDosToday[0] : [])
    setUpcomingToDos(toDosUpcoming.length ? toDosUpcoming : [])
    setOlderToDos(toDosOlder.length ? toDosOlder: [])
  }, [testAllToDos])

  // // redirect to selected date
  // useEffect(() => {
  //   console.log(selectedDate)
  //   if (selectedDate) {
  //     navigate(`/react-to-do-list/${selectedDate}`)
  //   }
    
  // }, [selectedDate])

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

    // console.log(newToDos)

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
    if (!toDo) {
      return
    }

    console.log(toDos)
    // new set of to-dos
    let newToDos = [
      ...toDos,
      {id: toDos.length ? toDos[toDos.length - 1].id + 1 : 1, toDosText: toDo, checked: false}
    ];
    

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
          <Route index element={<ViewToDos date={getTodaysDate()} getSpecificToDos={getSpecificToDos} getTodaysDate={getTodaysDate} addToDo={addToDo} toDo={toDo} setToDo={setToDo} deleteToDo={deleteToDo} toggleChecked={toggleChecked} />} />
          <Route path="/react-to-do-list/upcomingToDos" element={<UpcomingToDos upcomingToDos={upcomingToDos} />} />
          <Route path="/react-to-do-list/:dateParam" element={<ViewToDos getSpecificToDos={getSpecificToDos} getTodaysDate={getTodaysDate} addToDo={addToDo} toDo={toDo} setToDo={setToDo} deleteToDo={deleteToDo} toggleChecked={toggleChecked} />} />
          <Route path="/react-to-do-list/olderToDos" element={<OlderToDos olderToDos={olderToDos} />} />
          <Route path={`/react-to-do-list/${getTodaysDate()}`} element={<Navigate to="/react-to-do-list" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
