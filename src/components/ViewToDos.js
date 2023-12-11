function ViewToDos ({toDos, deleteToDo, toggleChecked}) {
    
    if (toDos && toDos.length > 0) {
        return (
            <div>
                {toDos.map(toDo => (
                    <p key={toDo.id} className="toDo-container">
                        <input type="checkbox" checked={toDo.checked} onChange={() => toggleChecked(toDo.id)}/>
                        <label>{toDo.toDoText}</label>
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