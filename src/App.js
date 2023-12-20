import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

  // get toDos from localstorage if they already exist
  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem('allToDos')))
    setTestAllToDos(JSON.parse(localStorage.getItem('allToDos')) || [])
    // console.log(testAllToDos)   
    // setTestAllToDos(JSON.parse(localStorage.getItem('allToDos')) || [])
    // let localAllToDos = testAllToDos
    // // // console.log(localAllToDos)

    //   let today = new Date()
    //   let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
      
    //   let toDosUpcoming = localAllToDos.filter(toDos => toDos.date > date)
    //   // console.log(toDosUpcoming)
    //   let toDosToday = localAllToDos.filter(toDos => toDos.date === date)
    //   console.log(toDosToday)
    //   let toDosOlder = localAllToDos.filter(toDos => toDos.date < date)
      

    //   // setToDos(JSON.parse(localStorage.getItem('toDos')) || []);
    //   setUpcomingToDos(toDosUpcoming.length ? toDosUpcoming : [])
    //   setOlderToDos(toDosOlder.length ? toDosOlder: [])
  }, [])

  // console.log(testAllToDos)

  // set to-dos
  useEffect(() => {
    let today = new Date()
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    let toDosUpcoming = testAllToDos.filter(toDos => toDos.date > date)
    let toDosToday = testAllToDos.filter(toDos => toDos.date === date)
    let toDosOlder = testAllToDos.filter(toDos => toDos.date < date)
    // console.log(toDosToday)

    setTodaysToDos(toDosToday.length ? toDosToday[0] : [])
    setUpcomingToDos(toDosUpcoming.length ? toDosUpcoming : [])
    setOlderToDos(toDosOlder.length ? toDosOlder: [])
  }, [testAllToDos])

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

  // function to toggle 'checked' property of a to-do
  function toggleChecked(toDoId, toDos, date) {
    // change the 'checked' value of the toDo with the id 'toDoId'
    let newToDos = toDos.map(toDo => {
        if (toDo.id === toDoId) {
            return {...toDo, checked: !toDo.checked}
        } else {
            return toDo
        }
    })

    console.log(newToDos)

    // update allToDos
    let newAllToDos = testAllToDos.map(toDos => {
        if (toDos.date !== date) {
            return toDos
        } else {
          console.log(newToDos)
            return {
                ...toDos,
                toDosArray: newToDos
            }
        }
    })

    // console.log(newAllToDos)

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
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home getTodaysDate={getTodaysDate} addToDo={addToDo} setToDo={setToDo} toDo={toDo} toDos={todaysToDos} toggleChecked={toggleChecked} />} />
          <Route path="upcomingToDos" element={<UpcomingToDos upcomingToDos={upcomingToDos} />} />
          <Route path="upcomingToDos/:date" element={<ViewToDos getSpecificToDos={getSpecificToDos} getTodaysDate={getTodaysDate} addToDo={addToDo} toDo={toDo} setToDo={setToDo} />} />
          <Route path="olderToDos" element={<OlderToDos olderToDos={olderToDos} />} />
          <Route path="olderToDos/:date" element={<ViewToDos getSpecificToDos={getSpecificToDos}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
