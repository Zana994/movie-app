import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import DisplayMovies from "./components/DisplayMovies";
import MoviePage from "./pages/MoviePage";
import Favorites from './pages/Favorites';
import Visited from './pages/Visited';
import SearchPage from './pages/SearchPage';

function App() {
  
  const [popular_movies, setpopularmovies] = useState([])
  const [topRated_movies, setTopRatedMovies] = useState([])
  const [upcoming_movies, setUpcomingMovies] = useState([])
  const [genres, setGenres] = useState([])
  const load = false
  const api_key = process.env.REACT_APP_API_KEY
  
  const fetchData = async(url) => {
    const results = await fetch(url)
    const data = await results.json()

    return data
  }

  const getMovies = async (url) => {
    const data_page1 = await fetchData(`${url}&page=1`)
    const data_page2 = await fetchData(`${url}&page=2`)
    const result = [...data_page1.results, ...data_page2.results]
    return result
  }

  const getGenres = async () => {
    const data = await fetchData(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
    return data.genres
  }

  useEffect(() => {
    const setData = async () => {
      setpopularmovies([])
      setTopRatedMovies([])
      setUpcomingMovies([])
      setGenres([])

      const popular = await getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`)
      setpopularmovies(() => [...popular])

      const topRated = await getMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US`)
      setTopRatedMovies(() => [...topRated])

      const upcoming = await getMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US`)
      setUpcomingMovies(() => [...upcoming])

      const genre_arr = await getGenres()
      setGenres(() => [...genre_arr])
    }

    setData()

  }, [])

  return (
    <Router>
    <div className="wrapper">
      <Header />
  
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<DisplayMovies movies={popular_movies} genres={genres} loadBtn={() => !load} />} />
          <Route path="topRated" element={<DisplayMovies movies={topRated_movies} genres={genres} loadBtn={() => !load} />} />
          <Route path="upcoming" element={<DisplayMovies movies={upcoming_movies} genres={genres} loadBtn={() => !load} />} />
        </Route>
        <Route path="/:id" element={<MoviePage genres={genres} />} />
        <Route path="/:id/:id" element={<MoviePage genres={genres} />} />
        <Route path="/topRated/:id" element={<MoviePage genres={genres} />} />
        <Route path="/topRated/:id/:id" element={<MoviePage genres={genres} />} />
        <Route path="/upcoming/:id" element={<MoviePage genres={genres} />} />
        <Route path="/upcoming/:id/:id" element={<MoviePage genres={genres} />} />
        <Route path="/favorites" element={<Favorites genres={genres} />} />
        <Route path="/visited" element={<Visited genres={genres} />} />
        <Route path='search=:input' element={<SearchPage genres={genres}/>} />

      </Routes>
      
    </div>
    </Router>
  );
}

export default App;