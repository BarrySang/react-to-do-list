import { useParams } from "react-router";

function ViewToDos ({toDos, deleteToDo, toggleChecked, getSpecificToDos}) {
    let date = useParams()
    
    // check if the component has been called from a route
    if (Object.keys(date).length) {
        console.log(date)
        let specificToDos = getSpecificToDos(date)
        if(specificToDos && specificToDos.length) {
            toDos = specificToDos[0].toDosArray
        }
    }

    // console.log(toDos)
    if (toDos && toDos.length > 0) {
        return (
            <div>
                {toDos.map(toDo => (
                    <p key={toDo.id} className="toDo-container">
                        <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id)}/>
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