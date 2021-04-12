import './App.css';
import axios from "axios";
import { useState } from 'react';
import SearchResult from './SearchResult.js';


function App() {
  // Piece of states to store data from API and user input
  const [movie, setMovie] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [list, setList] = useState([]);

  // Storing some elements for easy access
  const showSearch = document.querySelector('.movieResult');
  const addedNotice = document.querySelector('.afterNotice');

  // Function for event handlers
  const handleClick = (e) => {
    e.preventDefault();
    // Make API call when search is submitted
    getMovie(userInput);
    // Empty search bar after submit/click
    setUserInput('');
    // Remove hide class from movieResult to show data from API
    showSearch.classList.remove('hide');
    // Add hide class to addedNotice when new search is submitted
    addedNotice.classList.add('hide');
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const addMovie = (movie) => {
    // Makes the movie data from the lastest API call available
    getMovie();
    // Push movie data to be stored in list array
    list.push(movie);
    // Store beforeNotice element into a variable for easy access
    const defaultNotice = document.querySelector('.beforeNotice')
    // Add hide class to beforeNotice
    defaultNotice.classList.add('hide');
    // Applying hide class as necessary to other elements
    showSearch.classList.add('hide');
    addedNotice.classList.remove('hide');
  }

  const removeMovie = (listedMovie) => {
    // Create new array from the list state
    const oldMovies = [...list]
    // Compare each filteredMovie value against the value of listedMovie
    // If filteredMovie !== listedMovie, it will be returned to updatedList array
    // If filteredMovie == listedMovie, it will NOT be returned to updatedList array
    const updatedList = oldMovies.filter(filteredMovie => filteredMovie !== listedMovie);
    // Set the returned filter array from updatedList to our original list state
    setList(updatedList);
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
    })
    .then((res) => {
      const apiData = res.data
      setMovie(apiData);
    });
  };

  // JSX return to mount things on our page
  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1><i className="fas fa-film" aria-hidden="true"></i> My Movie Database</h1>
        </header>

        <form action="submit" className="searchBar">
          <i className="fas fa-search" aria-hidden="true"></i>
          <label htmlFor="userMovie" className="sr-only">Search a movie of your choice</label>
          <input 
            type = 'text'
            id="userMovie" 
            placeholder = 'Movie Title ie. "Edward Scissorhands"'
            onChange={handleChange}
            value={userInput}
          />
          <button onClick={handleClick}>Search</button>
        </form>

        <p className="notice afterNotice hide">
          Movie has been added to your list!
        </p>

        <div className="movieResult hide">
          {
            <SearchResult
              addMovie={() => addMovie(movie)}
              poster={movie.Poster}
              title={movie.Title}
              released={movie.Released}
              runtime={movie.Runtime}
              rated={movie.Rated}
              genre={movie.Genre}
              plot={movie.Plot}
              actors={movie.Actors}
            />
          }
        </div>
      </div>

      <h2>My Plan to Watch List</h2>
      <p className="notice beforeNotice">
        Search a movie to add to the list!
      </p>

      <div className="toWatchList">
        <ul className="movieList">
          {
            list.map((newMovie) => {
              return(
                <li className="movieCard">
                  <img src={newMovie.Poster} alt={newMovie.Title}/>
                  <button onClick={() => removeMovie(newMovie)}>Delete</button>
                </li>
              )
            })
          }
        </ul>
      </div>

      <footer>
        <p>Created by</p>
        <p>Mackenzie Howey • Si-Jia Mao • Toria Walker-McHayle</p>
        <p>at <a href="https://junocollege.com/">Juno College of Technology</a></p>
      </footer>
    </div>
  );
};

export default App;