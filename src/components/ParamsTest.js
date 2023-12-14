import { useParams } from "react-router"

function ParamsTest () {
    let dateParam = useParams()
    console.log(dateParam)

    return (
        <div>
            {/* {dateParam} */}
        </div>
    )
}

export default ParamsTest