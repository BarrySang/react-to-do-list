import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ToDosListGroups ({toDosListGroups, btnLink}) {

    if (toDosListGroups && toDosListGroups.length > 0) {
        
        return (
            <div>
                {toDosListGroups.map(toDosListGroup => (
                    <p key={toDosListGroup.date}>
                        
                        <label>{toDosListGroup.date}</label>
                        <button><Link to={'/react-to-do-list/'+toDosListGroup.date} >Open</Link></button>
                    </p>
                ))}
            </div>
        )
    }
}

export default ToDosListGroups