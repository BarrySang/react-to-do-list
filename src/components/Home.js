import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import ViewToDos from "./ViewToDos";

function Home ({getTodaysDate}) {
    const [allToDos, setAllTodos] = useState([])
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState('');
    

    // get today's to-dos
    useEffect(() => {
        let date = getTodaysDate()

        // get all to-dos from localstorage
        let allToDos = JSON.parse(localStorage.getItem('allToDos'))
        let toDosToday = allToDos.filter(toDos => toDos.date === date)
        if (toDosToday && toDosToday.length) {
            setToDos(toDosToday[0].toDosArray);
            setAllTodos(JSON.parse(localStorage.getItem('allToDos')) || [])
        }
    }, [])

    // function to save to-dos in state and in localstorage
    function saveToDos(newToDos, newAllToDos) {
        // update toDos in state
        setToDos(newToDos);
        
        // update toDos in localstorage
        localStorage.setItem('allToDos', JSON.stringify(newAllToDos));
    }

    // add to-dos to toDos array in state
    function addToDo (toDo) {
        // console.log(toDo)
        // if user attempts to enter an empty to-do
        if (!toDo) {
            return
        }

        // new set of to-dos
        let newToDos = [
            ...toDos,
            {id: toDos.length ? toDos[toDos.length - 1].id + 1 : 1, toDosText: toDo, checked: false}
        ];

        let newAllToDos = allToDos.map(toDos => {
            if (toDos.date !== (getTodaysDate())) {
                return toDos
            } else {
                return {
                    ...toDos,
                    toDosArray: newToDos
                }
            }
        })

        // save toDos in state and in localstorage
        saveToDos(newToDos, newAllToDos)

        // reset to-do input
        setToDo('')
    }

    // delete item from toDos array in state
    function deleteToDo (toDoId) {
        // filter out any toDo with the if 'toDoId'
        let newToDos = toDos.filter(toDos => toDos.id !== toDoId)

        // update allToDos
        let newAllToDos = allToDos.map(toDos => {
            if (toDos.date !== (getTodaysDate())) {
                return toDos
            } else {
                return {
                    ...toDos,
                    toDosArray: newToDos
                }
            }
        })

        // update toDos in state and update localstorage
        saveToDos(newToDos, newAllToDos)
    }

    // function to toggle 'checked' property of a to-do
    function toggleChecked(toDoId) {
        // change the 'checked' value of the toDo with the id 'toDoId'
        let newToDos = toDos.map(toDo => {
            if (toDo.id === toDoId) {
                return {...toDo, checked: !toDo.checked}
            } else {
                return toDo
            }
        })

        // update allToDos
        let newAllToDos = allToDos.map(toDos => {
            if (toDos.date !== (getTodaysDate())) {
                return toDos
            } else {
                return {
                    ...toDos,
                    toDosArray: newToDos
                }
            }
        })

        // update toDos in state and and update localstorage
        saveToDos(newToDos, newAllToDos)
    }

    return (
        <div>
            <header>
                <h1>To-Do List</h1>
            </header>
            <section>
                <AddToDo toDo={toDo} setToDo={setToDo} addToDo = {addToDo} />
                <ViewToDos toDos={toDos} deleteToDo={deleteToDo} toggleChecked={toggleChecked} />            
            </section>
        </div>
    );
}

export default Home;