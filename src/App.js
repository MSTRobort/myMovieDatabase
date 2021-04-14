import './App.css';
import axios from "axios";
import firebase from './firebase';
import { useEffect, useState } from 'react';
import ErrorAlert from './ErrorAlert.js';
import SearchResult from './SearchResult.js';
import PlanToWatchList from './PlanToWatchList.js';
import Footer from './Footer.js';

function App() {
  // Piece of states to store data from API and user input
  const [movie, setMovie] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [list, setList] = useState([]);

  // Storing some elements for easy access
  const errorAlert = document.querySelector('.errorPopUp');
  const showSearch = document.querySelector('.movieResult');
  const addedNotice = document.querySelector('.afterNotice');

  // Function for event handlers
  const handleClick = (e) => {
    e.preventDefault();
    // Make API call when search is submitted
    getMovie(userInput);
    // Empty search bar after submit/click
    setUserInput('');
    // Add hide class to addedNotice when new search is submitted
    addedNotice.classList.add('hide');
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const addMovie = (movie) => {
    // Makes the movie data from the lastest API call available
    setMovie(userInput);
    // Create a reference to our database
    const dbRef = firebase.database().ref();
    // Push the value of this.state into our database
    dbRef.push(movie);
    // Applying hide class as necessary to other elements
    addedNotice.classList.remove('hide');
    showSearch.classList.add('hide');
  };

  const removeMovie = (listedMovie) => {
    // Create a reference to our database
    const dbRef = firebase.database().ref();
    // Remove the node specific to the movie ID
    dbRef.child(listedMovie).remove();
  };

  // API request to get movie data
  const key = '7306c825';
  const getMovie = (userInput) => {
    axios({
      url: 'https://www.omdbapi.com/',
      method: 'GET',
      dataResponse: 'json',
      params: {
        apiKey: key,
        t: userInput,
      },
    })
      .then((res) => {
        const apiData = res.data;
        setMovie(apiData);
        if (apiData.Response === 'False') {
          ErrorAlert();
          showSearch.classList.add('hide');
          errorAlert.classList.remove('hide');
        } else {
          errorAlert.classList.add('hide');
          showSearch.classList.remove('hide');
        }
      })
      .catch((error) => {
        alert('Oops! Something went wrong.');
      });
  };

  // Storing our Plan to Watch List in Firebase
  useEffect(() => {
    // Create a reference to our database
    const dbRef = firebase.database().ref();
    // Add event listener that will fire every time change is detected in database
    dbRef.on('value', (response) => {
      // Created new state to store data from Firebase
      const movieList = [];
      // Get information from Firebase
      const data = response.val();
      for (let key in data) {
        movieList.push({
          key: key,
          name: data[key]
        });
      };
      // Call setList to update our list state
      setList(movieList);
    });
  }, []);

  // JSX return to mount things on our page
  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1>
            <i className="fas fa-film" aria-hidden="true"></i> My Movie Database
          </h1>
        </header>

        <form action="submit" className="searchBar">
          <i className="fas fa-search" aria-hidden="true"></i>
          <label htmlFor="userMovie" className="sr-only">
            Search a movie of your choice
          </label>
          <input
            type="text"
            id="userMovie"
            placeholder='Movie Title ie. "Edward Scissorhands"'
            onChange={handleChange}
            value={userInput}
          />
          <button onClick={handleClick} disabled={!userInput}>Search</button>
        </form>

        <p className="notice afterNotice hide">
          Movie has been added to your list!
        </p>

        <ErrorAlert />

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

      <div className="toWatchList">
        <h2>My Plan to Watch List</h2>

        {
          // If list array is empty at page load, mount beforeNotice
          list == '' ? <p className="notice beforeNotice">Search a movie to add to the list!</p> : null
        }
        
        <ul className="movieList">
          {
            list.map((newMovie) => {
              return(
                <PlanToWatchList
                  key={newMovie.key}
                  poster={newMovie.name.Poster}
                  title={newMovie.name.Title}
                  released={newMovie.name.Released}
                  genre={newMovie.name.Genre}
                  removeMovie={() => removeMovie(newMovie.key)}
                />
              )
            })
          }
        </ul>
      </div>

      <Footer />

    </div>
  );
};

export default App;
