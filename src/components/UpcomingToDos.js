import ToDosListGroups from "./ToDosListGroups";
import ViewToDos from "./ViewToDos";

function UpcomingToDos ({upcomingToDos}) {
    if (upcomingToDos.length) {
        console.log(upcomingToDos)
        return (
            <div>
                
                <ToDosListGroups toDosListGroups={upcomingToDos} />
            </div>
        )
        
    }
    
}

export default UpcomingToDos