import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";


function App() {
  const [movie, setMovie] = useState([]);
  const [userInput, setUserInput] = useState('');
  const handleClick = (e) => {
    e.preventDefault();
    setUserInput('')
  }
  const handleChange = (e) => {
    setUserInput(e.target.value);
  }


  // Making API call
  useEffect( () => {
    const key = '7306c825';
    axios({
      url:'http://www.omdbapi.com',
      method: 'GET',
      dataResponse: 'json',
      params: {
        apiKey: key,
        format: 'json',
        t: ''
      }
    }).then((res) => {
      setMovie(res.data)
      console.log(res)
    })
  }, [])
 
  return (
    <div className="App">
      <h1>My Movie Database App🤩</h1>
      <form action="submit">
                <label htmlFor="userMovie">Search movies you like </label>
                <input 
                  type = 'text' 
                  id="userMovie" 
                  placeholder = 'Movie Title ie. "Edward Scissorhands"'
                  onChange={handleChange}
                  value={userInput}/>
                <button onClick={handleClick}>Search movie</button>
            </form>
      {/* < MovieSearch /> */}
    </div>
  );
}

export default App;
