import { useState } from "react";

function AddToDo ({addToDo}) {
    const [toDo, setToDo] = useState('');
    
    return (
        <div>
            <input value={toDo} onChange={e => setToDo(e.target.value)} />
            <button onClick={() => addToDo(toDo)} >Add to-do</button>
        </div>
    );
}

export default AddToDo;