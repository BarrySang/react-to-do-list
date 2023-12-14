import { Link } from "react-router-dom";

function ToDosListGroups ({toDosListGroups}) {
    // console.log(toDosListGroup)
    if (toDosListGroups && toDosListGroups.length > 0) {
        
        return (
            <div>
                {toDosListGroups.map(toDosListGroup => (
                    <p key={toDosListGroup.date}>
                        
                        <label>{toDosListGroup.date}</label>
                        <button><Link to={'/upcomingToDos/'+toDosListGroup.date} >Open</Link></button>
                    </p>
                ))}
            </div>
        )
    }
}

export default ToDosListGroups