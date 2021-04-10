import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';


function App() {
  // Piece of states to store data from API and user input
  const [movie, setMovie] = useState({});
  const [userInput, setUserInput] = useState('');

  // Function for event handlers
  const handleClick = (e) => {
    e.preventDefault();
    getMovie(userInput);
    setUserInput('');
  }

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  // API request to get movie data
  const key = '7306c825';
  const getMovie = (userInput) => {
    axios({
      url:'http://www.omdbapi.com/',
      method: 'GET',
      dataResponse: 'json',
      params: {
        apiKey: key,
        t: userInput
      }
    }).then((res) => {
      setMovie(res.data);
    });
  }

  // JSX return to mount things on our page
  return (
    <div className="App">
      <header>
        <h1>My Movie Database App🤩</h1>
      </header>

      <form action="submit" className="searchBar">
        <label htmlFor="userMovie">Search movies you like </label>
        <input 
          type = 'text'
          id="userMovie" 
          placeholder = 'Movie Title ie. "Edward Scissorhands"'
          onChange={handleChange}
          value={userInput}
        />
        <button onClick={handleClick}>Search movie</button>
      </form>

      <div className="movieResult">
        {
          <ul>
            <div className="poster">
              <img src={movie.Poster} alt={movie.Title}/>
            </div>
            <li>
              <h3>Title</h3>
              <p>{movie.Title}</p>
            </li>
            <li>
              <h3>Release Date:</h3>
              <p>{movie.Released}</p>
            </li>
            <li>
              <h3>Rated:</h3>
              <p>{movie.Rated}</p>
            </li>
            <li>
              <h3>Genre:</h3>
              <p>{movie.Genre}</p>
            </li>
            <li>
              <h3>Plot:</h3>
              <p>{movie.Plot}</p>
            </li>
            <li>
              <h3>Actors:</h3>
              <p>{movie.Actors}</p>
            </li>
          </ul>
        }
      </div>
    </div>
  );
};

export default App;
