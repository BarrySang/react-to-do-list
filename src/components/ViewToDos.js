import { useParams } from "react-router";
import AddToDo from "./AddToDo";

function ViewToDos ( { toDo, setToDo, toDos, deleteToDo, toggleChecked, getSpecificToDos, getTodaysDate, addToDo, date} ) {
    let { dateParam } = useParams()

    // console.log(date)
    
    // get to-dos based on date
    if (date) {
        let specificToDos = getSpecificToDos(date)
        if(specificToDos && specificToDos.length) {
            toDos = specificToDos[0].toDosArray
        }
    } else if (dateParam) {
        date = dateParam
        let specificToDos = getSpecificToDos(dateParam)
        if(specificToDos && specificToDos.length) {
            toDos = specificToDos[0].toDosArray
        }
    }

    if (toDos && toDos.length > 0) {
        
        return (
            <div>
                {
                    date ? <h2>{dateParam}</h2> : ''
                }
                {
                    date && date >= getTodaysDate() ? <AddToDo toDo={toDo} setToDo={setToDo} addToDo={addToDo} toDos={toDos} date={date} /> : ''
                }
                
                {toDos.map(toDo => (
                    <p key={toDo.id} className="toDo-container">
                        {
                            date && date < getTodaysDate() ? <input type="checkbox" checked={toDo.checked} readOnly /> : <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id, toDos, date)}/>
                        }
                        {/* <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id, toDos, date)}/> */}
                        <label>{toDo.toDosText}</label>
                        {' '}
                        {
                            date && date < getTodaysDate() ? '' : <button onClick={() => deleteToDo(toDo.id, toDos, date)}>Delete To-Do</button>
                        }
                        {/* <button onClick={() => deleteToDo(toDo.id, toDos, date)}>Delete To-Do</button> */}
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