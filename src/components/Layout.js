import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import '../css/Layout.css'

function Layout () {
    return (
        <div className="container">
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
                </ul>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layout