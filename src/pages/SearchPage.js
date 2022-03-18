import React from 'react'
import { Outlet, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import noImage from '../Image_not_available.png'

const SearchPage = ({ genres }) => {
  const { input } = useParams()
  const [searchResults, setsearchResults] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${input}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => {
      setsearchResults([])
      setsearchResults(data.results)
    })
    .catch(err => console.log('Fetchind data failed with error -> ' + err))
  }, [input])
    
  return (
    <div className='container movie-container'>
      <div className='row gy-3 justify-content-center'>
        {searchResults && searchResults.map(movie => {
          const date = movie.release_date.split('-')[0]
          const genreIds = movie.genre_ids
          let arr = []
            genreIds.forEach(num => {
              genres.forEach(genre => {
                if(genre.id === num) arr.push(genre.name)
              })
            })
          return(
            <div className='col-auto movie' key={movie.id}>
                <Link to={`${movie.id}`}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : noImage} alt={movie.title}></img>
                    <div className="description-container">
                        <p style= {{fontWeight:"bold", color:"#090910"}}> {movie.title} {date} <span style={{color:"#F90716", fontWeight:"bold"}}>{movie.vote_average.toFixed(1)}</span> </p>
                        <p style = {{color: "rgb(151, 148, 148)", paddingTop:"0"}}> {arr.join(' ')} </p>
                    </div>
                </Link>
            </div>
        )
        })}
      </div>
      <Outlet />
    </div>
  )
}

export default SearchPage