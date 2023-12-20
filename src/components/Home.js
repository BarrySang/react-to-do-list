import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import ViewToDos from "./ViewToDos";

function Home ({getTodaysDate, addToDo, toDo, setToDo, toDos, toggleChecked}) {
    
    // console.log(toDos)
    // if (toDos.length) {
    //     console.log(toDos)
    // }
    const [allToDos, setAllTodos] = useState([])

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
        // saveToDos(newToDos, newAllToDos)
    }

    // // function to toggle 'checked' property of a to-do
    // function toggleChecked(toDoId) {
    //     // change the 'checked' value of the toDo with the id 'toDoId'
    //     let newToDos = toDos.map(toDo => {
    //         if (toDo.id === toDoId) {
    //             return {...toDo, checked: !toDo.checked}
    //         } else {
    //             return toDo
    //         }
    //     })

    //     // update allToDos
    //     let newAllToDos = allToDos.map(toDos => {
    //         if (toDos.date !== (getTodaysDate())) {
    //             return toDos
    //         } else {
    //             return {
    //                 ...toDos,
    //                 toDosArray: newToDos
    //             }
    //         }
    //     })

    //     // update toDos in state and and update localstorage
    //     // saveToDos(newToDos, newAllToDos)
    // }

    // console.log(toDos)

    return (
        <div>
            <header>
                <h1>To-Do List</h1>
            </header>
            <section>
                <AddToDo toDo={toDo} setToDo={setToDo} addToDo={addToDo} date={getTodaysDate()} toDos={toDos.toDosArray} />
                <ViewToDos toDos={toDos.toDosArray} deleteToDo={deleteToDo} toggleChecked={toggleChecked} getTodaysDate={getTodaysDate} date={getTodaysDate()} />
            </section>
        </div>
    );
}

export default Home;