import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import '../css/Layout.css'

function Layout ({selectedDate, getSelectedDate}) {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/react-to-do-list/${selectedDate}`)
    }, [selectedDate])

    return (
        <div className="container">
            <h1>ToDos App</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/react-to-do-list">Home</Link>
                    </li>
                    <li>
                        <Link to="/react-to-do-list/upcomingToDos">Upcoming To-Dos</Link>
                    </li>
                    <li>
                        <Link to="/react-to-do-list/olderToDos">Older To-Dos</Link>
                    </li>
                    <li>
                        <input type="date" onChange={getSelectedDate} />
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layout