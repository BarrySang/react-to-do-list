import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddToDo from "./AddToDo";

function ViewToDos ( { toDo, setToDo, deleteToDo, toggleChecked, getSpecificToDos, getTodaysDate, addToDo, date, parseDateString } ) {
    
    let toDos = []

    let { dateParam } = useParams()

    if (date) {
        let specificToDos = getSpecificToDos(date)
        if(specificToDos && specificToDos.length) {
            toDos = (specificToDos[0].toDosArray)
        }
    }
    if (dateParam) {
        date = dateParam
        let specificToDos = getSpecificToDos(dateParam)
        if(specificToDos && specificToDos.length) {
            toDos = (specificToDos[0].toDosArray)
        }
    }

    if (toDos.length > 0) {
        
        return (
            <div>
                {
                    date ? <h2>{dateParam}</h2> : ''
                }
                {
                    date && (parseDateString(date) >= parseDateString(getTodaysDate())) ? <AddToDo toDo={toDo} setToDo={setToDo} addToDo={addToDo} toDos={toDos} date={date} /> : ''
                }
                {
                    date && (parseDateString(date) >= parseDateString(getTodaysDate())) ? <p></p> : ''
                }

                
                {toDos.map(toDo => (
                    <p key={toDo.id} className="toDo-container">
                        {
                            date && parseDateString(date) < parseDateString(getTodaysDate()) ? <input type="checkbox" checked={toDo.checked} readOnly /> : <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id, toDos, date)}/>
                        }
                        
                        <label>{toDo.toDosText}</label>
                        {' '}
                        {
                            date && parseDateString(date) < parseDateString(getTodaysDate()) ? '' : <button onClick={() => deleteToDo(toDo.id, toDos, date)}>Delete To-Do</button>
                        }
                        
                    </p>
                ))}
            </div>
        );
        
        
        
    } else {
        return (
            <div>
                {
                    date && parseDateString(date) > parseDateString(getTodaysDate()) && <AddToDo toDo={toDo} setToDo={setToDo} addToDo={addToDo} toDos={toDos} date={date} />
                }
                <p>No to-dos</p>
            </div>
        )
    }
}

export default ViewToDos;