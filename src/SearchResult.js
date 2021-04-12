import "./searchResult.css";

function SearchResult(props) {
    return(
        <>
            <div className="resultContainer">
                <button className="addButton" onClick={props.addMovie}>
                    Add to List <i className="fas fa-plus-circle" aria-hidden="true"></i>
                </button>
                <div className="poster">
                    <img src={props.poster} alt={props.title}/>
                </div>
                <ul>
                    <li>
                        <p><span className="info">Title: </span>{props.title}</p>
                    </li>
                    <li>
                        <p><span className="info">Release Date: </span>{props.released}</p>
                    </li>
                    <li>
                        <p><span className="info">Runtime: </span>{props.runtime}</p>
                    </li>
                    <li>
                        <p><span className="info">Rated: </span>{props.rated}</p>
                    </li>
                    <li>
                        <p><span className="info">Genre: </span>{props.genre}</p>
                    </li>
                    <li>
                        <p><span className="info">Plot: </span>{props.plot}</p>
                    </li>
                    <li>
                        <p><span className="info">Actors: </span>{props.actors}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchResult;