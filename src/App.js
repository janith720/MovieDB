import React from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import NoMovies from "./NoMovies";
import searchIcon from "./search.svg";

//c4a16f13

const apiUrl = "http://www.omdbapi.com?apikey=c4a16f13";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [error, setError] = React.useState(false);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data);
  };

  const handleSearch = () => {
    if (searchText === "") {
      setError(true)
    }else{
      searchMovies(searchText)
      setError(false)
    }
  };

  React.useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <img src={searchIcon} alt="search" onClick={handleSearch} />
      </div>

      {error && (
        <div className="empty">
          <NoMovies />
        </div>
      )}

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((val, key) => {
            return <MovieCard key={key} movie1={val} />;
          })}
        </div>
      ) : (
        <div className="empty">
          {/* <NoMovies /> */}
        </div>
      )}
      
    </div>
  );
}

export default App;
