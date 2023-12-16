import ToDosListGroups from "./ToDosListGroups";
import ViewToDos from "./ViewToDos";

function UpcomingToDos ({upcomingToDos}) {
    if (upcomingToDos.length) {
        
        return (
            <div>
                
                <ToDosListGroups toDosListGroups={upcomingToDos} btnLink={'/upcomingToDos/'} />
            </div>
        )
        
    }
    
}

export default UpcomingToDos