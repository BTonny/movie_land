// 92c768ac
// http://www.omdbapi.com/?i=tt3896198&apikey=92c768ac
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=92c768ac';

// const movie = {
//     "Title": "American Pie 2",
//     "Year": "2001",
//     "imdbID": "tt0252866",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOTEyYjhiMjYtNjU3YS00NmQ4LTlhNTEtYTczNWY3MGJmNzE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
// }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    
    useEffect(() => {
        searchMovies('');
    },  []);

    return (
        <div className='app'>
            <h1>Movie Land</h1>
            <div className="search">
                <input 
                    placeholder='Search for a movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}/>
            </div>
            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {
                            movies.map((movie) => (<MovieCard movie={movie} />))
                        }
                    </div>
                )
                : (
                    <div className='empty'>
                        <h2>Sorry! Your Search did not return any results</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;