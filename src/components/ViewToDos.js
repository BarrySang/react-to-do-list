function ViewToDos ({toDos, deleteToDo, toggleChecked}) {
    
    if (toDos && toDos.length > 0) {
        return (
            <div>
                {toDos.map(toDo => (
                    <p key={toDo.id}>
                        <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id)}/> {toDo.toDoText} {' '} <button onClick={() => deleteToDo(toDo.id)}>Delete To-Do</button>
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