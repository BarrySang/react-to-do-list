function AddToDo ({toDo, toDos, setToDo, addToDo, date}) {
    return (
        <div>
            <input value={toDo} onChange={e => setToDo(e.target.value)} />
            <button onClick={() => addToDo(toDo, toDos, date)} >Add to-do</button>
        </div>
    );
}

export default AddToDo;