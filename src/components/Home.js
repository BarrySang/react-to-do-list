import { useState } from "react";
import AddToDo from "./AddToDo";
import ViewToDos from "./ViewToDos";

// to-do id
let nextId = 0;

function Home () {
    const [toDos, setToDos] = useState([]);

    // add to-dos to toDos array in state
    function addToDo (toDo) {
        setToDos([
            ...toDos,
            {id: nextId++, toDoText: toDo, checked: false}
        ]);
    }

    // delete item from toDos array in state
    function deleteToDo (toDoId) {
        setToDos(toDos.filter(toDos => toDos.id !== toDoId))
    }

    // function to toggle 'checked' property of a to-do
    function toggleChecked(toDoId) {
        setToDos(toDos.map(toDo => {
            if (toDo.id === toDoId) {
                return {...toDo, checked: !toDo.checked}
            } else {
                return toDo
            }
        }))
    }

    return (
        <div>
            <header>
                <h1>To-Do List</h1>
            </header>
            <section>
                <AddToDo addToDo = {addToDo} />
                <ViewToDos toDos={toDos} deleteToDo={deleteToDo} toggleChecked={toggleChecked} />            
            </section>
        </div>
    );
}

export default Home;