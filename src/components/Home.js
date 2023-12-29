import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import ViewToDos from "./ViewToDos";

function Home ({getTodaysDate, addToDo, toDo, setToDo, toDos, toggleChecked, deleteToDo}) {
    
    const [allToDos, setAllTodos] = useState([])

    return (
        <div>
            <section>
                <ViewToDos toDo={toDo} toDos={toDos.toDosArray} setToDo={setToDo} addToDo={addToDo} deleteToDo={deleteToDo} toggleChecked={toggleChecked} getTodaysDate={getTodaysDate} date={getTodaysDate()} />
            </section>
        </div>
    );
}

export default Home;