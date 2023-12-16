import ToDosListGroups from "./ToDosListGroups"

function OlderToDos ({olderToDos}) {
    console.log(olderToDos)
    
    if (olderToDos.length) {
        return (
            <div>
                <h2>Older To-Dos</h2>

                <ToDosListGroups toDosListGroups={olderToDos} btnLink={'/olderToDos/'} />
            </div>
        )
    }
        
    
}

export default OlderToDos