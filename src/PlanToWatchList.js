import './planToWatchList.css';

function PlanToWatchList(props) {
    return(
        <>
            <li key={props.key} className="movieCard">
                <div className="cardInfo">
                    <div className="posterContainer">
                        <img src={props.poster} alt={props.title}/>
                        <div className="overlay" tabindex="0">
                            <p>{props.title}</p>
                            <p>{props.released}</p>
                            <p>{props.genre}</p>
                        </div>
                    </div>
                </div>
                <button onClick={props.removeMovie}><i className="fas fa-trash-alt" aria-label="remove movie"></i></button>
            </li>
        </>
    )
}

export default PlanToWatchList;