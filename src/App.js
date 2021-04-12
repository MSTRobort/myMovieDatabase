import "./App.css";
import axios from "axios";
import { useState } from "react";
import SearchResult from "./SearchResult.js";
import ErrorAlert from "./ErrorAlert.js";

function App() {
  // Piece of states to store data from API and user input
  const [movie, setMovie] = useState({});
  const [userInput, setUserInput] = useState("");

  // Function for event handlers
  const handleClick = (e) => {
    e.preventDefault();
    getMovie(userInput);
    setUserInput("");
    const showSearch = document.querySelector(".movieResult");
    showSearch.classList.remove("hide");
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // API request to get movie data
  const key = "7306c825";
  const getMovie = (userInput) => {
    axios({
      url: "http://www.omdbapi.com/",
      method: "GET",
      dataResponse: "json",
      params: {
        apiKey: key,
        format: "json",
        t: userInput,
      },
    })
      .then((res) => {
        const apiData = res.data;
        setMovie(apiData);
        if (res.data.Response === "False") {
          ErrorAlert();
          const errorAlert = document.querySelector(".errorPopUp");
          errorAlert.classList.remove("hide");
        } else {
          const errorAlert = document.querySelector(".errorPopUp");
          errorAlert.classList.add("hide");
        }
      })
      .catch((error) => {
        alert("oops something went wrong");
      });
  };

  console.log(movie);

  // JSX return to mount things on our page
  return (
    <div className='App'>
      <div className='wrapper'>
        <header>
          <h1>
            <i className='fas fa-film' aria-hidden='true'></i> My Movie Database
          </h1>
        </header>

        <form action='submit' className='searchBar'>
          <i className='fas fa-search' aria-hidden='true'></i>
          <label htmlFor='userMovie' className='sr-only'>
            Search a movie of your choice
          </label>
          <input
            type='text'
            id='userMovie'
            placeholder='Movie Title ie. "Edward Scissorhands"'
            onChange={handleChange}
            value={userInput}
          />
          <button onClick={handleClick}>Search</button>
        </form>

        <ErrorAlert />

        <div className='movieResult hide'>
          {
            <SearchResult
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

      <footer>
        <p>Created by</p>
        <p>Mackenzie Howey • Si-Jia Mao • Toria Walker-McHayle</p>
        <p>
          at <a href='https://junocollege.com/'>Juno College of Technology</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
