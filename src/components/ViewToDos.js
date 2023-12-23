import { useParams } from "react-router";
import AddToDo from "./AddToDo";

function ViewToDos ( { toDo, setToDo, toDos, deleteToDo, toggleChecked, getSpecificToDos, getTodaysDate, addToDo, date} ) {
    let { dateParam } = useParams()
    
    // check if the component has been called from a route and get the appropriate to-dos
    if (dateParam) {
        let specificToDos = getSpecificToDos(dateParam)
        if(specificToDos && specificToDos.length) {
            toDos = specificToDos[0].toDosArray
        }
    }

    if (toDos && toDos.length > 0) {
        
        return (
            <div>
                {
                    dateParam ? <h2>{dateParam}</h2> : ''
                }
                {
                    dateParam && dateParam > getTodaysDate() ? <AddToDo toDo={toDo} setToDo={setToDo} addToDo={addToDo} toDos={toDos} date={dateParam} /> : ''
                }
                
                {toDos.map(toDo => (
                    <p key={toDo.id} className="toDo-container">
                        <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id, toDos, date)}/>
                        <label>{toDo.toDosText}</label>
                        {' '}
                        <button onClick={() => deleteToDo(toDo.id)}>Delete To-Do</button>
                    </p>
                ))}
            </div>
        );
        
        
    } else {
        return (
            <div>
                <p>No to-dos</p>
            </div>
        )
    }
}

export default ViewToDos;