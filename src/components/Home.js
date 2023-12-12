import { useState } from "react";
import AddToDo from "./AddToDo";
import ViewToDos from "./ViewToDos";

// to-do id
// let nextId = 0;

function Home ({toDos, setToDos}) {
    // const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState('');

    // // get toDos from localstorage if they already exist
    // useEffect(() => {
    //     setToDos(JSON.parse(localStorage.getItem('toDos')) || []);
    // }, [])

    function saveToDos(newToDos) {
        // update toDos in state
        setToDos(newToDos);
        
        // update toDos in localstorage
        localStorage.setItem('toDos', JSON.stringify(newToDos));
    }

    // add to-dos to toDos array in state
    function addToDo (toDo) {
        // if user attempts to enter an empty to-do
        if (!toDo) {
            return
        }

        // new set of to-dos
        let newToDos = [
            ...toDos,
            {id: toDos.length ? toDos[toDos.length - 1].id + 1 : 1, toDoText: toDo, checked: false}
        ];

        // save toDos in state and in localstorage
        saveToDos(newToDos);

        // clear toDo string
        setToDo('')
    }

    // delete item from toDos array in state
    function deleteToDo (toDoId) {
        // filter out any toDo with the if 'toDoId'
        let newToDos = toDos.filter(toDos => toDos.id !== toDoId)

        // update toDos in state and update localstorage
        saveToDos(newToDos)
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

        // update toDos in state and and update localstorage
        saveToDos(newToDos)
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